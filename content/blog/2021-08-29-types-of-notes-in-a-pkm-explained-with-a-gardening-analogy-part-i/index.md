---
title: "Types of Notes in a PKM explained with a Gardening Analogy (Part I)"
date_published: "2021-08-29"
excerpt: "Using a PKM requires reframing the goal from creating notes to creating connections, and a good place to start is to look at the types of notes in a PKM. Part 1 of 2."
tags: ["PKM"]
backlinks:
  - slug: "/2020-07-05-personal-knowledge-management-system/"
    title: "What is a Personal Knowledge Management system (PKM)?"
  - slug: "/2021-02-21-obsidian-roam-why-i-am-staying-with-bear-as-my-pkm/"
    title: "Obsidian? Roam? Why I am staying with Bear as my PKM"
  - slug: "/2021-07-25-7-signs-that-my-knowledge-management-process-is-broken/"
    title: "7 Signs that my Knowledge Management process is broken"
  - slug: "/2021-09-05-types-of-notes-in-a-pkm-explained-with-a-gardening-analogy-part-ii/"
    title: "Types of Notes in a PKM explained with a Gardening Analogy (Part II)"
  - slug: "/2021-12-04-labeling-things-properly-in-a-digital-garden/"
    title: "Labeling things properly in a digital garden"
  - slug: "/adding-backlinks-to-gatsby-without-plugins/"
    title: "Adding backlinks to a Gatsby blog without plugins"
  - slug: "/annual-review-2021/"
    title: "My 2021 Annual Review"
ai_summary: "The post explains types of notes in a personal knowledge management system using a gardening analogy, focusing on atomic notes as the core unit and other notes as supporting tools. The author argues that PKM should shift from simple note-taking to note-making, emphasizing linked, evergreen notes over isolated capture, and describes a single top-of-mind note for inbox and ongoing items as a practical way to process ideas. The conclusion is that a PKM works best when it stays simple, grows connections among atomic notes, and evolves as needed over time."
---

*If you're new to PKM, I recommend starting by reading [What is a Personal Knowledge Management system (PKM)?](/2020-07-05-personal-knowledge-management-system/).*

A skeptic would call a PKM a glorified set of notes the same way I used to call an SQL database a glorified Excel sheet. It wasn't until I realised just how much *more* an SQL database provides in terms of design and features that I stopped belittling it. By applying my knowledge and using it regularly, a database became more than just rows and columns to me.

I think the same can be said about notes in a PKM. They're not just notes. For us to be successful in creating our own PKMs that will feed us for the rest of our lives, we need to reconfigure the way we view note-taking.

Let's start with that. Note-taking is an outdated term for describing what people are nowadays trying doing with a PKM. 

As [Nick Milo](https://www.youtube.com/watch?v=68huyTJjBF0) puts it, note-taking is just the capture step; the larger process at play is note-*making* where you don't just write a note but contend with the idea you're putting in it to make connections to your already existing notes. Pure capture without deeper consideration leads only to [transient notes](https://notes.andymatuschak.org/z2ZAGQBHuJ2u9WrtAQHAEHcCZTtqpsGkAsrD1).

In the last two to three years, the advent of linked notes, ushered by a handful of PKM software developers like [Roam Research](https://roamresearch.com/) and [Obsidian](https://obsidian.md/), have enabled *note-making*. This is about externalising thinking in a way that establishes explicit and implicit connections among your notes.

One thing that helps me remember what note-making is about is to remember that a note is only as valuable as the contexts in which it can contribute. Seen this way, we reframe the goal from creating many notes to creating many connections among a smaller set of evergreen notes.

I think a good way to start reframing our perspective and mental models is to look at the various types of notes that we might have in your PKM. 

Since it's your PKM, you could invent as many types of notes as you want! But complex workflows only withstand the test of time if they're whittled down to their essential components. So, our list of types of notes should be short at the beginning so we don't let complexity build up at the structure level.

Happily, I've learned through selective copy-and-use that there are just two main buckets of notes:
- Atomic notes
- All other types of notes

An atomic note contains a single idea and whose sole purpose is for us to externalise what [Andy Matuschak calls](https://notes.andymatuschak.org/z3SjnvsB5aR2ddsycyXofbYR7fCxo7RmKW2be) "a fundamental unit of knowledge work." 

All other note types exist only to assist us in developing those atomic notes and their connections.

One quick technical primer before we go deep: throughout this post, you will see examples of my notes and some feature weird double-square brackets, like `[[@-John Doe]]` and `[[Types of Notes in a PKM explained with a Gardening Analogy]]`. These are called [Wiki-style links](https://en.wikipedia.org/wiki/Wikipedia:Manual_of_Style/Linking) and most PKM software uses them to let users explicitly link words to another note. This simple link is an earth-shakingly powerful feature because of how it enables each note to become a single node in a network of linked nodes, and we will see a glimpse of it in the Daily Note section later.

Right, now let's dig in, with a gardening analogy.

## Atomic note

![PKM garden illustration](./images/personal-knowledge-management-PKM-garden-nickang.png)

Let's start with the atomic note. This is the basic building block of a PKM. Each atomic note should contain a single idea written in your own words and it should have a descriptive title (or filename). An atomic note is like a seed that could grow into a great oak.

Writing an atomic note is like writing a single idea on an index card that you can hold in your hand.

The idea of the *digital* atomic note came from the immensely effective use of physical index cards by the prolific sociologist [Niklas Luhmann](https://en.wikipedia.org/wiki/Niklas_Luhmann), who had a private collection of [over 90,000 index cards](https://sociologica.unibo.it/article/view/8350/8272), which he used to publish 58 books and hundreds of articles, many of which became classics in their respective fields.

![scan of one of Niklas Luhmann's physical index note](./images/niklas-luhmann-zettel.png)
_Luhmann's note entitled "The system as a research tool" (Das System als Forschungsmittel), from [online archives](https://niklas-luhmann-archiv.de/bestand/zettelkasten/zettel/ZK_1_NB_8_1_V)._

Thankfully, we don't need to use physical index cards. A big advantage of working with digital notes is that we can link notes endlessly and effortlessly.

Another useful thing: we can insert useful metadata that aid us with future search within our PKM. With digital tagging as simple as using hashtags (e.g. `#develop`), we can, for example, mark each atomic note by its stage of development.

Stage of development? Of an atomic note? What am I talking about?

Just like in reality, our ideas are at different stages of maturity. For example, I understand what critical thinking entails more than first-principles thinking.

This is why I add maturity metadata to every atomic note that I create in my PKM. Here's how I like to think of the stages of maturity of atomic notes, adapted from [Bryan Jenks' workflow](https://www.youtube.com/watch?v=r-buPWeuTPc):

```
seed -> seedling -> sapling -> evergreen
```

And to indicate each note's maturation stage, I use hashtags:

- #📤: Seedbox | items that I am / will be working actively on
- #🌱: Seedling | items grown from literature notes that still need incubation
- #🪴: Sapling | items in need of planting among other trees
- #🌲: Evergreen | fundamental unit of knowledge work, stable for dense linking to & from

With this analogy, every atomic note begins as a seed in the seedbox, waiting to be developed, and the end-goal is for me to develop it to reach the evergreen stage where it is stable and can be [densely linked](https://notes.andymatuschak.org/z2HUE4ABbQjUNjrNemvkTCsLa1LPDRuwh1tXC) from other atomic notes of various maturity stages. I also link non-evergreen atomic notes to one another wherever there is a logical connection to be made.

Making atomic notes is a whole art by itself and so I cannot feasibly cover everything in this post. But what's crucial is to know that our PKM should be all about growing these atomic notes -- from seeds to evergreens -- just as a garden is all about growing plants.

I will go into details of the process of maturing an atomic note from seed to seedling to sapling and evergreen in another article. For now, let's talk about the other types of notes that are meant to help us grow our database of atomic notes.

## All other types of notes

![tools in the garden PKM illustration](./images/personal-knowledge-management-PKM-garden-tools-nickang.png)

Keeping with the analogy of gardening, let's think of all other types of notes as *tools that a serious gardener would need*. A shovel, a spade, a watering can, gloves, scissors, and so on.

All of these are tools that *you choose to keep around* to serve you in growing your atomic notes. Even though each gardener will need to figure out what he finds essential to the task of gardening, most people will probably share common essentials. Here are some of mine:

- Top of mind note (only one)
- Daily note (numerous, always one per day)
- Index (only one)
- Outline of external resources (numerous)
- Map of content for original work (numerous)

For the rest of this article, I'll use various scenarios to illustrate when each type of note has been useful to me.

### 1. Top of mind note

This is probably the most important other note types for me because I use it every day to help me keep track of... well, what's top of mind.

**i. Inbox**

In the morning of a hypothetical day, a friend or internet acquaintance shares something about raising a child. It sounds interesting, so I insert that as an item in my top of mind note, because we're currently expecting:

```
- [ ] On raising kids - look into what [[@-John Doe]] said about Maya method - url, if there is one
```

Later in the day, I may feel like I've said something wrong or impolite to someone and I think I may need to apologise later, so I also put that down as an item:

```
- [ ] On raising kids - look into what [[@-John Doe]] said about Maya method - url, if there is one
- [ ] May have said something inaccurate and offensive to [[@-Ryan Foo]] - think & follow up
```

Perhaps in the evening, I get an idea that came out of nowhere and it's something that I know that I will want to explore soon. So I scribble that down as well:

```
- [ ] On raising kids - look into what [[@-John Doe]] said about Maya method - url, if there is one
- [ ] May have said something inaccurate and offensive to [[@-Ryan Bass]] - think & follow up
- [ ] I noticed myself saying "first principles thinking" to [[@-Barry Foo]] recently but I don't think I fully understand what that concept entails. Find out more. Side note, I think it's popularised by [[@-Elon Musk]]
```

In these scenarios, I use my top of mind note to park things that *I know* I will want to explore later. It's putting into action this modern truism that Tiago Forte tweeted recently:

<blockquote class="twitter-tweet"><p lang="en" dir="ltr">Before having a second brain: "That's important, I'll keep it in mind"<br><br>After having a second brain: "That's important, I won't keep it in mind"</p>&mdash; Tiago Forte (@fortelabs) <a href="https://twitter.com/fortelabs/status/1426659730563297280?ref_src=twsrc%5Etfw">August 14, 2021</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

This is the first section of the top of mind note, and I put them under the subheading **Inbox**. So the inbox section looks like this in my PKM:

![screenshot of my top of mind note inbox](./images/top-of-mind-inbox.png)

Just to be clear, when I sit down to process the items in my inbox, I will read, think, create new atomic notes, and link them to existing ones. That's how the inbox in the top of mind note helps me grow my PKM.

**ii. Ongoing**

Another scenario for using the top of mind note is when I've started working on something and I notice that I'm enjoying myself.

Writing this article is a good example: once I started, I found myself getting energised to finish a draft as soon as I can. So, as soon as I finished my first sit-down to write this article (in which I completed a rough outline and 20 percent of a first draft), I added this to the **Ongoing** section of my top of mind note:

```
## Ongoing
- [ ] Publish [[Types of Notes in a PKM explained with a Gardening Analogy]]
	- ■■□□□□□□□□ 20%
```

It's another to-do item, this time under the Ongoing section. But you probably also noticed the progress bar.

At one point I decided to try adding something visual to indicate that this item is in progress and how far along I estimate it to be; so I added a progress bar that I generated using a [free online tool](https://changaco.oy.lc/unicode-progress-bars/). I'm beginning to see myself more and more as a visual thinker and I'm happy to report that so far I've liked this addition. It terrifically distinguishes in-progress items from the inbox items in my top of mind note, nudging my mind to prefer finishing items that I have already started.

Here is how it looks in my PKM:

![screenshot of my top of mind note ongoing section](./images/top-of-mind-ongoing.png)

Now, time for a short aside. While I've said that all other types of notes should exist only to grow atomic notes, this section of my top of mind note reveals that that is not entirely true. The ongoing items in my PKM have so far included writing original posts like this one.

For now, I'd like to stay high-level and just say that as with a real garden, sometimes it bears fruits. Original essays and blog posts are like the fruits harvested from the garden. But not all gardeners care about the harvest; some tend to theirs just for self actualisation.

To close off this aside, I will divulge that in my PKM I also use a strawberry hashtag:

- #🍓: Fruit | original work harvested from the garden

There's a lot more that I can share, but I'm intentionally leaving out the rest of the little idiosyncratic details that should not matter to you. 

The benefit of a PKM is that you can trust that you will return to tweak it if something feels off or is no longer relevant since you're building your life's knowledge on it. So my recommendation is to add something whenever you feel like it may be overall a value-add to you, and see if it sticks (e.g. adding an *Errands* section). 

Note: there should only be a single top of mind note. The top is the top.

In the next post, let's talk about the remaining types of notes, including a note that mimics the natural rhythm of a day, outlines, an index, and maps of content.

*This is part I of a series. [Read part II](/2021-09-05-types-of-notes-in-a-pkm-explained-with-a-gardening-analogy-part-ii/).*