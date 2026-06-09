#!/usr/bin/env python3
"""
Normalize blog post formatting before commit.
Converts smart quotes, removes invisible characters.
"""

import argparse
import subprocess
import sys
from pathlib import Path

PROJECT_ROOT = Path(__file__).resolve().parent.parent

SMART_CHARACTER_REPLACEMENTS = {
    '\u2018': "'",  # Left single quote
    '\u2019': "'",  # Right single quote
    '\u201C': '"',  # Left double quote
    '\u201D': '"',  # Right double quote
    '\u200B': '',   # Zero-width space
    '\u00A0': ' ',  # Non-breaking space
}


def normalize_text(content):
    """Normalize typography outside YAML frontmatter."""
    for character, replacement in SMART_CHARACTER_REPLACEMENTS.items():
        content = content.replace(character, replacement)
    return content


def normalize_frontmatter(content):
    """Normalize typography without breaking double-quoted YAML scalars."""
    normalized = []
    in_double_quoted_scalar = False
    escaped = False

    for character in content:
        if character in ('\u201C', '\u201D') and in_double_quoted_scalar:
            normalized.append('\\"')
            escaped = False
            continue

        replacement = SMART_CHARACTER_REPLACEMENTS.get(character, character)
        normalized.append(replacement)

        if character == '"' and not escaped:
            in_double_quoted_scalar = not in_double_quoted_scalar

        if character == '\\' and not escaped:
            escaped = True
        else:
            escaped = False

    return ''.join(normalized)


def normalize_content(content):
    """Normalize a Markdown document, treating YAML frontmatter separately."""
    lines = content.splitlines(keepends=True)

    if not lines or lines[0].rstrip('\r\n') != '---':
        return normalize_text(content)

    for index in range(1, len(lines)):
        if lines[index].rstrip('\r\n') == '---':
            frontmatter = ''.join(lines[1:index])
            body = ''.join(lines[index + 1:])
            return (
                lines[0]
                + normalize_frontmatter(frontmatter)
                + lines[index]
                + normalize_text(body)
            )

    return normalize_text(content)


def normalize_blog_post(file_path):
    """Normalize typography in a single blog post."""
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()

        original = content
        content = normalize_content(content)

        # Only write if changed
        if content != original:
            with open(file_path, 'w', encoding='utf-8') as f:
                f.write(content)
            return True
        return False
    except Exception as e:
        print(f"❌ Error normalizing {file_path}: {e}", file=sys.stderr)
        return False


def get_staged_new_blog_posts():
    """Return newly added blog posts currently staged in git."""
    output = subprocess.run(
        [
            "git",
            "diff",
            "--cached",
            "--name-only",
            "--diff-filter=A",
            "-z",
        ],
        cwd=PROJECT_ROOT,
        check=True,
        capture_output=True,
        text=True,
    ).stdout

    return [
        PROJECT_ROOT / file_path
        for file_path in output.split('\0')
        if file_path
        and file_path.startswith("content/blog/")
        and file_path.endswith("/index.md")
    ]


def stage_files(file_paths):
    """Stage normalized files so hook-generated changes enter the commit."""
    if not file_paths:
        return

    subprocess.run(
        [
            "git",
            "add",
            "--",
            *[str(file_path.relative_to(PROJECT_ROOT)) for file_path in file_paths],
        ],
        cwd=PROJECT_ROOT,
        check=True,
    )


def main():
    """Normalize all blog posts in the content/blog directory."""
    parser = argparse.ArgumentParser()
    parser.add_argument(
        "--staged-new",
        action="store_true",
        help="normalize and re-stage only newly added staged blog posts",
    )
    args = parser.parse_args()

    blog_dir = PROJECT_ROOT / "content" / "blog"

    if not blog_dir.exists():
        return 0

    normalized_count = 0
    normalized_files = []
    index_files = (
        get_staged_new_blog_posts()
        if args.staged_new
        else blog_dir.glob("*/index.md")
    )

    for index_file in index_files:
        if normalize_blog_post(index_file):
            relative_path = index_file.relative_to(PROJECT_ROOT)
            print(f"✓ Normalized: {relative_path}")
            normalized_count += 1
            normalized_files.append(index_file)

    if args.staged_new:
        stage_files(normalized_files)

    if normalized_count > 0:
        print(f"✓ Normalized {normalized_count} blog post(s)")

    return 0

if __name__ == "__main__":
    sys.exit(main())
