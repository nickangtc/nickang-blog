---
tags: ["Personal"]
title: "Dear email HTML, please get better"
date_published: "2017-11-10"
backlinks:
  - slug: "/2017-12-14-prevent-jquery-loading-image-parsehtml/"
    title: "How to prevent jQuery from loading image in parseHTML"
ai_summary: "The author argues that email HTML is unnecessarily difficult because major email clients render it differently, forcing developers to wrestle with brittle, hard-to-read code even for simple campaigns. Drawing on their experience building a drag-and-drop email editor, they conclude that email will remain important and should become easier and more standardized for developers to work with."
---

![i hate email html banner with a cat with mouth open wide looking unhappy](images/BSP-i-hate-email-html.png) 
_Photo by Erik-Jan Leusink on Unsplash_

I dislike email HTML. There, I openly said it! I really had to get that out of my system before I go crazy.

One of the crowning achievements in my short software development career so far is [having built](/2017-05-21-building-app-features-2017/) a drag and drop email editor for [Metisa](https://askmetisa.com) in [React](https://reactjs.org/).

It's not perfect but it means something to me because I consider it to be the first real feature I'd developed and deployed to a live product with actual users.

While I thoroughly enjoyed the process of figuring out how to build a WYSIWYG (what you see is what you get) email campaign builder, I disliked the part where I had to figure out how to make it output HTML that would be compatible with over 70 email clients on multiple devices with different operating systems (surprise). [Entire](https://litmus.com/) [businesses](https://www.emailonacid.com/) have been built on how hard it is to get an email to look right on all devices.

It's not that Microsoft, Apple, and Google are out to make the life of developers hard by creating different rendering engines. That's what I thought, but it's [not the case](https://litmus.com/help/email-clients/rendering-engines/).

Apparently they just have different interpretations about what is "safe" to render in the email client. Fears range from whether the HTML and CSS will affect their own email client's UI (user interface) to potential threats to their user's privacy via clever JavaScript.

So I guess they have their reasons.

But I really hope for the sake of the humanity of developers that the bosses of the email divisions in these three tech giants will agree on a standard way of pre-processing email HTML in the near future.

Here's how bad it looks. This snippet is just a _part_ of a (very good) [tutorial](https://webdesign.tutsplus.com/tutorials/creating-a-future-proof-responsive-email-without-media-queries--cms-23919) on how to write HTML for email. Just think about how difficult it is for any human being to understand this mess!

```html
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
  <!--[if !mso]><!-->
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  <!--<![endif]-->
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style type="text/css">
    body {
    margin: 0 !important;
    padding: 0;
    background-color: #ffffff;
    }
    table {
        border-spacing: 0;
        font-family: sans-serif;
        color: #333333;
    }
    td {
        padding: 0;
    }
    img {
        border: 0;
    }
    div[style*="margin: 16px 0"] { 
        margin:0 !important;
    }
    .wrapper {
        width: 100%;
        table-layout: fixed;
        -webkit-text-size-adjust: 100%;
        -ms-text-size-adjust: 100%;
    }
    .webkit {
        max-width: 600px;
        margin: 0 auto;
    }

    .outer {
        Margin: 0 auto;
        width: 95%;
        max-width: 600px;
    }
    .full-width-image img {
        width: 100%;
        max-width: 600px;
        height: auto;
    }
    .inner {
    padding: 10px;
    }
    p {
        Margin: 0;
    }
    a {
        color: #ee6a56;
        text-decoration: underline;
    }
    .h1 {
        font-size: 21px;
        font-weight: bold;
        Margin-bottom: 18px;
    }
    .h2 {
        font-size: 18px;
        font-weight: bold;
        Margin-bottom: 12px;
    }

    /* One column layout */
    .one-column .contents {
        text-align: left;
    }
    .one-column p {
        font-size: 14px;
        Margin-bottom: 10px;
    }
  </style>
  <title></title>
  <!--[if (gte mso 9)|(IE)]>
    <style type="text/css">
        table {border-collapse: collapse;}
    </style>
    <![endif]-->
</head>

<body>
  <center class="wrapper">
    <div class="webkit">
<!--[if (gte mso 9)|(IE)]>
<table width="600" align="center" cellpadding="0" cellspacing="0" border="0">
<tr>
<td>
<![endif]-->
      <table id="main-table" class="outer" align="center">
        <tr>
          <td class="full-width-image">
              <!-- This is where you start actually adding HTML, and they look like more of this -->
              [content goes here]
          </td>
        </tr>
        
        <tr>
          <td class="one-column">
            <table width="100%">
              <tr>
                <td class="inner contents">
                  <p class="h1">Lorem ipsum dolor sit amet</p>
                  Maecenas sed ante pellentesque, posuere leo id, eleifend dolor. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Praesent laoreet malesuada cursus. Maecenas scelerisque congue eros eu posuere. Praesent
                    in felis ut velit pretium lobortis rhoncus ut erat.
                </td>
              </tr>
            </table>
          </td>
        </tr>

      </table>
<!--[if (gte mso 9)|(IE)]>
</td>
</tr>
</table>
<![endif]-->
    </div>
  </center>
</body>

</html>
```

Email is not going anywhere, even in the age of Slack and WhatsApp and Messenger. Can we at least make it a pleasant technology to work with?
