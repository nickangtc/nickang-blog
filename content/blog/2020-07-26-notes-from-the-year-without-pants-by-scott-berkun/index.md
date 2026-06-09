---
title: "Notes from The Year Without Pants by Scott Berkun"
date_published: "2020-07-26"
tags: ["Books", "Communication"]
backlinks:
  - slug: "/2020-07-19-the-magic-of-a-light-touch/"
    title: "The magic of a light touch"
  - slug: "/a-framework-for-prioritising-chunks-of-work/"
    title: "A framework for prioritising workchunks?"
ai_summary: "The post discusses Scott Berkun's The Year Without Pants, a book about his experience at Automattic and the lessons it offers about remote work, communication, and software product development. The author's main point is that the book is especially useful for people in tech because it shows how trust, small teams, clear writing, private conversations, and careful product judgment matter more than heavy process or metrics. The conclusion is that the book is worth reading for anyone in software or distributed teams, and that the best approach is usually a balanced one rather than rigidly favoring structure or spontaneity."
---

This was a book that I originally thought was written by the founder of WordPress, Matt Mullenweg. Turns out, it was written by someone who joined Automattic (the company behind WordPress.com) as the first experimental Team Lead in the company's history. He believes this book is "a contribution I believed would be more important than my involvement with any number of teams" and it's easy to agree. Maybe that's because I relate to him as someone who is in tech and enjoys writing.

I recommend this to anyone who is involved in software development or working in a remote or fully distributed company.

![book cover of the year wihtout pants by Scott Berkun](images/the-year-without-pants-scott-berkun-nickang-notes.jpg)

Below are my highlights from the book.

## Customer support and writing

> It actually felt great, for the first week, when I helped someone. It was like unblocking a little stream so the happy little fish could swim on. Every closed ticket gave me the sense that things were a little more right in the world. But as weeks wore on, my resentment grew. Even with tickets that required ingenuity to figure out or to explain, it bothered me that only one person would benefit from my effort. And when that person succeeded… she would throw it away and never look at it again. 

I am a blogger, and one of the reasons I bother to write and publish online is so that I can [share my processed thoughts in a neat package](/2020-06-28-word-rafting/) to anyone I come across in life who I think might be interested to hear them.

I am also someone who handles technical escalations in support at the company I currently work for and so I, like the author, have to write a lot of technical explanations to customers. I just do it much more often than the author had to during his time at WordPress because he was merely doing a mandatory short stint as a "Happiness Engineer". On the other hand I do around 8 hours of technical customer support weekly at the time of writing this, and it's really painful to know that my efforts in writing something succinct usually dies with the resolution of **one** customer's problem.

The lesson? Accept that as long as you see writing as a tool for communicating to more than one person, doing customer support will always feel slightly painful because, well, your writing gets flushed down the drain with each closed ticket.

## Working with people in a fully distributed company
The author's ideas are coming from his experience at Automattic, which is a fully distributed company, but I think the lessons are applicable to any remote job.

### The magic size of a team is around 4-6

The author claims ego is the problem when a team becomes too large. And he cites the US Army's observation and methods for training solders since 1948 ([Wikipedia for "fireteams"](https://en.wikipedia.org/wiki/Fireteam)):

- "Larger groups were less likely to fire their weapons to defend themselves, but if they were trained in small units, their rates of fire increased."
- "It's likely that smaller units will naturally form despite what the organisation chart says."

### Being the meeting scribe is a quick way to gain trust

Why?

- People get to see how you think
- Clear and honest recording of the meeting? -> gain trust point
- Able to summarise complex things in concise but accurate manner? -> gain trust point

This is especially applicable when working in a distributed team where the  meeting notes are shown in real-time to everybody.

### Talking to people 1-1 gets attention, builds trust, and gets things done

> "The realisation that everyone is different when you talk to them alone is a secret to success in life. **In private you have their full attention**. If you talk to two children in front of their mom and then each alone, you hear different things. The mystery for why some people you know succeed or fail on life is how courageous they are in pulling people aside and how effective they are in those private conversations we never see."

When I first read this I found myself thinking, "that's a bold claim!" And then I found myself nodding. When you have someone's full attention, you get access to that person's ways of thinking and knowledge. 

In the book *Sapiens*, the author explains how language enables trust: "It's much more important for them to know who in their band hates whom, who is sleeping with whom, who is honest, and who is a cheat."

Language creates packages of vital consumable information, and attention is the means to extract those packages.

### Be aware of the bike shed effect of  complex discussions

In a remote setting where discussions take place predominantly online, there is a tendency for big ideas to not get proper attention from the people.

> The short attention spans born from working online meant that P2 posts with grand ideas, ones that demanded deep thinking for the reader, were overlooked in favour of ones that were easy to respond to (a common occurrence in online discussions known as the bike shed problem, or Parkinson's law of triviality.

The consequences of this are incremental instead of epic thinking, which leads to incremental product development. It's not necessarily a bad thing. Awareness alone should enable us to start paying more attention to bigger ideas and contribute.

But there is another side of the bike shed effect that is more dangerous. Parkinson's law of triviality is explained by Parkinson in the context of a fictional atomic reactor planning committee:

> A reactor is so vastly expensive and complicated that an average person cannot understand it, so one assumes that those who work on it understand it. On the other hand, everyone can visualize a cheap, simple bicycle shed, so planning one can result in endless discussions because everyone involved wants to add a touch and show personal contribution.

That's an example of an atomic reactor. The original application of this bike shed effect to software development is by Poul-Henning Kamp in 1999: [Why Should I Care What Color the Bikeshed Is?](http://bikeshed.com/)

The lesson? Don't comment on a discussion just because you have knowledge or experience in what is being discussed. Enough people will naturally think of the bike shed - we should probably worry about the bigger aspects of the project.


## Software product development

What's a book that talks about experiences at one of the most well-known tech companies worth if there weren't lessons about software product development?

### Design the user interface first, not last

> The natural mistake engineers make is to build from the bottom up. **They leave the user interface last, assuming it is the least complex technology.** This is wrong. Humans are much more complex than software, and **since the interface has to interact with people, it's the most difficult to do well**. By building from the bottom up, technologists paint themselves into a corner, resulting in ugly, hard-to-use things. By the time they finally got to the user interface work, so many constraints exist that even the best designers in the world couldn't salvage the project. The answer is simple: design the user interface first. This is a mandate at any organization that makes things people love to use.

I wrote about this "natural mistake" in a blog post - [Why programmers make visually ugly projects | Nick Ang](https://www.nickang.com/2016-09-08-programmers-ugly-projects/).  My argument is that functionality is more important than form to a software developer. However, I can see what the author is saying and I agree - designing the UI first is probably the antidote to ugly projects that nobody enjoys using, and it because it involves the complex creature called humans, it could well be a more difficult problem than writing code.

### The paradox of safeguards

In the context of WordPress' fully autonomous, no-planning style of work,  safeguards present a paradox:

> To anyone who has worked on a large project, this all sounds like madness. How can they work without schedules? How can there be no safeguards? Why wouldn't things blow up and collide all the time?
>  
> A major reason it works at Automattic is belief in a counterintuitive philosophy: *safeguards don't make you safe; they make you lazy*. **People drive faster, not more slowly, in cars with antilock brakes. American football players take more risk, not fewer, because of their padding.** 

In the case of WordPress, they take the attitude of treating employees as adults. "By not having too many safeguards, we were trust to pay full attention. **Keeping things a little dangerous made things safer.**"

### Be aware that all metrics create temptations and can often lead to a self-destructive circle

The author explains why creating metrics for measuring performance in a company always ends up as a self-destructive circle:

> "... people will naturally, even subconsciously, work to game the metric. They want to 'do good,' and once leaders put up a scoreboard that everyone sees, it has unexpected power."
>  
> "Workers can't resist hourly glances at the score, reinforcing gentle judges in how they make decisions that hike the number upward, at the cost of everything else that isn't represented on the scoreboard."

The way to reduce this temptation is to acknowledge that data helps you see things more clearly if captured carefully but it's not supposed to decide for you. In other words, **aim for a data-influenced culture, not a data-driven one**.

And perhaps more importantly, aim for balance between using data and intuition to inform decisions.

### Cathedral vs Bazaar approach

The question is, "is it better to invest time in making a big masterful plan or instead to start immediately and figure it out as you go?"

Cathedral style is usually marked by a singular tyrant who has all the answers to how a cathedral should be built.

Bazaar style is usually marked by a band of people kicking something off by starting small, borrowing, contributing, experimenting, and collaborating as they wish. Wordpress was like this and it had problems:

> "For all of the strengths of WordPress's bazaar culture, its user experience lacked the grace and clarity a cathedral architect would naturally provide."

The author states clearly that this is a false dichotomy, and the most successful approach is likely one that is balanced.

I wrote about the benefits of a light touch in another [article](/2020-07-19-the-magic-of-a-light-touch/). I'm for bazaar style for personal projects. 
