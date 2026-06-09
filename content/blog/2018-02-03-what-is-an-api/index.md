---
title: "What is an API?"
date_published: "2018-02-03"
tags: ["Tech"]
backlinks:
  - slug: "/2018-11-07-json-diff-tool-find-differences-between-json-files/"
    title: "A tool to find differences between JSON files"
  - slug: "/2018-11-16-code-readability-or-efficiency/"
    title: "Code readability or efficiency?"
  - slug: "/2019-12-27-technical-skills-are-not-just-for-software-developers/"
    title: "Technical skills are not just for software developers"
ai_summary: "The post explains that API is used in two main ways: most commonly as server endpoints that let clients create, read, update, or delete data, and more broadly as an interface that lets one piece of software use another, such as browser Web APIs. Its main point is that the term is broader than many people assume and is best understood as a software interface rather than only a data-access tool. It concludes that browser APIs like Drag and Drop are examples of the second meaning, helping developers build richer web applications."
---

![what is an api blog post banner nickang](images/igor-ovsyannykov-165874-1024x683.jpg)
_Image by Igor Ovsyannykov_

I first came across the term "API" before I knew how to code. It was thrown around by the developers during a hackathon I attended in 2016, and I sort of understood what they were talking about by inference. Back then, my understanding of an API was that it's a conduit that lets programmers gain access to some data.

Then, as I attend web development bootcamp, I learned that API was an acronym for "Application Programming Interface" and that it was a conduit to not just gaining data from some server, it was also used to send, update, and delete data.

Not long after I started programming professionally, I uncovered a new dimension to APIs. It turns out that "API" is really a catch-all term for a number of things. So... what is an API?

## API endpoint

When API is used with the word "endpoint", what is being referred to as the API is normally a set of dedicated URLs that a server will listen to, waiting for HTTP requests to come through and hit them. This is the first group of things that API refers to:

> Openings on a server (in the form of URLs) that will do something on the server when hit by an HTTP request.

"Something" here is typically 1 of 4 actions:

- Create
- Read
- Update
- Delete

"Read" is the most common action that APIs are designed to carry out. For example, The New York Times has an API that provides other applications titles and excerpts of some of their articles.

Their API endpoint is the URL `https://api.nytimes.com/svc/search/v2/articlesearch.json` and when an HTTP request is sent to that endpoint, which exists on a server operated by The New York Times, that server retrieves data from their database according to the specified request and sends it back to the requestor.

This is the first, more intuitive kind of API that non-technical folks can easily relate to.

As you can already guess, there's another set of things that are referred to as APIs and they are not exactly used for creating, reading, updating, or deleting data per se. So what's the deal there?

## Drag and Drop API

Let's take a look at a concrete example - the [Drag and Drop API](https://developer.mozilla.org/en-US/docs/Web/API/HTML_Drag_and_Drop_API) of browsers.

This API is one of a big group of browser-related APIs called "Web APIs". Think I'm making this up? I don't blame you, but you can verify it for yourself by going to the source of truth for all things web related - [MDN](https://developer.mozilla.org/en-US/docs/Web/API). Some other examples of Web APIs are the Event API, Storage API, and Window API.

The term API when used in this context obviously mismatches the meaning of API as in "API endpoint", so what gives?

Let's revisit the definition that I inferred earlier on:

> "A conduit that lets programmers gain access to some data."

I was only half correct when I made up that definition for my mind to imbue meaning to what was being thrown around during that hackathon.

Specifically, while an API is certainly a conduit to something, as implied by the last letter "I" that stands for "interface", it is not just used for working with data.

## A better definition of API

Here is a better definition from Wikipedia:

> "\[A\] set of functions and procedures that allow the creation of applications which access the features or data of an operating system, application, or other services."

In other words, an API is really just **a way for a piece of software to access another piece of software**.

As Petr Gazarov succinctly [explains](https://medium.freecodecamp.org/what-is-an-api-in-english-please-b880a3214a82):

> "Let's say you're using a third-party library in your code. Once incorporated into your code, a library becomes part of your overall app. Being a distinct piece of software, the library would likely have an API which allows it to interact with the rest of your code."

That's so much clearer. Thanks, Petr!

Now, armed with this new understanding, let's take a closer look at the browser's Drag and Drop API.

The browser renders things like text and images on the browser window (ie. "web page"), in the process of which it generates an internal representation of that page in what's known as the Document Object Model or DOM for short. The DOM is a bunch of nodes, each node being an HTML element that usually shows up on the web page.

I'm bringing up this technicality of the DOM because the DOM is a "distinct piece of software" in the browser (which is the overarching software, though it's an irrelevant detail here). And when we write JavaScript code for the browser, our code becomes a new distinct piece of software that is loaded into the browser.

- Distinct piece of software A: the DOM and its nodes
- Distinct piece of software B: our JavaScript code

Here comes the revelation. In order for our JavaScript code to be able to modify the behaviour of certain elements on the web page and control what happens when, say, a user tries to drag an image on the page, the browser must provide developers with an API.

Without such an API, a developer wouldn't be able to write code to modify the dragging and dropping behaviour of any element because there would be no handles, so to speak, to hold on to and twist and turn.

## Sum up

So here's the summary:

- API is used by developers to refer to 2 main distinct groups of things.
- The first and more common use case of the term is between a client (ie. browser) and a server. In this situation, we typically talk about "API endpoints" that HTTP requests can hit and trigger some action on the server.
- Example of an API endpoint is The New York Times' [Article Search API](https://developer.nytimes.com/article_search_v2.json#/Documentation/GET/articlesearch.json), which provides third-party applications with access to the titles and excerpts of their articles.
- The second, less intuitive use case is between two distinct pieces of software. Here, API is used to refer to the interface from which a piece of software accesses another piece of software.
- Example of the latter kind of API is the Drag and Drop API. It allows a developer's JavaScript code (which is a piece of software) to gain access to the Drag and Drop functionality (another piece of software) of browsers.
- Drag and Drop API is one of more than a hundred Web APIs created by various browser makers (like Firefox and Chrome), all of which provide developers with the tools to create rich web application experiences!
