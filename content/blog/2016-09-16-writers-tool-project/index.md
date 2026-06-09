---
tags: ["Personal"]
title: "A writer's tool for project two"
date_published: "2016-09-16"
backlinks:
ai_summary: "The post describes a web development school project in which the author plans to build a writer’s dashboard that helps collect external articles and URLs for blog posts. The main point is that the tool would save time and improve credibility by making research, link gathering, and saving favorites easier, while also reducing the distraction of web browsing. The author concludes that the project is realistic for a week’s work and focuses on a practical first version rather than more ambitious automation features."
---

![a young lady in a beautiful office](images/writers-tool-1024x683.jpeg)

Week 6 of web development school is coming up! That means we're going to build stuff - yay!

I'm particularly excited about this coming week's project. We'll have from tomorrow (Friday) to next Thursday to start and complete to an extent a full-stack web application. The point is to create a web-based application that demonstrates our understanding of front-end web technologies (HTML, CSS, JavaScript) and back-end technologies and frameworks (Node.js + Express, Postgres SQL), and how to hook them up nicely to do useful stuff for us/other people.

For someone who hasn't built a full-stack application before, this is a tremendous opportunity for me to make mistakes, learn, and flex my brainpower. It's going to be great.

And for the first time in a long time, I've actually decided beforehand on the project I'll put myself to work on. It isn't something I've always dreamt of making since I was kid, but it is something I care about creating for myself to use, and so to me, that counts as a good project to commit some time to working on. Definitely beats working on a project _just_ as an exercise that's for sure.

## The problem to try to solve

For the second of four total projects, I'll be creating a writer's dashboard. Let me first explain the problem…

As a person who loves to write (I don't really know why), I write almost every day and publish selected articles on my blog. Now, as a person who is neither a self-made billionaire or a celebrity, I have to earn my reader's trust by showing that each article is fact-checked if they are meant to be. If I write about [Facebook's bullying antics](https://news.ycombinator.com/item?id=12108158) toward the open source community for example, I'd have to include links to credible news sources or nobody would believe me. Also, for Google's bots to find my blog and rank it reasonably high in search results, every article should contain a few links to relevant external resources and internal blog posts.

Here comes the problem: I love writing but I hate finding URLs to embed into my articles! The process of writing is fun and transcendental, but finding and appending URLs is banal and at times even soul-numbing. Sometimes I just don't feel like doing it and I just hit publish. No matter how factual-sounding my article is, though, I know new readers will not trust me.

Another problem in the post-creative phase of writing I've found is that when I research online for facts, I tend to drift deep into the open ocean of the internet. I wouldn't even call it a distraction - it's a total attention blackhole. Google returns too many entertaining results…

## What I'll be working on for project week

So I've come up with a potential solution. I think it will work for me, and I'll only be focusing on catering it to my needs for this now, to keep things manageable.

Here's the idea. Create a dashboard that, based on a single search input, pulls articles from around the web and displays them in so-called cards. A little bit like what Oscar Otero did with his [jQuery cheatsheet](https://oscarotero.com/jquery/), but with a different presentation.

Each card will contain a title and a text snippet of the article, and clicking on it will launch an in-page window with the full, original article (eg. from Wikipedia) from which I can browse and extract information. These cards are laid out across a single browser page to provide a quick overview of the articles relevant to my blog post.

For added convenience, each card also comes with a short text input field that I can use to copy the original article's URL and paste into my blog post. Hitting a 'favourite' button also saves the link to my account for later, periodic use.

There are also a number of other features that I'd love to have but won't be able to create in just a week. One of the most useful would be an algorithm that automatically appends internal blog links to my newest, yet to be published blog post on my behalf. That'd be fantastic. Alas, I am only a novice programmer and I shall be realistic.

With that, on this humid Thursday evening, I'm laying my mind to rest about the project. Tomorrow is project brief day. For now, I have other things (like how to integrate user authentication to my server) to think about…

(image: [Bench Accounting](https://unsplash.com/@benchaccounting))
