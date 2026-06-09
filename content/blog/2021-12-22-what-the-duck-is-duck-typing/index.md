---
title: "What the duck is Duck Typing?"
date_published: "2021-12-22"
excerpt: 
tags: ["Tech"]
fav: false
backlinks:
ai_summary: "The post explains duck typing as calling a method based on whether an object has that method, rather than checking its specific type first. Its main point is that this approach is useful when the focus is on what something can do, but it depends on programmers naming and implementing methods consistently, since misuse can cause failures."
---

Boiled down to a sentence: it's the choice of invoking a method based on whether something has the method, rather than based on whether something is of a certain type.

Use duck typing when you care more about what something can do instead of what something is. 

For example, if you have a variable of unknown type, and you wish to take that value and concatenate it into a string, you might call the .join() method that comes with that variable type (e.g. Array). Now, instead of checking that it's an array, you'd just check if the variable has the array method in its prototype chain (javascript lingo), and if it does, just call it.

I think duck typing relies a lot on trust. Trust that programmers name things well. If anything has been implemented with a method called .join(), then it better do something join-y, like combining an array into a single string. If it doesn't, then kaboom, something will break!

<video controls width="350">
    <source src="/images/what-is-duck-typing.mp4"
            type="video/mp4">
    Sorry, your browser doesn't support embedded videos.
</video>

![what is duck typing?](./images/what-is-duck-typing.png)