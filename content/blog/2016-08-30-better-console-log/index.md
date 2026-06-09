---
title: "The better way to console log"
date_published: "2016-08-30"
date_modified: "2022-12-07"
tags: ["Tech"]
backlinks:
  - slug: "/2017-11-01-saying-the-obvious/"
    title: "Saying the obvious"
ai_summary: "The post explains how browser JavaScript debugging relies on `console.log()`, using a gameState variable as an example to show a better way to inspect values while code runs. The author argues that logging text and variables as separate arguments is superior to string concatenation because it preserves the variable’s true type and representation, especially for arrays and other non-string values. The conclusion is that this small change makes debugging faster and more accurate."
---

As JavaScript code is being executed by the browser, the value stored in variables change dynamically. When a user clicks on a button on a page, for example, a block of code (usually a function) gets executed. In a typical programme, executing a function will make use of the computer's ability to, well, compute, to do some computation and store the value in a variable.

With every click and even movement of the cursor (if the programmer coded that way), the value of variables are altered. Variables constantly change in value, so a problem arises when we want to know what a particular variable's value is at any point in time when the programme is running. When a programme doesn't work as intended, programmers exclaim in dismay that there is a bug. And then proceed to debug.

Let me just put it out there: debugging is a science, not art. It can easily \*feels like an art to a beginner programmer like me though.

The science of debugging involves methodically testing and isolating the problem. Here's a common list of things that have bugged me in my short programming career:

* ; - missing semicolon
* } - missing closing braces
* misspelling - (now a thing of the past with JS-linter-standard tool
* placing a line of code one line too high in an if/else statement
* placing an array declaration before its constituent variables are declared
* calling clearInterval(id) directly after setInterval(function(), delay)

Each time one of these show up I spend somewhere between 10 minutes to an hour trying to isolate the problem. Over time, the amount of time spent debugging will decrease over time as I start to recognise patterns. It will also shrink as I become more conversant with debugging tools.

The simplest debugging tool--and the one I use most often--is the trusty `console.log()`. The console is a developer-facing tool that prints out information as a programme executes. Putting in a line of `console.log(variableName)` doesn't take much time, but can potentially save a programmer hours of time. It prints to the console a 'log' of something, like a variable value.

Console logs will print to the developer console whatever you ask it to print in real time as the programme executes (anyone can launch dev tools in their browser - if you're using Chrome it's Cmd + Alt + J). It's a beautiful tool, graceful but formidable.

Though before today, I was using it wrong. There are two ways to write a console log:

```js
// method 1: not so good
console.log('gameState value: ' + gameState);

// method 2: much better
console.log('gameState value: ', gameState);
```

The first is the way I've been using console logs - with a `+` operator. Behind the scenes, JavaScript will render gameState into a string and join it with the string 'gameState value: ' before printing it to the console.

In the second approach, JavaScript skips the step of rendering gameState into a string, and prints gameState as-is. Essentially this tells the console tool to print out _two_ separate console logs in one line: one for the text 'gameState value: ' and another for the gameState variable.

So why is the second method superior? The answer becomes obvious when gameState is a variable of any type besides a string.

If gameState were to be an array, method 2 will yield this:

```
gameState value: , [0, 1, 2, 3]
```

And method 1 will print this instead:

```
gameState value: [object]
```

This subtle different translates to a lot less wasted time. If I wanted to understand what kind of variable gameState is, I could use method 2 (the better approach) and add another component to the log like this: `console.log('gameState value: ', gameState, 'typeof: ', typeof gameState);`, and all would be good.
