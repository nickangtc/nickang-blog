#!/usr/bin/env node

const fs = require("fs");
const os = require("os");
const path = require("path");
const { spawnSync } = require("child_process");

const FIX = process.argv.includes("--fix");
const ROOTS = ["content", "public"];
const EXTS = new Set([".jpg", ".jpeg", ".png"]);

const ORIENTATION = {
  1: "normal",
  2: "mirrored horizontally",
  3: "rotated 180°",
  4: "mirrored vertically",
  5: "mirrored horizontally + rotated 270° CW",
  6: "rotated 90° CW",
  7: "mirrored horizontally + rotated 90° CW",
  8: "rotated 270° CW",
};

function walk(dir, files = []) {
  if (!fs.existsSync(dir)) return files;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(p, files);
    else if (EXTS.has(path.extname(entry.name).toLowerCase())) files.push(p);
  }
  return files;
}

function readUInt16(buf, offset, le) {
  return le ? buf.readUInt16LE(offset) : buf.readUInt16BE(offset);
}

function readUInt32(buf, offset, le) {
  return le ? buf.readUInt32LE(offset) : buf.readUInt32BE(offset);
}

function parseTiffOrientation(buf, tiffStart) {
  if (tiffStart + 8 > buf.length) return null;
  const endian = buf.toString("ascii", tiffStart, tiffStart + 2);
  const le = endian === "II";
  if (!le && endian !== "MM") return null;
  if (readUInt16(buf, tiffStart + 2, le) !== 42) return null;

  const ifdOffset = readUInt32(buf, tiffStart + 4, le);
  const ifd = tiffStart + ifdOffset;
  if (ifd + 2 > buf.length) return null;

  const entries = readUInt16(buf, ifd, le);
  for (let i = 0; i < entries; i++) {
    const entry = ifd + 2 + i * 12;
    if (entry + 12 > buf.length) return null;
    const tag = readUInt16(buf, entry, le);
    if (tag !== 0x0112) continue;

    const type = readUInt16(buf, entry + 2, le);
    const count = readUInt32(buf, entry + 4, le);
    if (type !== 3 || count < 1) return null;
    return readUInt16(buf, entry + 8, le);
  }
  return null;
}

function jpegOrientation(buf) {
  if (buf[0] !== 0xff || buf[1] !== 0xd8) return null;
  let offset = 2;
  while (offset + 4 <= buf.length) {
    while (buf[offset] === 0xff) offset++;
    const marker = buf[offset++];
    if (marker === 0xda || marker === 0xd9) break;
    const len = buf.readUInt16BE(offset);
    const dataStart = offset + 2;
    const dataEnd = offset + len;
    if (marker === 0xe1 && buf.toString("ascii", dataStart, dataStart + 6) === "Exif\0\0") {
      return parseTiffOrientation(buf, dataStart + 6);
    }
    offset = dataEnd;
  }
  return null;
}

function pngOrientation(buf) {
  const sig = "89504e470d0a1a0a";
  if (buf.subarray(0, 8).toString("hex") !== sig) return null;
  let offset = 8;
  while (offset + 12 <= buf.length) {
    const len = buf.readUInt32BE(offset);
    const type = buf.toString("ascii", offset + 4, offset + 8);
    const dataStart = offset + 8;
    if (type === "eXIf") return parseTiffOrientation(buf, dataStart);
    offset = dataStart + len + 4;
  }
  return null;
}

function commandExists(cmd) {
  return spawnSync("sh", ["-c", `command -v ${cmd}`], { stdio: "ignore" }).status === 0;
}

function jpegtranArgs(orientation) {
  switch (orientation) {
    case 2: return ["-flip", "horizontal"];
    case 3: return ["-rotate", "180"];
    case 4: return ["-flip", "vertical"];
    case 5: return ["-transpose"];
    case 6: return ["-rotate", "90"];
    case 7: return ["-transverse"];
    case 8: return ["-rotate", "270"];
    default: return null;
  }
}

function fixJpeg(file, orientation) {
  if (!commandExists("jpegtran")) throw new Error("jpegtran not found");
  const tmp = path.join(os.tmpdir(), `normalize-orientation-${process.pid}-${path.basename(file)}`);
  const args = ["-copy", "none", ...jpegtranArgs(orientation), file];
  const res = spawnSync("jpegtran", args, { encoding: null, maxBuffer: 200 * 1024 * 1024 });
  if (res.status !== 0) throw new Error(res.stderr.toString() || "jpegtran failed");
  fs.writeFileSync(tmp, res.stdout);
  fs.renameSync(tmp, file);
}

function runSips(file, args) {
  const res = spawnSync("sips", [...args, file], { encoding: "utf8" });
  if (res.status !== 0) throw new Error(res.stderr || res.stdout || "sips failed");
}

function fixPng(file, orientation) {
  if (!commandExists("sips")) throw new Error("sips not found");
  // These transform the pixels. Then delete orientation metadata if present.
  switch (orientation) {
    case 2: runSips(file, ["-f", "horizontal"]); break;
    case 3: runSips(file, ["-r", "180"]); break;
    case 4: runSips(file, ["-f", "vertical"]); break;
    case 5: runSips(file, ["-f", "horizontal"]); runSips(file, ["-r", "270"]); break;
    case 6: runSips(file, ["-r", "90"]); break;
    case 7: runSips(file, ["-f", "horizontal"]); runSips(file, ["-r", "90"]); break;
    case 8: runSips(file, ["-r", "270"]); break;
  }
  spawnSync("sips", ["-d", "orientation", file], { stdio: "ignore" });
}

let bad = 0;
let fixed = 0;

for (const file of ROOTS.flatMap((root) => walk(root))) {
  const buf = fs.readFileSync(file);
  const ext = path.extname(file).toLowerCase();
  const orientation = ext === ".png" ? pngOrientation(buf) : jpegOrientation(buf);

  if (!orientation || orientation === 1) continue;
  bad++;
  console.log(`${FIX ? "Fixing" : "Would fix"}: ${file} — EXIF Orientation ${orientation} (${ORIENTATION[orientation] || "unknown"})`);

  if (!FIX) continue;
  if (orientation < 2 || orientation > 8) {
    console.warn(`Skipping ${file}: unsupported orientation ${orientation}`);
    continue;
  }

  if (ext === ".png") fixPng(file, orientation);
  else fixJpeg(file, orientation);
  fixed++;
}

if (!bad) console.log("No bad image orientation metadata found.");
else if (!FIX) console.log(`Found ${bad} image(s) to normalize. Re-run with --fix to mutate files.`);
else console.log(`Normalized ${fixed}/${bad} image(s).`);
