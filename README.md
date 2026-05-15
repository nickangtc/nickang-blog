# nickang.com

This is the source code for my blog at <https://nickang.com>. It is currently powered by Astro and Markdown.

I made the decision to open source my blog so that more people can copy-paste and reference the source code of a functioning personal blog.

## License

The following directories and their contents are Copyrighted by me, Nick Ang. You may not reuse anything therein without my permission:

- content/

For everything else in this public repository you may use freely according to the MIT License. If you do use them, I would appreciate a link back to <https://nickang.com> and this repository, but it is not required.

## Notes

### Tags

**Remember!** Wrap all tags in "" in frontmatter for easy search. e.g. searching for articles tagged "Tech" is much easier when searching `"Tech"` instead of `Tech`.

List of unique topic tags:

- **"Tech"** - Software Development - Design - Product
- **"Interviewing"** - self-explanatory
- **"Career"**
- **"Living"** - Mindfulness - Parenting - Habits - Society & Culture
- **"Creativity"** - Writing - Blogging - Problem Solving
- **"PKM"** - Note Taking
- **"Leadership"**
- **"Communication"**
- **"Productivity"** (maybe?) - Workflow - Taming complexity
- **"Fiction"** - Flash fiction, Short story, Poem
- **"Good intentions"**
- **"Announcement"**
- **"Money"**
- **"Parenting"**
- **"Strictly 30"**: Experiment to write, edit, publish in under 30 mins
- **"2025 - Notice"**: Goal 1 of 2025 is paying attention well
- **"2025 - 12 Books"**: Goal 2 of 2025 is becoming well-read, starting by reading 12 books in the year
- **"Daily Reflection"**: Daily reflection to consolidate each day's information

List of unique type tags:

- **"Project"**: Project showcase or build log; shown in the dedicated `/projects` index and omitted from the main blog list.
- **"Book"**
- **"Tutorial"**
- **"Raw essays"** - 30 days raw essays project
- **Collection** - holds any growing collection of things
- **Notes** - open, loose reflections from an event (e.g. learning a new thing, watching a video, etc.)

List of unique statuses:

- draft - hidden from blog list page
- revisit - things that I want to be resurfaced for follow-up some time in the future

## Scripts

### Create a new post

Use the node script -- new.js -- to create a new untitled post whenever you are ready to write.

```shell
node ./new.js post
```

The post starts in a unique `content/blog/untitled-YYYY-MM-DD-HHMMSS/` folder. After you fill in the frontmatter `title` in `index.md`, the version-controlled pre-commit hook automatically renames that untitled folder to the title slug and stages the rename.

Hooks are configured automatically on `npm install` via `prepare`. If needed, run this manually:

```shell
npm run setup-hooks
```

### Review posts and tag some as personal

I wrote another node script -- housekeeping.js -- when I decided to review my post archives to tag some of them as personal so that they do not appear on the main blog listing page.

```shell
node ./housekeeping.js review
```
