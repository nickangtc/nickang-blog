---
title: "Difference between let and var in JavaScript"
date_published: "2018-03-19"
tags: ["Tech"]
backlinks:
ai_summary: "The post explains the difference between JavaScript `let` and `var`, showing that `var` is function-scoped and can leak outside blocks, while `let` creates block-scoped variables that stay within curly braces. Its main point is that `let` and `const` are preferable for block-level scope control, though browser support may require transpiling ES6 for frontend use."
---

Here's a quick and dirty illustration that helps me visualise the difference between `let` (available only in ES6) and `var`.

```js
for (var i = 0; i < 5; i++) {
  console.log(i); // prints 0, 1, 2, 3, 4
}
console.log(i); // prints 5

for (let j = 0; j < 5; j++) {
  console.log(j); // prints 0, 1, 2, 3, 4
}
console.log(j); // ReferenceError: j is not defined
```

The value of `i` (initialised as `var`) is now available globally while `j` (initialised as `let`) is only available inside its own block and not outside.

Note that this is happening because constructs like `for` and `if` are not like functions. Functions have their own scope, while constructs like `for` and `if` do not by default have their own scope.

ES6 `let` and `const` can basically be used to **create block-scoped variables**. With them, every variable initialised inside a block of code surrounded by curly braces will only be accessible within (or deeper in) that block.

Should you use it? Definitely! Be careful though, ES6 is not fully supported on all browsers at the time of this writing (March 2018) and will require an additional setup with Webpack and Babel for transpiling ES6 to ES5 code. You can safely use ES6 on the server side with node.js.
