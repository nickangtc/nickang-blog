---
title: "Obsidian? Roam? Why I am staying with Bear as my PKM"
date_published: "2021-02-21"
excerpt: "The tool does not need to be sophisticated. Your note-taking workflow does."
tags: ["PKM"]
backlinks:
  - slug: "/2020-07-05-personal-knowledge-management-system/"
    title: "What is a Personal Knowledge Management system (PKM)?"
  - slug: "/2021-05-20-how-a-daily-note-fixed-my-note-taking-process/"
    title: "How a Daily Note fixed my note taking process"
  - slug: "/2021-07-25-7-signs-that-my-knowledge-management-process-is-broken/"
    title: "7 Signs that my Knowledge Management process is broken"
ai_summary: "The post compares Bear, Roam, and Obsidian as personal knowledge management tools after the author briefly tried the latter two while looking for block-level linking and other advanced note features. The main point is that those extras were mostly nice-to-haves, while Bear's simplicity, reliability, and low friction better suited the author's needs and reduced mental clutter. The conclusion is that the best PKM tool is usually the one that is already good enough, so the focus should stay on thinking and writing rather than endlessly changing software."
---

My mind is cluttered and my notes system should help reduce that clutter, not add to it. For the past 3 weeks, as I let a small unfulfilled need push me to explore new tools, my mind got more and more cluttered. Today, I realised that I'm just going to stick with the trusty old **Bear app** as my [PKM (personal knowledge management) system](/2020-07-05-personal-knowledge-management-system).

The one small need I had as I was taking notes one day in Bear was to make a reference from Note A to a particular paragraph in Note B. I had already been linking my notes with `[[some other note's title]]` wiki-links regularly, but I had never linked to a specific part of another note. I thought if I could do that, I would rid my entire PKM of repetition. Zero repetition, a la [the promise of Xanadu](https://www.wired.com/1995/06/xanadu/). That would be great!

So I sent a direct message to Maximillian ([@maxwschulz](https://twitter.com/maxwschulz)) on Twitter to ask him for his opinion, knowing that he used [**Roam**](https://roamresearch.com/) for his PKM. I heard about Roam and #roamcult several times, and I knew about their $9 million [funding round](https://angel.co/today/stories/a-200-million-seed-valuation-for-roam-shows-investor-frenzy-for-note-taking-apps-29550) recently (which gave me less confidence, not more, of it as a tool that is here to stay), but I had never used it before. 

Maximillian turned out to be a great conversation partner for this as he sent me extremely relevant links to tutorials by thought leaders in the field of PKM. I got started with Roam.

## 2 weeks of Roam Research app

I tried Roam for 2 weeks and used it extensively while at work. Roam defaults to an automatically created Daily Note entitled with the day's date in YYYY-MM-DD format as the note you see when you open the app. I thought (and still think) it was a brilliant way to create a timestamped blank canvas upon which you can take ephemeral notes that you can then link later on to other notes.

I originally intended to experiment with Roam for the full 1-month trial, but I stopped after 2 weeks when a few things became clear:
1. I could not stand my notes being in a **proprietary format**. You can export your notes in either Markdown or JSON, but the backlinks will not work because of the way the markup is inserted
2. I did not like thinking in terms of **bullet points** by default, which Roam forces you to. You can toggle a page to be viewed as a "Document," but I found that it was just cosmetic. The bullet points were just hidden! Each item was still a block, which made copy-pasting from Roam to other places a nightmare in terms of formatting

So just before the 2 weeks were up, I talked to Maximillian again. We talked about being locked-in to Roam's software decisions and somehow, a free alternative to Roam came into the picture: [**Obsidian**](https://obsidian.md/).

## 1 week of Obsidian app 

I spent around 1 week in Obsidian after having watched the wonderfully comprehensive and therapeutic [videos by **Nick Milo**](https://www.youtube.com/channel/UC85D7ERwhke7wVqskV_DZUA). I think I enjoyed watching his videos a little too much.

The nicest things about Obsidian over Bear:
- It's free to use.
- It works on the local filesystem so it is future-proof and backups are automated as long as you have the Vault folder in Dropbox or equivalent.
- It is extensible and comes with a lot of core and community plugins like Daily notes, Templates, Graph view.

The nicest things about Bear over Obsidian:
- Bug-free and writing-focused user interface.
- Mobile and desktop apps work seamlessly together, so you can find and edit a specific note easily on the go.
- It is uncomplicated because it has no plugins and other bells and whistles. Something is either a feature or it is not. This is **helpful friction**.

After close to a week, my stressed-out mind was ready to rage-quit, so I stopped the shenanigans and asked myself, do I need this complex software? **What do I expect out of my PKM?** At the back of my mind I was also concerned about prolonging my messy mind because migrating away from Bear and into Obsidian would take a nontrivial amount of time.

## Nice-to-haves versus Must-haves

I concluded that *all* of the features that Roam and Obsidian provide on top of Bear are nice-to-haves for me.

👍 Must have
🤷‍♂️ Nice to have
😐 Not necessary at all

- 🤷‍♂️ Ability to reference a specific block from a different note.
- 🤷‍♂️ Ability to block embed another note in a particular note.
- 🤷‍♂️ Ability to block embed a block from another note.
- 🤷‍♂️ Viewing backlinks from other notes to a particular note.
- 😐 Viewing a pretty graph of how notes are connected.

There is a high cost of learning how to use these systems. Obsidian much less so than Roam (for me, since I'm very familiar with filesystems as a programmer), but still, there is a price that you will need to pay to learn a new tool. Time, energy, stress from the uncertainty - the costs were too high for me.

Also, there is a monetary cost for Roam. At $15 a month, Roam costs 5 times more than Bear. On the other hand, Obsidian is free if you find your syncing solution.

What brought me back down to earth was [Andy Matuschak live streaming his note-taking process with Bear](https://www.youtube.com/watch?v=DGcs4tyey18). His 1.5 hours of live streaming **using Bear** made it clear to me that if you wanted to, you could build complex workflows on top of a simple, reliable note-taking app. He pushes the limit of Bear, using keyboard shortcuts to tile multiple notes across the screen, to search Bear, to delete a note, and so on. He knows how to code and has written scripts to improve his workflow, something that I could do, too, if I needed to in the future.

## What I'm doing differently in Bear after this

- I know I don't need to view backlinks. If I ever do, I can search using `[[note title]]` and find references.
- I will remove all timestamp prefixes from all my note titles as they are unnecessarily hurting readability. IDs are built into digital notes anyway, and I can refer to notes by their titles and not their IDs, unlike Luhmann with paper index cards. I'm not sure why it took me this experiment to realise I could do this.
- Make this article a clear reminder to myself to consider how much time will be wasted in exploring a new tool, to discourage me from doing another one of these experiments, hopefully for years or decades. **Focus on thinking**, not fiddling with tools!
- Create a **Daily note** as the jumping-off point for everything else. A welcoming blank canvas.
- I might start calling structured notes "MOCs" (maps of content), the term [coined by Nick Milo](https://publish.obsidian.md/lyt-kit/MOCs+Overview), because they are more accurate and descriptive.
- Find a theme that visualises bold text with a different colour in Bear. The Cybertron theme in Obsidian, also by Nick Milo, helped me learn to like this in just 1 week.

Despite the anxiety-inducing cluttered mind that arose from my experimentation, I do not find the last 3 weeks to be a waste of time. In that time I have learned plenty about **what I want out of my notes**. I have learned that the most important thing is not the tool but your time spent thinking in the tool and the words that you write in a note as a result of that thinking. 

For a reminder of the simplicity of the tooling needed to create an effective PKM, one needs only to remember Luhmann's metal cabinets of paper cards.  The prolific social scientist whose Zettelkasten method is what this zeitgeist is based on, used only pen, paper, and filing cabinets to produce his work.

Don't overcomplicate things. Your tool is probably good enough already. Focus on making thoughtful notes.

---

**UPDATE (25.07.2021)**: Facing some issues and seeing that Obsidian released a functional mobile app in July 2021, I'm looking once again into Obsidian. Read here: [7 Signs that my Knowledge Management process is broken](/2021-07-25-7-signs-that-my-knowledge-management-process-is-broken/).

**NEW (29.08.2021)**: Want to dive deeper into personal knowledge management? I wrote more about this, read it here: [Types of Notes in a PKM explained with a Gardening Analogy](/2021-08-29-types-of-notes-in-a-pkm-explained-with-a-gardening-analogy-part-i/).