---
title: "How programmers work together from every part of the world"
date_published: "2016-08-23"
tags: ["Tech"]
backlinks:
  - slug: "/2017-10-27-start-using-the-command-line-part-2/"
    title: "How to start using the command line (part 2)"
  - slug: "/2017-11-03-what-is-git/"
    title: "What is Git?"
  - slug: "/2020-03-06-how-to-setup-access-to-github-from-terminal-with-2fa/"
    title: "How to setup access to GitHub from Terminal with 2FA"
ai_summary: "The post explains how programmers collaborate on the same codebase from different locations using Git and GitHub, contrasting this workflow with Dropbox-style file syncing. Its main point is that Git helps teams manage version control, prevent overwrites, and merge changes or flag conflicts for manual resolution, making remote and shared development much smoother. It also concludes that Git and GitHub Pages are useful tools for both team workflow and quick deployment, especially for projects that do not require custom server-side code."
---

The label 'digital nomad' exists because people whose job was to write programmes have become so fluid in the workplace that they can work from virtually anywhere in the world on the single, simple condition that there is an internet connection.

With Dropbox as ubiquitous as it is nowadays, it might be easy to overlook just how difficult it is for multiple 'devs' (short for developer) to work on a single project at the same time. But think about it: what happens when your friend works on the same Word document on Dropbox as you are right now, and saves her file?

Conflict, right? Dropbox's programme will detect the conflicts and automatically save one copy—your friend's or your copy, depending on circumstances—as a "conflicted copy", for you to sort out later and merge them manually.

Programmers, being programmers, use a much more sophisticated versioning protocol and software. It's called [Git](https://en.wikipedia.org/wiki/Git_(software)) (pronounced as 'geet')- and it is the utility that empowers programmers to work remotely with one another. It is also the single biggest enabler of the open source movement. Here, I'm going to go into the technicalities for a bit so if you're not interested in that kind of thing, feel free to drop out now!

Git is a version management software that handles the complex distributed workflow of distributed teams. While it's powerful, it is also quite difficult to grasp at the beginning. But as with any tool, once you understand how to use it, life becomes much less burdensome.

Every web project has many files, sorted into various folders like 'css', 'javascript', and 'images'. This isn't far from the projects most of us are already used to. What's different is the fact that in a file that contains code, like 'main.js', which contains JavaScript code, lines are linked to one another through what is written.

If someone makes changes from line 12-20, that change might have a ripple effect on every other line, and if this is not updated in the second programmer's computer in time, and the programmer starts to work on the now-outdated version of the project, things can get chaotic very quickly. Bugs will crawl throughout the programme…

That's one of the many situations where Git saves the day. Let's say I'm the first programmer mentioned above:

// write some extra code in the main.js file
git add .
git commit -m "Created resetButton function to reset game"
git push origin master

I would execute the above commands (each line being one) in my command line interface (Terminal for Mac) to synchronise my work to the cloud. Broken down, it goes something like this: - Save my code on my computer (cmd + s) - Put the changed files into a figurative cart (git add .) - Pass the cart through the cashier who will write in her logbook the message "Created resetButton function to reset game" (git commit -m …) - Strap the cart to a rocket and launch it into the clouds. (git push origin master)

Once this is done, the latest version of our team project is on Github. Let's say now I'm the second programmer…

git pull 
// do some work…
git add .
git commit -m "Fixed bugs in resetButton function."
git push origin master

The only the difference is that I now have to enter the command `git pull` to fetch the latest version before starting work.

What happens if programmers 1 and 2 are both working on the file at the same time, at 10:30pm on a Saturday night? This is when things can get tricky. Thankfully, Git makes the process much simpler.

Git is smart, so it will look compare the files that a programmer pushes into the repository (hosted on Github) with the ones originally in the repository, which are now outdated.

X
^original spot where both programmers began
X---->Y (programmer 1's work)
X====>Z (programmer's work)

If programmer 1 finishes work first, he will push his changes to the repository without obstacles (assuming only two of them are working on the project at this time). But when programmer 2 finishes his work 30 minutes after that, a problem arises - programmer 1's work, which did not exist in the file when programmer 2 started, is now the updated version on the repository on Github. So what happens when programmer 2 tries to send his finished work to Github?

This is the part that differentiates Dropbox from Git - instead of accepting both copies and renaming one as a 'conflicted copy', Git will see the discrepancy and _prevent_ programmer 2 from being able to `git push` to the repository! Instead, he's prompted to do a `git pull` to retrieve the latest version of the project. What happens now?

Programmer 2 now has two versions of the project. Without Git, he'd understandably be at a loss, confused over what to do. But Git knows a bit of magic - when a file has edits that are different from the one in your computer, it attempts to auto-merge them. To achieve this Git actually compares the contents of each file with one another. If the file that both programmers worked on has a total of 800 lines and programmer 1 worked on lines 1-200 and programmer 2 added lines 800-1000, Git would very likely understand that as work on two separate parts of the project and, without bothering the programmer in question, _add them both to a single, merged file automatically_. Isn't that wonderful?

Of course that leaves with us a few other situations that are a little less magical. If a conflict occurs (say, Git detects that you've both been working on the same lines of code), what needs to be done to restore order?

I'm afraid Git can't make decisions of which version of a block of code to retain and which to discard - that responsibility is too heavy to carry, I suppose. The programmer who receives the conflict (programmer 2 in our case, who finished his part of the work 30 minutes after his partner) must resolve the conflict manually.

That said, Git inserts markups into the file with both versions of a block of code—one that programmer 1 worked on and the other by programmer 2—that visually delineates the two versions for ease of comparison by the programmer who is doing the de-conflicting. So programmer 2 has to delete the lines of code that he knows are old, save, and upload that final copy to Github. Order will then be restored.

Is it overly complicated? At this point I'd say it isn't. Even though I think I haven't used half of its features, I've used some of the most frequently used ones and so far, it enhances my workflow as a solo programmer and on a small team that is physically close. When I eventually work on a remote assignment, I can see how Git and Github will make things smoother and make my life as a programmer slightly easier.

## Quick deployment via Github Pages

Finally, I also learned about a Github feature called 'Pages' today. I've been using Codepen to do what it does so far, which is to deploy a project to the web so that it is accessible to more than just, well, my local machine.

Pages seems to offer more convenience, since deployment is executed directly from the command line rather than a web interface, but I'll have to play around with it before giving my verdict. For now though, I like how cleanly it deploys my project online without the bells and whistles that Codepen presents by default (like the Editor view, which allows any visitor to see the source code that may taint the user experience).

[Github Pages](https://pages.github.com/) is only suitable for projects that don't need custom server-side code!
