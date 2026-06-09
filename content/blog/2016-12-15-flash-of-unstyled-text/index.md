---
title: "The flash of unstyled text"
date_published: "2016-12-15"
tags: ["Tech", "Personal"]
backlinks:
ai_summary: "The post discusses the Flash of Unstyled Text (FOUT) in web development, using Lettering.js as an example of how JavaScript-driven text styling can cause visible restyling if scripts run after the page loads. The author's main point is that developers must balance faster initial loading against avoiding distracting flashes, and that script placement should be chosen based on the needs of each project. The conclusion is that something as simple as moving script tags can meaningfully affect user perception of speed, even if the implementation tradeoff is small."
---

When I entered the web development industry-complex (is it okay to refer to it as such?) in August this year, the first thing I noticed was how fast it moved. This year EJS and HAML is hot, next year it's testing frameworks Mocha and Chai, and then Angular2 and React. In our industry, there has been a hot new thing every year.

Recently in a bid to give a well thought out response to a student in class, the instructional team did some googling to see if some esoteric library existed to allow developers to recreate poster-esque typography on webpages. And of course we found one, called [Lettering.js](http://letteringjs.com/). It uses jQuery to transform every single letter in a sentence into a `<span>` tag, and style it accordingly. Kerning (horizontal spacing in between letters) is easy with margins and relative positioning, and alternating colours is also possible with the `:nth-child` selector. I thought it is really smart but a bit of an overkill.

But what caught my attention most was a paragraph that espoused the values of the creators of [Lettering.js](https://github.com/davatron5000/Lettering.js):

> "Web performance patterns advise that you put Javascripts at the bottom of your page before your `</body>` tag. There is an unfortunate side effect where you may experience a FOUT (Flash of Unstyled Text) when you're manipulating your text after the DOM has loaded. Unfortunately, we found the best solution to avoid/minimize the FOUT caused by this plugin is to put your scripts (jQuery, Lettering.js) in the document . On the one hand, your page will load slower. On the other hand, a flash/restyling makes your site feel slow. Users might ultimately feel the site is faster if they don't see the FOUT."

FOUT. What an acronym. To FOUT or not to FOUT is one of many design decisions that developers have to make every day. While the implementation is very simple in this case--moving the `<script>` tag between the top (at the HTML head) position or the bottom (as the last few lines within the HTML body)--what/how we decide ultimately depends on the project.

The most interesting part about having read this is that I never scrutinised the difference between placing the `<script>` tags on top or below. I just placed it in the head all the team and used a DOMContentLoaded/jQuery.ready inside my scripts to make sure that the HTML page is fully rendered before JavaScript tries to manipulate them on the DOM.

How fascinating...
