---
title: "How to prevent jQuery from loading image in parseHTML"
date_published: "2017-12-14"
backlinks:
ai_summary: "The post explains a bug encountered while using jQuery's parseHTML in a drag-and-drop email builder, where parsing an img tag unexpectedly triggered image requests before the node was inserted into the document. The author found that this is expected jQuery behavior and that the fix is to parse the HTML in a new document context, which prevents unwanted resource loading and reduces unnecessary server traffic."
---

This post is inspired by a recent bug fix at work related to jQuery's `parseHTML()` method.

I noticed multiple redundant calls to our server endpoint each time a user saves an email template using the [drag-and-drop email builder](/2017-05-21-building-app-features-2017/) of [Metisa](https://askmetisa.com).

The bug, when traced to its end, was nothing like what I'd originally suspected. Because we use [Backbone.js](http://backbonejs.org/) for the front-end model layer (to make API calls) with [React.js](https://reactjs.org/) as the front-end view layer, I had initially thought it was Backbone making redundant API calls.

But with about an hour of digging, I found out that calling `$.parseHTML('<img src="path/to/image.png">')` was at fault. `parseHTML()` turns the string `'<img>'` into a DOM node, and that was immediately making GET requests for the image resource - even before appending the DOM node into the actual [document](https://developer.mozilla.org/en-US/docs/Web/API/Document)!

To be sure, this is not a bug in the jQuery library. Apparently it's expected behaviour.

Anyhow, I didn't need 3 calls for 3 placeholder images for a DOM node that would never be appended to the actual document. It was just unnecessary load on our server. So I needed a solution.

The solution I found to work was **creating a new document** and passing that as the **context** into `parseHTML()`. It works like this:

```js
// parseHTML using this external document context to prevent img src requests
var virtualDOM = document.implementation.createHTMLDocument('virtual');

var imageElement = $.parseHTML('<img src="image.png">', virtualDOM);
```

This solves the problem by telling jQuery explicitly that it should parse the string in a separate context from the current document context (ie. away from the window that the user is browsing). A quick look at the [jQuery documentation](https://api.jquery.com/jquery.parsehtml/) for the method shows that the second parameter is meant exactly for this:

```js
jQuery.parseHTML( data [, context ] [, keepScripts ] )
```

### Use case for parsing HTML outside of current document

I stumbled upon this obscure problem when I was developing a drag and drop email builder at work.

Each time a user in the email builder interface hits "Save," we use jQuery to generate a string that is representative of the HTML needed for rendering in an actual email (email HTML looks horrendous, by the way, with tables nested inside tables... full rant [here](/2017-11-10-email-html/)).

We use jQuery's `parseHTML` method as a nice way to validate that a string is valid HTML (and strip off the potential security vulnerabilities) before saving it to the backend.

So what other use cases might there be for calling `parseHTML` in a separate document context? I don't know exactly, but I imagine there are other situations where knowing this little trick might be helpful.

Let me know in the comments section if you're using this technique to circumvent the default loading of image resources (or any resources for the matter)! I'd love to learn other situations where this might be helpful.
