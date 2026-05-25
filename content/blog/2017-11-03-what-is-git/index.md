---
title: "What is Git?"
date_published: "2017-11-03"
tags: ["Tech"]
backlinks:
  - slug: "/2018-02-28-git-and-github/"
    title: "All you need to know about Git and GitHub"
  - slug: "/bite-size-programming/"
    title: "Bite Size Programming"
---

![what is git banner showing many lines and nodes intersecting](images/BSP-what-is-git.png) 
_Photo by William Bout on Unsplash_

What's this weird sounding thing called Git? Is it Git or just git? What does it do, who uses it, and is it actually useful? In this post, you'll learn all you need to know about git (yes, it's just _git_!).

## What is git?

[Git](https://git-scm.com/) is basically version control software.

While it may be convenient to try and think of it as a sort of [Dropbox](https://www.dropbox.com/?landing=dbv2) for programmers, that's not actually accurate.

Git was developed in 2005 by the same person who brought the Linux operating system to the world, Linus Torvalds. It doesn't need the internet to function, can track changes without needing multiple file names, and open source, which means it is completely and forever free to use.

Instead of Dropbox, you're better off thinking of it as a more sophisticated version of your homemade way of dealing with different versions of the same file:

- presentation.pptx
- presentation\_v2.pptx
- presentation\_caa\_021117.pptx
- presentation\_v3\_final.pptx
- presentation\_v3\_final\_FINAL.pptx

Yeah, I'm sure you know what I'm talking about now.

When we work with code as programmers, we are typically working on several files at the same time. All these files are usually contained in a single directory (folder), normally referred to as the project **repository**.

Now, what happens when you have, say, 3 programmers working off various files in the same repository at the same time?

## What does git do?

Git was designed to help programmers manage this problem. Here's a list of things it can do:

- Keep a log of every change (known as **commits**) ever made to every single file in a repository
- Revisit or revert to an old commit (in case you made a bad decision and wrote code that broke parts of your app)
- Create a new **branch** off the existing one as a safe space to make code changes without affecting the parent branch (useful when several programmers work together)
- Keep track of different versions of your project without having to duplicate the project directory multiple times (easier to handle than `xxx_final_FINAL.pptx`)

When you want git to start working for a particular project, you'll need to `init` the directory. From that moment onwards, the directory becomes a git repository. Below is the only command you need to run in Terminal to tell git to start tracking changes in a particular directory.

\# change directory to the one you want to be tracked by git
cd my\_project\_directory

# init the directory as a git repository
git init

I won't dive into the details of how to get started with git in this post. Let's continue asking the conceptual questions first!

## Who uses git?

Git is used by:

- The individual programmer
- A team of programmers
- Tech companies with many teams

I think it's not exaggerating to say that virtually every tech company in the world uses git. And because git is open source software, it can be installed on any computer anywhere around the world without cost. Git enables [programmers to work together remotely](/2016-08-23-programmers-remote-work/) without too much pain in large part due to git (the largest part being the internet, of course).

Since version management _is_ something that every organisation with a code base needs to grapple with, and git is free, unobtrusive, and for the most part simple, it has become the de facto solution in the industry.

## Is git actually useful?

Absolutely without a shred of doubt, yes. Git is tremendously useful!

I've used git on projects that I worked on personally at [General Assembly](/2017-03-12-general-assembly-singapore-review/). Even at the scale of a project written and maintained by a single person, git has helped me by giving me a clear picture of how my code has evolved.

Also, whenever I made any changes that broke my app (ie. crashed it and rendered it unusable), I'd refer to old commits and sometimes even revert to that old code. There's a command to do that, among many, many other commands to do almost every thing you imagine there might be a use for.

I've also been using git at my workplace at [Altitude Labs](http://altitudelabs.com/). In a team setting, it can really useful for:

- Separating the versions of the code base that are: (1) ready to be deployed to production (ie. live and user-facing), (2) ready for testing on a staging server, (3) for use by developers to add fresh code for new features, fixing bugs, and so on
- Managing and resolving conflicting changes made by two different programmers working on the same file
- Tracking which team member made what changes and when
- Putting up code for other team mates to review (although we do this not with git alone but with a service like [GitHub](https://github.com/))

I hope that gives you a good idea of what git is and how useful it is to a programmer in their everyday work. Stay tuned for future posts on how to get started with using it for your next project!

**Useful references:**

- Article on [Wikipedia](https://en.wikipedia.org/wiki/Git)
- My other posts on specific git commands and use cases ([squashing commits](/2017-09-23-squash-git-commits/), [stash](/2017-09-26-git-stash/), [replacing an entire branch](/2017-09-30-replace-git-branch-code/))
