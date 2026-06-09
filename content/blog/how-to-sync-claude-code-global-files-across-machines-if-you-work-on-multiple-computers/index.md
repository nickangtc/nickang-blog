---
title: "How to sync Claude Code global files across machines (if you work on multiple computers)"
date_published: "2026-03-08"
date_updated: "2026-03-08"
excerpt:
tags: ["Tech", "Productivity"]
fav: false
creation_duration_minutes:
backlinks:
ai_summary: "The post explains how to keep Claude Code’s global config files, memory, skills, and plugin settings synced across multiple Macs by storing only the useful parts of `~/.claude` in a Git-backed dotfiles repo and using a macOS LaunchAgent for automatic two-way sync. The author’s main point is that this setup is quick, reliable, and should whitelist only the important files because most of `~/.claude` is machine-specific clutter. The conclusion is that, with a small caveat about absolute project paths for memory files, the approach makes Claude Code settings effectively portable and nearly automatic across machines."
---

If you use Claude Code on more than one Mac, you've probably noticed the problem: your carefully tuned `CLAUDE.md`, memory files, settings, and custom skills live in `~/.claude` and don't travel with you.

Here's how I set up automatic, bidirectional sync using a Git repo and a macOS LaunchAgent. Total setup time was about 10 minutes.

## What gets synced (and what doesn't)

The key insight is that most of `~/.claude` is machine-specific junk — session logs, debug output, telemetry, caches. The stuff worth syncing is a small subset:

- `CLAUDE.md` — your global instructions
- `config.json` and `settings.json` — preferences
- `projects/*/memory/` — per-project memory files
- `skills/` — custom skills you've written
- `plugins/` config — which plugins are installed

Everything else (history, debug logs, shell snapshots, task state, telemetry) stays local.

## The setup

### 1. Create a dotfiles repo

This is literally a repo called dotfiles, no special sauce here.

```bash
mkdir -p ~/dotfiles
cd ~/dotfiles
git init
```

### 2. Move your Claude config into it

```bash
mv ~/.claude ~/dotfiles/claude
ln -s ~/dotfiles/claude ~/.claude
```

**Important:** Do this outside of a Claude Code session. Claude Code will recreate `~/.claude` as a directory if it's missing mid-session, which breaks the symlink setup. But don't worry, Claude itself knows about this and will warn you if you forget.

### 3. Add a whitelist-style .gitignore

Create `~/dotfiles/claude/.gitignore`. Instead of trying to blacklist all the junk (there's a lot, and new types appear with updates), ignore everything and whitelist what matters:

```gitignore
# Ignore everything by default
*

# Then whitelist what we want to sync
!.gitignore
!CLAUDE.md
!config.json
!settings.json

# Skills (user-created)
!skills/
!skills/**

# Plugins config (not the marketplace repos themselves)
!plugins/
!plugins/blocklist.json
!plugins/config.json
!plugins/installed_plugins.json
!plugins/known_marketplaces.json

# Project memory files
!projects/
!projects/*/
!projects/*/memory/
!projects/*/memory/**
```

### 4. Push to GitHub

```bash
cd ~/dotfiles
git add -A
git commit -m "Initial commit: Claude Code config sync"
gh repo create your-username/dotfiles --private --source . --push
```

### 5. Create a LaunchAgent for auto-sync

Save this as `~/Library/LaunchAgents/com.yourname.dotfiles-sync.plist`:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN"
"http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
    <key>Label</key>
    <string>com.yourname.dotfiles-sync</string>
    <key>ProgramArguments</key>
    <array>
        <string>/bin/bash</string>
        <string>-c</string>
        <string>cd /Users/yourname/dotfiles && git pull --rebase --autostash && git add -A && git diff-index --quiet HEAD || git commit -m "Auto-sync $(date +%Y-%m-%d\ %H:%M:%S)" && git push</string>
    </array>
    <key>WatchPaths</key>
    <array>
        <string>/Users/yourname/dotfiles/claude</string>
    </array>
    <key>RunAtLoad</key>
    <true/>
    <key>StandardErrorPath</key>
    <string>/tmp/dotfiles-sync.err</string>
    <key>StandardOutPath</key>
    <string>/tmp/dotfiles-sync.out</string>
</dict>
</plist>
```

**Gotcha:** `WatchPaths` does not expand `~`. You must use the full absolute path.

Load it:

```bash
launchctl load ~/Library/LaunchAgents/com.yourname.dotfiles-sync.plist
```

This does two things:

- **On file change:** When anything in `~/dotfiles/claude` changes, it pulls remote changes first (rebasing to keep history clean), then commits and pushes local changes.
- **On login:** Runs once at login to pull any changes from other machines.

### 6. Set up additional machines

On each additional machine:

```bash
git clone git@github.com:your-username/dotfiles.git ~/dotfiles
ln -s ~/dotfiles/claude ~/.claude
```

Then create the same LaunchAgent plist and load it. Both machines now auto-sync in both directions! 🥳

## How it works in practice

You edit your `CLAUDE.md` on Machine A (or Claude Code does). The LaunchAgent detects the file change, commits "Auto-sync 2026-03-08 21:28:39", and pushes. Next time Machine B's LaunchAgent fires (on its next file change or login), it pulls the update.

In practice, as of 8 March 2026, whenever you send a new message to Claude via Claude Code, its internals will somehow trigger a change in the `~/.claude` folder (likely due to cache writes). This is what triggers the LaunchAgent to do a `git pull` immediately because of its WatchPath.

There's a small delay — it's not real-time. But for config files that change a few times a day at most, it's effectively instant.

## One caveat: project memory paths

Claude Code encodes project memory paths using the absolute directory path, e.g. `projects/-Users-nickang-code-myproject/memory/MEMORY.md`. If your code lives at the same absolute path on both machines (same username, same directory structure), this works seamlessly. If not, you'll have separate memory files per machine — which is honestly fine, since project context often differs between machines anyway.

## Debugging

If sync isn't working, check the LaunchAgent logs:

```bash
cat /tmp/dotfiles-sync.out   # git output
cat /tmp/dotfiles-sync.err   # errors
```

Common issues:

- **LaunchAgent not firing:** Verify with `launchctl list | grep dotfiles`. Exit status `0` means it ran successfully.
- **Merge conflicts:** Rare with config files, but if it happens, manually resolve in `~/dotfiles` and the next auto-sync picks up cleanly.
