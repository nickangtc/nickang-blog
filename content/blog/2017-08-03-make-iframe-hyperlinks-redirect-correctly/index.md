---
title: "Make iframe hyperlinks redirect correctly in main document"
date_published: "2017-08-03"
tags: ["Tech"]
backlinks:
ai_summary: "The post explains how links inside an embedded iframe can unexpectedly navigate only within the iframe instead of redirecting the main page, which is a problem for widgets or other embedded content. It says the fix is to add a `<base>` element in the iframe’s `<head>` so all URL redirects open in the parent document, and concludes that this is a simple, elegant solution to an otherwise awkward web issue."
---

At work recently we had to figure a way to redirect a user to another webpage when she clicks on a URL. This is obviously a trivial task for 99 percent of cases - just use `<a href="http://destination-url.com">Click</a>`. But within an `<iframe>`, URL redirects can act strangely.

Let's say you're building a HTML/CSS/JS recommendation widget that is supposed to be embedded on people's e-commerce websites. When a user clicks on an image in the widget, you want to redirect her to the product detail page. But because your widget is actually embedded within an iframe (for ease of installation - UX!), when the user clicks on an image, she gets redirected to the product page _within_ the iframe, while the main window remains on the same page. That is unintended behaviour and it needs to be fixed.

Thankfully, the fix in this situation is very, very simple. Apparently there is a HTML element called [`<base>`](https://developer.mozilla.org/en/docs/Web/HTML/Element/base) that handles this.

```html
<base target="_parent">
```

By adding this line of code in the `<head>` of your iframe, all URL redirects will happen on the parent document instead of in the iframe document. Something like this:

```html
<!doctype html>
<html>
<head>
  <link href="https://fonts.googleapis.com/css?family=Lato:300,700" rel="stylesheet">

  <!-- Force iframe URL clicks to open in main document -->
  <base target="_parent">

</head>
<!-- etc -->
</html>
```

I wish all web-related problems had beautiful, pre-emptive solutions like `<base>`!
