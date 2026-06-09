---
title: "How to clone class instance in JavaScript"
date_published: "2018-01-17"
tags: ["Tech"]
backlinks:
ai_summary: "The post explains why cloning is often needed in JavaScript functions to avoid accidentally mutating objects or arrays passed by reference, and distinguishes shallow copying from deep copying. It then shows that cloning a custom class instance requires copying both its instance properties and its prototype chain so that its methods are preserved. The main conclusion is that using the right cloning approach helps prevent subtle side effects, especially with nested data and class-based objects."
---

One very common scenario for wanting to clone a class instance is inside a function.

### Why there's a need to clone objects/arrays inside functions

Because non-primitive data structures are passed by reference in JavaScript, we will inadvertently mutate the original object or array passed into a function as an argument. Here's a quick illustration of this behaviour:

```js
var userJohn = {
  firstName: 'john',
  lastName: 'campbell',
  dob: '01/01/1987',
  accountNumber: '12345678'
};

function maskSensitiveInfo (user) {
  var sensitiveFields = ['dob', 'accountNumber'];

  sensitiveFields.forEach(function (field) {
    user[field] = 'hidden';
  });

  return user;
}

var userJohnMasked = maskSensitiveInfo(userJohn);
console.log(userJohnMasked === userJohn);  // we expect this to be false, but it is true!
```

In the above, `userJohn` was mutated inside the `maskSensitiveInfo()` function. Specifically, the line `user[field] = 'hidden';` mutates `userJohn` _directly_ instead of mutating a copy of it.

This behaviour is expected for non-primitive data types; that is, any variables that hold a data type other than the 6 primitives (boolean, number, string, symbol, null, and undefined).

I think it's also the reason why many JavaScript code style guides I've come across so far recommend not mutating arguments within functions. [Airbnb's](http://airbnb.io/javascript/#functions--mutate-params) style guide is an example.

### How to shallow copy an object

Instead, they recommend creating a copy of any object/array inside functions - basically as a preventive measure to eliminate the potential for unwanted (and hard to trace) side effects caused by mutating something outside of the function from within.

```js
function maskSensitiveInfo (user) {
  var userClone = Object.assign({}, user);
  var sensitiveFields = ['dob', 'accountNumber'];

  sensitiveFields.forEach(function (field) {
    userClone[field] = 'hidden';
  });

  return userClone;
}

var userJohnMasked = maskSensitiveInfo(userJohn);
console.log(userJohnMasked === userJohn);  // correctly false!
```

In the above snippet, the `maskSensitiveInfo()` function now creates a copy of the `user` object being passed in and uses it for intermediate steps that mutate it, before returning it. That's why `userJohnMasked` is no longer the same object as `userJohn` (ie. `userJohnMasked === userJohn` evaluates to false).

### Caveat for shallow copy: only one level deep

What we've just seen is _shallow copying_. It's so-called "shallow" because `Object.assign()` is only going to copy over the first-level values and assign that to a new object. If, for example, `userJohn` has a key called "account" and its value is another object, that object is _not_ copied but is once again only _referenced_.

This snippet illustrates the point:

```js
var userJohn = {
  firstName: 'john',
  lastName: 'campbell',
  dob: '01/01/1987',
  accountNumber: '12345678',
  account: {
    number: '12345678',
    type: 'savings'
  }
};

function maskSensitiveInfo (user) {
  var userClone = Object.assign({}, user);
  var sensitiveFields = ['dob', 'accountNumber'];

  sensitiveFields.forEach(function (field) {
    userClone[field] = 'hidden';
  });

  userClone.account.number = 'hidden';
  userClone.account.type = 'hidden';

  return userClone;
}

var userJohnMasked = maskSensitiveInfo(userJohn);
console.log(userJohnMasked.account.number);  // 'hidden'
console.log(userJohn.account.number);  // we expect to be '12345678' but it is 'hidden'
```

The original object, `userJohn`, is accidentally mutated by the line `userClone.account.number = 'hidden'`. This is one of those horrible bugs that can be really hard to pinpoint.

To do a deep copy (vis-a-vis shallow copy), it's best to use an external library like jQuery or Lodash:

```js
// jQuery method
var newObject = jQuery.extend(true, {}, oldObject);

// lodash method 
var deep = _.cloneDeep(objects);
```

More details on deep cloning can be found in [this SO thread](https://stackoverflow.com/questions/122102/what-is-the-most-efficient-way-to-deep-clone-an-object-in-javascript).

So that's how you shallow/deep clone objects created from using the object literal syntax `var x = {};` or `var x = Object.create();`, meaning they are literally constructed directly from the Object class in JavaScript.

What about objects that are **instances of a custom implemented class**? As we'll see, because we will most likely have methods implemented on custom classes, the methods above will not suffice - the instance methods will not be copied over!

### Cloning a class instance including its methods

I recently found out something that wasn't obvious to me - apparently, **methods defined within a class definition are automatically added to the prototype chain** of the instance object.

So, to copy over the methods from one class instance to another, we will need to copy the prototype chain _on top of_ copying the instance variables.

Here's the magical series of built-in methods that can be used to create a copy of an instance of a custom-implemented class:

```js
function copyInstance (original) {
  var copied = Object.assign(
    Object.create(
      Object.getPrototypeOf(original)
    ),
    original
  );
  return copied;
}
```

That's quite horrid syntax on first and second glance, but on third glance...

Here's how it works:

1. `Object.create()` creates a new object and `Object.getPrototypeOf()` gets the prototype chain of the `original` instance and adds them to the newly created object
2. `Object.assign()` does as we've seen earlier, which is to (shallow) copy the instance variables over to the newly created object

This comes in really handy for custom-implemented classes like `Stack` or `Queue` or `LinkedList`.

However, sometimes you will need to add a few extra lines to the `copyInstance()` method, depending on whether your class has any instance variables that need to be copied as well. In my case, I had to clone an array that is stored as an instance variable called `this.stack` within the Stack implementation:

```js
this.stack = [3, 2, 5, 4, 1];

// clone stack using .slice()
this.clonedStack = this.stack.slice(0);
```

Here's the use case I recently had with a Stack (it uses ES6, so in case you're unfamiliar, just treat all `const` and `let` as `var`s):

```js
// modified copyInstance method that works specifically for my Stack class
function copyInstanceStack (original) {
  var copied = Object.assign(
    Object.create(
      Object.getPrototypeOf(original)
    ),
    original
  );

  // CREATE SHALLOW COPY OF INSTANCE VARIABLE
  copied.stack = copied.stack.slice(0);

  return copied;
}

// custom implemented Stack data structure
class Stack {
  constructor () {
    // THIS NEEDS TO COPIED
    this.stack = [];
  }

  // ALL THESE METHODS NEED TO BE COPIED AS WELL
  push (data) {
    const newNode = new Node(data);
    const index = this.stack.length;

    if (this.stack.length === 0) newNode.minIndex = 0;
    else {
      const prevMinIndex = this.stack[index - 1].minIndex;
      const val = this.stack[prevMinIndex].data;
      newNode.minIndex = data < val ? index : prevMinIndex;
    }
    this.stack.push(newNode);
  }

  pop () {
    return this.stack.pop();
  }

  min () {
    if (this.stack.length === 0) return null;
    const minIndex = this.peek().minIndex;
    return this.stack[minIndex].data;
  }

  peek () {
    if (this.stack.length === 0) return null;
    return this.stack[this.stack.length - 1];
  }

  isEmpty () {
    if (this.stack.length === 0) return true;
    return false;
  }
}

// standalone function that sorts a stack instance
function sortStack (stack) {
  // MAKE COPY TO PREVENT DIRECT MUTATION OF ORIGINAL STACK  INSTANCE
  let unsorted = copyInstanceStack(stack);
  let sorted = new Stack();

  // ignore the details, including for completeness...
  while (!unsorted.isEmpty()) {
    let current = unsorted.pop().data;
    let placed = false;

    while (!placed) {
      if (sorted.isEmpty() || sorted.peek().data >= current) {
        sorted.push(current);
        placed = true;
      } else {
        unsorted.push(sorted.pop().data);
      }
    }
  }
  return sorted;
}

let s1 = new Stack();
s1.push(4);
s1.push(2);
s1.push(3);
s1.push(6);
s1.push(5);
s1.push(1);

let s2 = sortStack(s1);
console.log(s2);  // sorted stack order
console.log(s1);  // original stack order (ie. not mutated, yay!)
```

### Summary

I didn't intend for this post to get so long, but I wanted to be complete with my examples because I know it's important contextual information for wrapping your head around the idea of cloning.

Here's a summary to make it easier:

- Non-primitive data types like Objects and Arrays are passed by reference into functions, unlike for primitives which are passed by value
- Passed by reference implies that if a function mutates or reassigns an argument that is an object or array, the original variable _outside_ of the function also gets mutated/reassigned - this can become a nasty, hard to uncover bug
- For the above reasons, Airbnb, among other companies, eschew direct mutation or reassignment of arguments within functions
- The solution is to create a clone before working with the cloned variable inside the function to prevent side effects
- There are two types of cloning: shallow and deep
- Shallow only clones one layer deep, which means if any key-value pair in an object contains another object, or if an object is stored as an item in an array, those continue to be _references_ instead of cloned values
- Deep cloning accounts for nested objects by effectively creating copies recursively until the deepest layer, ensuring there are no connected references to the original object
- To clone an instance of a custom-implemented class, including its custom-implemented methods within the class, you need to copy over the prototype chain (because methods defined inside a class are added to the prototype chain) as well as the instance variables

I'm mainly writing this to ensure I have a note on this esoteric but essential part of JavaScript, but I certainly hope it was helpful to you in some way too!
