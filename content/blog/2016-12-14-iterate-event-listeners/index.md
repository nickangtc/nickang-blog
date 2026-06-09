---
title: "How to add event listeners without repeating yourself"
date_published: "2016-12-14"
tags: ["Tech"]
backlinks:
ai_summary: "The post explains a simple DRY technique for adding the same event listener to multiple elements by looping over an array with `.forEach`, using jQuery selectors as the example. The author's main point is that this approach reduces repetition when attaching handlers like `mousedown` to `#up`, `#down`, `#left`, and `#right`, and they invite readers to suggest an even cleaner solution."
---

One of the key principles of good programming is DRY - Don't Repeat Yourself!

Here's one way to reduce repetition with event listeners by using an array `.forEach` iterator that I've used a number of times now. If you haven't done this before, here you go! If you have an even cleaner and easy to understand solution, please share.

The code below uses jQuery selectors and methods to add 'mousedown' event listeners to 4 elements #up, #down, #left and #right.

```js
// NON-DRY WAY
// Add event listeners to mouse downs
$('#up').mousedown(function () {
  mouseStillDown = true
  moveBall('up')
})
$('#down').mousedown(function () {
  mouseStillDown = true
  moveBall('down')
})
$('#left').mousedown(function () {
  mouseStillDown = true
  moveBall('left')
})
$('#right').mousedown(function () {
  mouseStillDown = true
  moveBall('right')
})

// DRY WAY
// Add event listeners to mouse downs
var directions = ['up', 'down', 'left', 'right']

directions.forEach(function (direction) {
  $('#' + direction).mousedown(function () {
    mouseStillDown = true
    moveBall(direction)
  })
})
```

