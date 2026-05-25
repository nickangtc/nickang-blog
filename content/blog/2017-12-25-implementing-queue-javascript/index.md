---
title: "Implementing a Queue in JavaScript?"
date_published: "2017-12-25"
tags: ["Tech"]
backlinks:
  - slug: "/2021-10-10-specialist-or-generalist/"
    title: "Specialist or Generalist?"
---

Yesterday I [asked myself](/2017-12-24-implement-stack-javascript-array/) whether it was necessary to implement a **stack** abstract data type in JavaScript. The answer turned out to be "no," because you can just use the built-in `Array` data type to simulate a stack without obvious performance penalties.

Naturally, I started asking myself, what about a queue? Should we be implementing a _queue_ in JavaScript?

### Queue vs stack

First, a primer on stacks and queues.

From what I've gathered so far, the stack and the queue are sister data structures. They are both linear data structures and differ only in one small but extremely important way - the stack enforces a LIFO rule, while things are FIFO in queue land.

**LIFO (stack)**: Last in, first out. Like a stack of pancakes. **FIFO (queue)**: First in, first out. Like a queue at the cinema.

There are many uses of a queue data structure. It can be used to model an actual ticketing system in software, for example.

### Write your own Queue class, or just use an Array?

![a line of people in a queue](images/paul-dufour-86196-1024x695.jpg) 
_Photo by Paul Dufour on Unsplash_

Just as it is with stacks, queues can actually be simulated using the native `Array` in JavaScript. Below are the typical methods of a queue and their equivalent in `Array`:

- **`enqueue(data)`**. Add an item to the back of the queue. Built-in [`push()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/push) provides that functionality.
- **`dequeue()`**. Remove and return the first item in the queue. Built-in [`shift()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/shift) provides that functionality.
- **`size()`**. Return the current size of the queue. A [simple combination](https://stackoverflow.com/questions/5223/length-of-a-javascript-object) of built-in methods can provide that functionality.
- **`peek()`**. Return the first item in the queue without dequeuing. `array[0]` provides that functionality.

So, it's possible to create and use a queue in JavaScript just by using the native Array - but you probably already know that. To decide if we should create our own implementation, we should ask ourselves:

> "What inefficiencies or bugs are there when using an array as a queue that might warrant our own implementation?"

### Re-indexing - the array's kryptonite

This would be the summary section if there wasn't an issue with using an Array as a queue in JavaScript!

Turns out, there's one big issue with using an array as a queue - the need to re-index every subsequent element in the array with each `shift()` operation (to dequeue an item):

1. const queue = \['item1', 'item2', 'item3', 'item4', 'item5'\]
2. `queue.shift()` is invoked
3. 'item1' is removed from `queue` and is used somewhere in the program
4. internally, JavaScript engine will re-index 'item2' to 'item5' from indices 1 - 4 to 0 - 3

Apparently, when the queue is relatively large, this internal re-indexing operation (which happens whenever a dequeue op is called) can take a lot of time. So if you're expecting your queue to potentially get very long (upwards of 100k items), you should consider writing your own implementation of a Queue. (Or you can steal mine below.)

### Implementing a Queue in JavaScript

Here is my implementation of a `Queue` class with [JSDoc](http://usejsdoc.org/) style docstrings to aid your reading.

```js
/**
 * Implementation of Queue.
 */
class Queue {
    /**
     * Create a queue.
     */
    constructor () {
        this.store = {};
        this.front = 0;
        this.end = 0;
    }
}

/**
 * Add item to end of queue.
 * @param {*} The data to store in the position.
 */
Queue.prototype.enqueue = function (data) {
    this.store[this.end] = data;
    this.end++;
};

/**
 * Remove item from queue and return its data.
 * @return {*} The data stored in item.
 */
Queue.prototype.dequeue = function () {
    if (this.front === this.end) return null;

    const data = this.store[this.front];
    delete this.store[this.front];
    this.front++;
    return data;
};

/**
 * Return current size of queue.
 * @return {number} Size of queue.
 */
Queue.prototype.size = function () {
    return this.end - this.front;
};

/**
 * Return item at front of queue without dequeueing.
 * @return {*} The data stored in item.
 */
Queue.prototype.peek = function () {
    if (this.size() === 0) return null;
    return this.store[this.front];
};
```

I've added some lines of code that pits this implementation's runtime performance against that of a native array queue that can be found in this [Gist](https://gist.github.com/nickangtc/79e49eb723a3a91ddd62f38563361add). My implementation is a few milliseconds slower for smaller queues (less than 100k items) but is significantly faster for queues above that size.

Here's a quick breakdown of the runtime performance of the 2 implementations (the test involved enqueuing a number of items and dequeueing an item at every multiple of 10):

|Queue size|Array|Queue|
|--- |--- |--- |
|10,000|1 ms|4 ms|
|60,000|60 ms|7 ms|
|100,000|415 ms|8 ms|
|200,000|2,134 ms|13 ms|

### Summary

Summary in a hurry:

- Using a native array in JavaScript as a queue is ok if you know your queue will never grow beyond 100,000 in size
- If your queue may potentially exceed 100,000 items, you should consider implementing your own Queue that uses an Object (which has constant time deletion during dequeue) as a store instead of an Array
- The main reason for slower performance of array vs custom Queue implementation is the re-indexing operation that happens (behind the scenes) during every dequeue

