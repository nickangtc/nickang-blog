---
title: "Technical or not, the hardest part of blogging is still writing"
date_published: "2021-11-14"
excerpt: 
tags: ["Creativity"]
fav: false
backlinks:
ai_summary: "The post reflects on a blog built with Gatsby and argues that both technical and non-technical blogging setups create distractions, whether through maintenance and setup headaches or endless configuration and customization. The author’s main point is that the hardest part of blogging is not the platform but consistently writing and publishing, and if the tools start getting in the way, a different CMS may be worth considering."
---

This blog is run on Gatsby.js, a [decision](https://www.nickang.com/2020-05-30-why-i-migrated-my-blog-from-wordpress-to-gatsby/) I made 1.5 years ago and haven't looked back on. Well, until recently. I'm not planning to change the CMS behind this blog any time soon (who has time for that after only less than 2 years?), but I do want to pause and reflect on this idea of a Technical vs Non-Technical blogger.

## Good things about running one's blog from scratch

Gatsby is a server-side JavaScript library that lets Technical Bloggers build websites that are incredibly fast. Just browse around my blog a little and you'll see what I mean. (Gatsby is not built for blogs only; developers use it to build big websites, too.)

How it works is that it pre-generates every single page on a website and stores them as static files on a server, so that when you click on a link to a particular page, all that needs to happen on the server is to serve that page. This, as opposed to the server having to look up dynamic data from a database (e.g. the post content), render that data into an HTML template, *then* server that page. That's why Gatsby and other frameworks like it are called Static Site Generators (SSGs).

Gatsby also provides nice touches like image lazy-loading (i.e. visitors are shown a lower resolution photo, which loads and displays before the full image is fetched from the server and replaces the lo-res one), pre-fetching of resources that users might click, and more.

For me, a big draw was also the fact that it's built on the super popular React web framework and the query language GraphQL in mind. I thought this was great, because I'm much more familiar with JavaScript than other programming languages (like, say, PHP, which WordPress uses) and can therefore make rapid changes to my blog whenever needed.

But there's a downside that I'm beginning to see more clearly: maintenance.

## Technical? Do what you want but maintain it

Two weeks ago I swapped laptops with my wife. She had, at that point, a faster machine than I did. She agreed that I can have hers and she'll take mine since I work on technical side projects that could benefit from higher specs, whereas she uses the computer mostly for email and using the web.

If you're not a programmer, allow me to explain how painful it still is in 2021 for a programmer to set up a new laptop. You need to install this, and that, and this, and that, and make sure that this dependency for that has been fulfilled, like Xcode and Homebrew and Bash profiles. Lots of manual "refer to previous computer" setup to be done.

The most painful part is when something goes wrong and I need to spend time figuring it out. Like I did with setting up my "new" laptop to run my blog locally (so that I can check how new posts or styling tweaks look visually via localhost).

This is also painful because it distracts me from what I flipped open my laptop to do, which is to write. 

Sure, if I'm all doing is trying to publish a new post, I can technically ignore it and just deploy a new post and let Netlify (my hosting provider) generate the static pages for the site and everything *should* still work. But I can't help but think about it. It's like a floater in my eye - as a Technical User, I find it hard to ignore the fact that something in the build workflow of my site is broken on my computer.

Is there a CMS that sits somewhere in middle, providing a technical blogger with the freedom to make rapid changes without ever being bogged down by the need to maintain and troubleshoot it? I'm not sure, but my gut says no. It's like uncle Ben says to Peter Parker, "with great power comes great responsibility."

## Non-Technical? We take care of everything so you can focus on writing!

For non-technical bloggers, the problem exists not so much in having to update packages and ensure their site can be previewed on localhost. Nevertheless, as a non-technical blogger myself pre-2015, I know there are other issues with using CMSes like WordPress. 

It is configurations galore, detracting people from writing. People spend inordinate amounts of time dressing up their sites, thinking of snappy phrases for their pop-up email banners and so on, instead of writing. I get that. I was like that.

That's the issue I take with corporate slogans that go, "We take care of X so that you can spend your time where you actually want." Bullshit. Many times, a product that takes care of X also introduces A, B, C configuration options that provide the user with too many shiny buttons.

The point I'm trying to make is this: it doesn't matter if you're technical or non-technical as a blogger. Problems will arise in both camps. As long as you focus on writing and publishing, which is really the hardest part that requires the most discipline and concentration, you have succeeded for the day as a blogger.

For me this time, I spent time to fix the issue. If it comes up again too soon, I'll go to the market and pick a new CMS, so that I don't have to waste time maintaining the innards of the blog instead of writing.