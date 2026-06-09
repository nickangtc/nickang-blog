---
title: "What is DRY (in programming)?"
date_published: "2017-12-11"
tags: ["Tech"]
backlinks:
ai_summary: "The post explains the DRY principle in programming, meaning Do not Repeat Yourself, and argues that it improves readability and maintainability by centralizing shared code such as common button styles or reusable functions. It also warns that DRY can be overdone through premature abstraction, which can waste time and make code harder to follow, concluding that code should only be abstracted when it is needed in at least two places right away."
---

![what is dry blog banner nickang showing weed growing on white wall](images/BSP-what-is-dry.png) 
_Photo by Ben Neale on Unsplash_

Ever heard someone tell you that your code is not "DRY"? What's the deal with that? Are they saying that your code can hold a lot of water...?

Sorry for the bad joke. DRY is an acronym, and it stands for **Do not Repeat Yourself**. As far as I can tell so far in my short career as a software engineer, this is one of the most revered principles in writing software.

In this post, we'll explore why it's important to keep your code DRY and in general, how you can go about doing it.

## Why DRY is a good thing

Before we examine the reasons for DRY, I think it'll be helpful to look at the non-reasons for keeping our code DRY. We don't keep our code DRY just to:

- Reduce the number of lines of code, just because less code means superior code (that is not true by any stretch)
- Save a few kilobytes in our HTTP request payloads (ie. what gets sent on wire to the user from our server)

The goal with the DRY principle has less to do with aesthetics or improved performance than it **has to do with code readability and ease of maintenance**. In web development, DRY applies not just to JavaScript but also HTML and CSS.

Here's an example with CSS. Let's say you're helping a friend to build the landing page of his new startup and on this page, he wants to show two "Sign Up Now!" buttons. According to his specification, the first button should be yellow with dark blue text (because it "visually pops") and the second button should be dark blue with white text.

One reasonable way you might think of implementing this is by adding classes to your HTML buttons like so (let's ignore the other attributes typically needed for a button to actually work, and focus on the idea of DRY):

Sign Up Now!
Sign Up Now!

Assuming you're not using a [CSS pre-processor](/2017-11-07-sass-mixins/) like Sass, you'd have to write plain CSS. Your code might end up looking something like this:

.btn-yellow {
  display: block;
  padding: 10px;
  margin: 0 auto;
  width: 200px;
  border: none;
  border-radius: 5px;
  font-weight: 800;
  background-color: yellow;
  color: darkblue;
}

.btn-blue {
  display: block;
  padding: 10px;
  margin: 0 auto;
  width: 200px;
  border: none;
  border-radius: 5px;
  font-weight: 800;
  background-color: dark blue;
  color: white;
}

If you're someone who already practices the principle of DRY in your own personal projects or at work, the above CSS snippet might have given you the chills. Notice how many lines of code are repeated in the styling of both `.btn-yellow` and `.btn-blue`?

Now let's pretend your pal meets you for coffee and tells you that he needs those buttons to _really_ pop. As in, they should take the full width of the page, have super rounded corners like the ones you'd find on [Medium.com](https://medium.com), and have a lot more white space between the button's borders and the text contained within.

Oh, and he wants to add a third button in the footer for good measure, and it should be a cool black button with white text this time.

You think to yourself, "this should be easy since I know CSS like the layout of the QWERTY keyboard." But when you get home and open your code editor, you realise just how many parts of the code you need to update:

- Update padding, width, border-radius in `.btn-yellow`
- Update padding, width, border-radius in `.btn-blue`
- Create new class `.btn-black` and copy the code from either `.btn-yellow` or `.btn-blue`...

See how this code is _repeating itself_ in many places? If you had just one class that implemented all the common properties of a button, you'd only have to update values once per property, instead of twice or three times or however many different kinds of buttons you might eventually have in your app!

This same issue will come up again and again as you develop a website or web app. Really, it's likely to come up when developing any software. That's why DRY has such a place in programmers' hearts! DRY code means:

- **Easier maintenance**. DRY code allows you to change code in one place to affect all other parts of your app that rely on that same code
- **More easily understood code (most of the time)**. In JavaScript, when you abstract a block of code into a function, you can _name_ the function so that whenever it is invoked in your code, it literally tells you what it's doing, like `getParamValueFromURL(url, param)`

DRY is great most of the time, but as with most things in life, we should do it in moderation.

## How DRY can be overdone

What happens when you set out to enforce DRY strictly in your code base all the time, disregarding practicality?

1. Wasted time from premature optimisation
2. Potentially poorer readability due to over-abstraction

Let's look at a quick example that demonstrates these two problems with overdoing DRY.

Imagine that you have an array of URL strings and you want to append a single parameter and value to each one of them. Because your app is built in React, you believe this would be a common use case down the line, so you decide to write a function that takes care of it once and for all. You wrote something like this:

```js
function appendParamValueToStrings (array, param, paramValue) {
  return array.map(function (string) {
    return \`string?${param}=${value}\`;
  });
}

// now you can use it like this
const strings = \['https://www.nickang.com/about/', 'https://www.nickang.com/now/'\];
appendParamValueToStrings(strings, 'referer', 'google');
```

Great! You take a step back and admire the beauty of an abstraction you've just created, and give yourself a pat on the back.

But that took a bit of time, because you had to think of the method name, which you fussed over for about 5 minutes. You also took 10 minutes finding what you think is the perfect place for such a method to belong (a `util.js` file kept in the same parent folder, of course).

When you go back to the code where you actually wanted to use this newfangled function, you realise (embarrassingly) that you don't remember its exact name, so you refer to `util.js` and copy the name. Then, you finally invoke it at wherever you originally intended to have this functionality.

All that when you could have just done the `.map()` at exactly that same spot without fuss, and without losing any code readability.

Now fast forward 2 months later when you revisit this code. You don't remember at all whether `appendParamValueToStrings()` had any special logic, or was it a plain `.map()` function with a nicer name. Of course, you also don't remember where you kept that function declaration.

Thankfully, you know how to do a global search. So you do it, find the function, and confirm that there's no special logic. You hop back to the original file to continue work. But now you've forgotten what you had actually wanted to do...

Hopefully, this real-life inspired story (yes, my life) managed to give you a flavour of the problems that come with being overzealous about DRY. Everything in moderation, my friend.

## A simple rule

When it comes to DRY, I have a simple rule: only abstract a code block into a reusable function if the function will be used in at least 2 different parts of your app right away. If it's "for the future," just leave abstraction (ie. DRY-keeping) exactly that - for the future!
