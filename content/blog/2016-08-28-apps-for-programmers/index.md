---
tags: ["Personal"]
title: "Alfred and other apps for the programmer"
date_published: "2016-08-28"
backlinks:
ai_summary: "The post discusses a programmer's recent adoption of productivity tools such as Atom, Emmet, Dash, Slack, ColorZilla, and Alfred, with examples of how they help with coding, documentation, and workflow. The author's main point is that these tools save cognitive effort and time by automating repetitive tasks and providing quick access to useful functions, even offline. The conclusion is a positive endorsement of the free tools available to developers, along with the idea of eventually contributing back through open source work."
---

![relaxing in a pool by snow mountains](images/chilling-1024x683.jpeg) 
_Tools conserve cognitive resources for the actual tasks! Image: [Robson Morgan](https://unsplash.com/@robsonhmorgan)_

I now recall that about a year ago, I was introduced to the productivity app called Alfred. I tried it but couldn't understand why anyone found it useful, and swiftly proceeded to uninstall it within the week.

I learned about the Alfred app listening to Tim Ferriss interview a man named Noah Kagan on his podcast. Noah has had an illustrious career spanning the early days at Facebook and Mint.com, and he eventually founded his own tech company, SumoMe. He is now one of hundreds of interviewees on the Tim Ferriss Show podcast, one of my favourite podcasts of all time.

But I'm not going to talk about podcasts here; I want to talk about the tremendous quality and quantity of tools that are available out there on the world wide web at our disposal.

Let's do a stock take right now. Since I began attending classes at General Assembly two weeks ago, I've downloaded a number of tools that purport to make my life better (as a programmer):

- [Atom](https://atom.io/) code editor
- Atom external packages: JSLinter, [Emmet](http://emmet.io/), highlight-selected, standard-formatter
- [Dash](https://kapeli.com/dash) offline documentation dashboard
- [Slack](https://slack.com/) app for team/community chats
- [ColorZilla](https://chrome.google.com/webstore/detail/colorzilla/bhlhnicpbhignbdhedgjhgdocnmhomnp?hl=en) extension for Chrome
- [Alfred](https://www.alfredapp.com/) app

In two weeks I've downloaded these and more, and they've been quite helpful in specific ways.

[Atom](http://www.atom.io) code editor has integration with my command line and Git, so whenever there are "uncommitted" changes in my code files I can see them at a glance.

The various external packages are even more powerful. JSLinter constantly reads my JavaScript file for missing semicolons, undefined variables that are meant to be defined, functions defined that haven't been used anywhere in the code, and more. [Emmet](http://emmet.io/) is the most beautiful implementation of an open source tool I've come across so far, replacing this:

<div id="left-pane" class="col-sm-4 img-fit">
 <span class="pixel" id="pix-l-1"></span>
 <span class="pixel" id="pix-l-2"></span>
 <span class="pixel" id="pix-l-3"></span>
 <span class="pixel" id="pix-l-4"></span>
 <span class="pixel" id="pix-l-5"></span>
 <span class="pixel" id="pix-l-6"></span>
 <span class="pixel" id="pix-l-7"></span>
 <span class="pixel" id="pix-l-8"></span>
 <span class="pixel" id="pix-l-9"></span>
 <span class="pixel" id="pix-l-10"></span>
</div>

With this:

div#left-pane.col-sm-4.img-fit>span.pixel#pix-l-$\*10

// chunk 1
div$left-pane.col-sm-4.img-fit 

// chunk 2
>span.pixel#pix-l-$\*10

With Emmet, 12 lines of HTML can be generated with one sentence. A simple tab will expand the sentence into all that HTML. The time savings is enormous.

Another tool I'm already starting to fall for is Dash. It allows me to continue to code with reference to official documentation while I'm disconnected from the internet. Talk about liberating.

A guy—I think is called Jensen—who works at ThoughtWorks introduced it to us two days ago, and I'd already found a use for it yesterday. At 7am, alone at a Subway store in Marina Square that wasn't even open, I was working on a project and needed to refer to the Emmet documentation—to generate 100 `span`s with unique IDs—but had no access to the internet. Dash came in extremely handy.

Today I'm going to bring [Alfred](http://www.alfredapp.com) for a test drive. If I don't feel compelled to uninstall it by the end of the day, I think it'll join my rapidly growing repertoire of tools. It's amazing that all these are available for free. I couldn't be happier. Maybe one day I'll pay my debt to the community by working on an open source tool…
