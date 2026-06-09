---
title: "Why implement Stack in JavaScript when you have Array?"
date_published: "2017-12-24"
tags: ["Tech"]
backlinks:
  - slug: "/2017-12-25-implementing-queue-javascript/"
    title: "Implementing a Queue in JavaScript?"
ai_summary: "The post explains what a stack is, using the usual last-in, first-out model and the call stack as a real-world programming example, then asks whether JavaScript needs a separate Stack implementation. The author concludes that it usually does not, because Array already provides the needed push, pop, and length behavior to function as a stack."
---

This is the stupidly simple question I asked myself today as I was trying to familiarise myself with data structures. Is there ever a need to implement a stack data structure in JavaScript when the built-in [Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array) data structure already exists?

Based on my short [research](http://radar.oreilly.com/2014/03/stacks-in-javascript.html), the answer is no - there's probably no need to implement a separate Stack constructor function or class in JavaScript. Since `Array` already has the typical methods you'd need for a stack to work, like [`push()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/push) and [`pop()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/pop), you can just use an array to simulate a stack.

### Stack - a primer

I'll take this chance to clarify what a stack is, in case you don't already know.

In computer science, a **stack** is a data structure that mimics... well, a stack! Of 10 articles on the internet about stacks, 9 would ask you to imagine a **stack of plates** in a cafe. So, just imagine a bunch of plates stacked up, one on top of another. Or if you're hungry... a tall stack of pancakes.

![stack of pancakes metaphor for javascript stack data structure](images/ornella-binni-151618-e1514134636528-1024x849.jpg) 
_Thank you ORNELLA BINNI for this tasty photo (on Unsplash)_

The `push()` method is the act of adding something onto the top of a stack, like adding the 3rd plate on top of an existing stack of 2 plates.

The `pop()` method is the reverse of push - it is the act of taking the top-most plate.

So far in my programming career, the most meaningful application I've seen of a stack is the one that sits under the hood of any programming language - the **call stack**.

The call stack is a stack of function calls, executed based on a **last-in, first-out** (LIFO) rule, just like the plates in a cafe. When you call a function within another function, say in JavaScript, the JavaScript engine adds your second function call on top of the first one, ensuring that it is computed and returned to the caller before the original parent function finishes computing.

### Both implementations

For the sake of completeness, here are the 2 different ways to create and make use of a stack in JavaScript. The first is an abstract data type implementation using a class, and the second is based on the built-in Array object.

```js
/*
 * Implementation of Stack abstract data type using class.
 */
class Stack {
    constructor () {
        this._size = 0;
        this._storage = {};   
    }
}
 
Stack.prototype.push = function(data) {
    var size = ++this._size;
    this._storage[size] = data;
};
 
Stack.prototype.pop = function() {
    var size = this._size;
    var deletedData;
 
    if (size) {
        deletedData = this._storage[size];
 
        delete this._storage[size];
        this._size--;
    }
    return deletedData;
};

var stack = new Stack();
stack.push(1);
stack.push(2);
stack.push(['1', 2]);
stack.push('world');

console.log('stack')
console.log(stack.pop()); // 'world'
console.log(stack.pop()); // ['1', 2]
console.log(stack.pop()); // 2
console.log(stack.pop()); // 1

/*
 * Example of Stack using built-in Array.
 */
var arrayStack = [];
arrayStack.push(1);
arrayStack.push(2);
arrayStack.push(['1', 2]);
arrayStack.push('world');

console.log('\narrayStack');
console.log(arrayStack.pop()); // 'world'
console.log(arrayStack.pop()); // ['1', 2]
console.log(arrayStack.pop()); // 2
console.log(arrayStack.pop()); // 1
```
### Summary

So here's the summary:

- In computer science, a stack is a linear data structure that allows for data to come in and out based on a last-in, first-out (LIFO) manner
- In JavaScript specifically, it makes perfect sense to just make use of the built-in `Array` data structure instead of implementing your own `Stack` class
- `Array` already has all the methods a typical stack would need, like `push()`, `pop()`, and the property [`length`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/length)
