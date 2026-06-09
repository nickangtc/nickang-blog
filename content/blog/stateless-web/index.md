---
title: "Explained: The web is 'stateless'"
date_published: "2024-12-13"
date_updated: "2024-12-13"
excerpt: "It's independent requests all the way down."
tags: ["Tech"]
fav: false
backlinks:
ai_summary: "The post explains that when a browser loads a website, it makes a discrete HTTP request to a server, receives a response, and then renders the returned file locally; the page can usually still be viewed offline until a new action requires another request. Its main point is that the web is stateless: browser and server do not keep track of each other across requests, so each interaction is independent and the server does not remember prior ones."
---

When I load a website, what really happens?

Does my browser open a window that a server somewhere provides over the internet, keeping some kind of tethered connection for my entire session on that site?

Or does it load something -- a file or data -- from a server and simply render it (whatever *that* meant) on my browser window?

Let's try and answer this by loading a random site, say, [nickang.com/blog](https://nickang.com/blog) (my blog). Then turn off the Wi-Fi on the computer. What happens? Does the page break, or can you still scroll through?

The answer is, it should still work. Until you click on a link. At that point, the page breaks.

Browsing an already-loaded page doesn't require the internet. Trying to take an action -- e.g. loading a specific blog post -- does.

Okay, now that we've done that bit of experimentation, let's fill our knowledge gap with one of the most fundamental truths about how websites and more sophisticated web applications work: **the web is stateless**.

What does stateless mean?

Let's recap what we did and dissect what happened then: we clicked on nickang.com/blog, which loaded a new site.

When you clicked on that link, this is exactly what happened under the hood (with some simplifications inconsequential for this post):

1. The browser understood that an event occured (click event)
2. The browser understood that the click event was on a link, and that link was pointing to another site
3. The browser therefore makes a **HTTP request** to that site (GET https://nickang.com/blog/) - this REQUIRES INTERNET CONNECTION in your computer
4. Now, the browser waits for a response
5. The server receives a HTTP request from a random browser (yours)
6. The server sees the request is asking it to GET the page behind the `/blog` route
7. The server returns the file for that path in a **HTTP response** - this REQUIRES INTERNET CONNECTION in the server
8. The browser, waiting on a response, receives the response
9. The browser sees there's a file attached in the response
10. The browser parses the file and renders that file on the browser viewport

From the perspective of the browser, it didn't matter who was going to respond to its HTTP request, as long as there is a response.

From the perspective of the server, it didn't matter who was sending the HTTP request, as long as it is allowed to receive the underlying resource (in this case, it was, as it was asking for a page that is meant to be a public blog, so it is allowed).

We say the web is stateless because the browser and the server are not keeping track of each other in any way. They don't need to: they simply transacted once (providing the file that become the webpage) and moved on with their electronic lives.

Think of it as very transactional humans who don't interact face-to-face but speak over a tube from a lower floor (browser) to a mysterious upper floor (server).

The human below shouts "yo, I want the blog page, please!".

The human above checks and sees that the blog page is meant to be given out for free, so he fetches a copy of it and slides it down the tube. She doesn't even say bye and the transaction is done.

She doesn't care what you do with the file afterwards. Did you go on to vandalise it? Did you make additional copies of it? Did you even read it? The server doesn't care. It doesn't need or want to know.

This is statelessness: the server doesn't try to remember previous interactions. The second request is independent of the first, the third independent of the first and second, etc.

