---
title: "The better way to approach a new programming language at work"
date_published: "2017-04-08"
tags: ["Tech"]
backlinks:
ai_summary: "The post argues that when learning Python and Django at work, the author initially relied on mimicking existing code in a large codebase rather than studying the language and framework fundamentals. This seemed faster at first, but it became clear during a weekly report revamp that copying patterns slowed problem-solving when no similar example existed, while reading the documentation and understanding the tools would have saved time. The conclusion is that engineers should prioritize deep understanding over imitation because it improves effectiveness and speed in the long run."
---

![](images/jay-wennington-2250-min-1024x683.jpg)

Since joining the [Metisa](https://askmetisa.com) team at [Altitude Labs](http://altitudelabs.com/), I've had to learn a new programming language: Python. Before this I'd only known JavaScript and Ruby. When I learned that I'd be joining as a software engineer, I started doing coding challenges on Codewars. Was that enough? Nope. A software engineer at a startup needs to know much more than how to write clean and efficient algorithms!

The challenges of coding in Python were not unexpected, but I was surprised at the way I unknowingly dealt with it. Let me explain.

On a day to day basis at work (on the programming front), I have to:

- Understand new sections of the existing Python codebase (consisting of 300k+ lines of code)
- Modify parts of the code
- Write code for new features
- Ensure that the above continues to work with the rest of the codebase (ie. not introducing bugs)

There are at least 2 distinct ways to approach these tasks:

1. Mimic what has been done by the engineers who wrote the existing code
2. Learn the fundamentals of the Python language and the web framework Django, and write code informed by that understanding

For reasons unapparent until now, I'd been approaching my tasks the first way. That is, I constantly looked within the project that already did what I'm supposed to do or something similar, take "inspiration" by copying the code and modifying it based on what other engineers in the team had done.

This felt so natural that I never stopped to question it.

## Approach 1: Mimicking existing code

### Benefits of mimicry

First of all, let's be clear. Before an engineer ever chooses to mimic the existing codebase, he must first trust it.

Python code looks very similar to Ruby on the surface (though it has significant differences I won't dive into) and because I knew Ruby, I could roughly make out what different parts of the project were responsible

After reading through the codebase the first time, I got a sense that the project was not haphazardly stitched together by engineers who didn't communicate with one another. The code is DRY (do not repeat yourself) and modular, and most of the files were placed in directories that felt natural. All was good.

As a junior engineer, you tend to think that any other engineer is better than you. Thankfully for me, this is the truth at Metisa. I'm working with terrific engineers.

Once I've learned to trust that my predecessors have done a good job building the project, I naturally assumed that the way they had approached problem-solving in their code must have been well thought-out. A lot of it even looks like they had been refactored (ie. reorganised and made more succinct and readable).

If that's the case, why should I bother to reinvent the wheel? It made more sense to ride on the shoulders of my fellow engineers.

I think I subconsciously reasoned it like this:

- an engineer (who is better than me) wrote all this code
- based on what I can understand of the codebase, most of the code looks well-written
- if the above is true, then it's probably right to assume that every design pattern, every decision has been thought through
- therefore it would be a waste of my time trying to construct what has already been constructed
- /copies, pastes, modifies

I still think the above is logical. Ok, perhaps the assumption that everything is well thought through just because most of it are is bordering on fallacious. But the rest of it makes sense and are mostly true based on my experience so far.

But there's one thing I haven't mentioned yet that is a major force behind everything we do at a startup like Metisa. That's **time**. _I believed that by copying and pasting and modifying, I'd be moving faster_. The faster I move, the quicker my team and I can ship changes and features, and ultimately, the sooner we can reach more customers.

But it's become apparent to me recently that mimicking code is slowing things down instead of speeding them up.

### Problems with mimicry

I realised this problem by chance. Recently as I was working on revamping the Weekly Report that we send out to our users about the health of their e-commerce business, what I thought would be a single-day job turned out to take 3 days.

When these things happen, you just have to get to the bottom of it. I took a hard look at what went wrong, at what made the process so much longer than I'd anticipated, and I chalk it up to my mimicry.

> Because I had been mimicking existing code, when I was presented a problem that required fresh thinking, I struggled to come up with a solution.

I struggled to find something in the codebase to lift and rework. That struggle cost me almost 2 extra days. I'd opened every file and done global searches within the codebase with no result. Then, when I felt like I'd exhausted this method, I looked outside of the project for the first time.

_Boy_ was it a cathartic moment.

## Approach 2: Coding from understanding

Django (the Python web framework we used) has great documentation. It's full of examples and it reads like a personal tutor's notes. When I finally referred to it I found myself saying to myself, "what have I been doing this whole time?"

Here's the embarrassing thing: I was taught to read documentation while learning to be a developer at [General Assembly](/2017-03-12-general-assembly-singapore-review/). We were told that the source of truth is the documentation of whatever library/framework you are using, so refer to it accordingly.

But I think I must have reasoned in my head that reading documentation is quite time consuming, and I couldn't afford the time.Compared to mimicking code, it felt slower. (Also, if you code like the engineers around you, they are more likely to appreciate and like your work when you submit your pull request...)

But the truth that I now see is that learning how things work, especially things like the frameworks and tools you use on a daily basis as a software engineer, is going to **save you time in the long run**. Now that I understand that Django queries start with `Tablename.objects` and have a list of methods that are chainable like `.filter(action='click')` and you can sum certain values up with annotations, and so on, I know exactly what to do next time I need to query the database.

The point is this: the more you try to understand the code, the greater the number of cases/problems you are ready to code for. I think this observation has something in common with the other one I made about [always starting with the basics](/2016-08-21-always-get-the-basics-first/).

### TL;DR

Sort-of-understanding code and mimicking other people's code may save you time in the short run, but if you are serious about being a good (read: effective) software engineer, you should strive to understand the code at a fundamental level.

The latter will save a lot of time in the long run because all the time you'd normally spend searching for a similar implementation to mimic? They can be apportioned generously to constructing your own code, code whose inner workings you understand precisely.
