---
title: "Find the smallest number in an array with JavaScript"
date_published: "2016-11-24"
tags: ["Tech"]
backlinks:
ai_summary: "The post explains how to find the smallest number in a JavaScript array, comparing a straightforward loop-based approach with a shorter, more elegant solution using Math.min.apply(null, numbers). The author's main point is that combining built-in methods can produce cleaner code, though apply has a practical array-length limit, and ES6 spread syntax makes the same task even simpler."
---

Let's say you're given an array of numbers, and you're required to find the smallest number in the array. How would you do it?

Though I didn't find this challenge difficult to complete, my solution looked like a Toyota Prius next to the Tesla I saw on Codewars today.

Here's what I would have done normally:

```js
function removeSmallest(numbers) {
  var indexOfSmallest = 0
  var smallestNumber = numbers[0]

  for (var i = 0; i < numbers.length; i++) {
    if (numbers[i] < smallestNumber) {
      smallestNumber = numbers[i]
      indexOfSmallest = i
    }
  }
  numbers.splice(indexOfSmallest, 1)
  return numbers
}

removeSmallest([56,23,10,60,99,105,20931,24,24]) 
// [56,23,60,99,105,20931,24,24]
```

And this is what I saw on [Codewars](https://www.codewars.com/kata/563cf89eb4747c5fb100001b/solutions/javascript) today:

```js
function removeSmallest(numbers) {
  var min = Math.min.apply(null,numbers);
  numbers.splice(numbers.indexOf(min),1);
  return numbers;
}
```

Edge cases like an empty array and arrays with elements other than Number type aside (which neither solutions bother themselves with), this second solution is superior in almost every way to mine.

Isn't that a nice looking line of code, `Math.min.apply(null, numbers)`?

It's pretty to look at and very easy to understand. `Math.min(a, b, c[, ...])` normally returns the lowest value among all the arguments passed into it, but the problem is that it doesn't accept arrays. That's where `.apply` comes into play.

`function.apply(thisArg, [argsArray])` accepts two arguments. `thisArg` is for explicitly stating which object `this` should refer to. `[argsArray]` is whatever arguments you'd like to pass into the original function in the format of an array.

The clever part is combining the power of two in-built JavaScript methods (both available in ECMAScript 5) to carry out this operation. The only caveat is the length of the array cannot exceed 65536, as in \[1,2,3,...,65535,65536\]. It's likely an arbitrarily set figure, but with good reason. Stack overflow?

To find the max number, just do `Math.max.apply`!

More on the `apply` method at [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/apply).

UPDATE: With ECMAScript 2015 (ES6), it's become slightly easier to achieve the same thing. The big difference is how clean it looks in ES6 using the 'spread' (`...`) operator:

```js
const someNumbers = [-1, 5, 11, 3]
Math.max([...someNumbers])
```
