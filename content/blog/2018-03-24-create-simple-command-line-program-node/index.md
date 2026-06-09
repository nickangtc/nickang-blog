---
title: "How to create simple Command Line Program with Node"
date_published: "2018-03-24"
tags: ["Tech"]
backlinks:
ai_summary: "The post explains how to build a simple command-line program in Node.js using process.argv, showing how Node passes terminal arguments into a JavaScript array and how a script can be run directly from the terminal. Using a Baconian cipher example, the author highlights practical tips such as skipping the first two argv entries, combining remaining arguments with splice and join, and mapping a string input to a function with an object. The main conclusion is that Node makes it straightforward to create useful command-line tools with basic JavaScript."
---

![bsp create command line program with node](images/bsp-create-command-line-program-with-node.png) 
_Photo by Blake Connally on Unsplash_

I have something to admit. The first time we were introduced to Node.js at programming bootcamp, I only had a [vague idea](/2016-09-19-nodejs-server-nightmare/) of what it did.

Now that I've attended WDI at GA once [as a student](/2017-03-12-general-assembly-singapore-review/) and twice [as a teaching assistant](/2017-03-19-7-things-i-learned-about-programming-bootcamps/), I understand Node.js [slightly](/2017-05-27-dont-know-everything/) better.

One interesting use case of Node.js that is not often talked about, but can be an incredibly useful part of your tool belt as a developer, is creating a command line program with `process.argv`.

## Where it all happens - process.argv

Process dot wha...?

Like `window` is to the browser, [`process`](https://nodejs.org/api/process.html) is a global object that is provided to us when we use Node.js. One of the keys in this object is `argv`, which stores every argument passed into the program (delimited by spaces in the command line) as items in an array.

Here's an example of a command line program that accepts some arguments and outputs them on the Terminal (not exactly useful in real life, but useful as an illustration of how it works).

**parrot.js**

```js
const inputArray = process.argv.splice(2);
const inputString = inputArray.join(' ');

console.log(inputString);
```

And on the command line:

```shell
node parrot.js hello parrot!

# prints "hello parrot!" in Terminal
```

The main thing to notice here is that `process.argv` is an array, and the first 2 arguments are not useful most of the time, so we skip them by splicing them away.

```js
// output of console.log(process.argv)
[ '/Users/nicholasang/.nvm/versions/node/v8.5.0/bin/node',
  '/Users/nicholasang/Code/parrot.js',
  'hello',
  'parrot!' ]

// extract arguments
const arguments = process.argv.splice(2);
```

Just by creating a JavaScript file that uses `process.argv` and using Node to run it, we have a command line program that runs JavaScript straight from Terminal! That is something.

## Example command line program - Baconian cipher

Here is an example of a command line program I wrote that takes in 2 or more arguments and outputs a string that is encoded according to the [Baconian cipher](https://en.wikipedia.org/wiki/Bacon%27s_cipher).

The goal of sharing this is to help provide you (and future me) some intuition of what a command line program written in JavaScript and run in Node looks like.

The command line signature looks like this:

```shell
node baconian-cipher.js # example usage
node baconian-cipher.js encode STRIKE NOW

# outputs 'baaba baabb baaab abaaa ababa aabaa  abbab abbba babba' 
```

The first part of the `baconian-cipher.js` command line program handles the command line interface input.

```js
/**
 * ===========================
 * Command line interface
 * ===========================
 */

// Extract command line arguments
const action = process.argv[2];
const input = process.argv.splice(3).join(' ');

// Map valid command line inputs to the correct functions
const actionMapper = {
  'encode': encode,
  // 'decode': decode
};

// Execute
const output = actionMapper[action](input);
console.log(output);
```

With that set up, the second part (there are only two parts to this simple program) is the implementation of the cipher logic.

```js
/**
 * ===========================
 * Implementation
 * ===========================
 */

/**
 * Baconian cipher
 * Encode any string consisting of A-Z charset
 */
function encode(string) {
  let encoded = '';

  for (let i = 0; i < string.length; i++) {
    const chr = string.charAt(i);

    // leave spaces as-is
    if (chr === ' ') {
      encoded += ' ';
      continue;
    }

    const encodedChr = encodeChr(chr);
    if (encodedChr !== undefined) encoded += ` ${encodedChr}`;
  }

  return encoded;
}

/**
 * Helper function that returns an encrypted character
 */
function encodeChr(chr) {
  const charSet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

  let index = charSet.indexOf(chr);
  let remainder = index;
  let encodedChr = '';

  while (remainder > 0) {
    const ab = remainder % 2 === 0 ? 'a' : 'b';
    encodedChr = ab + encodedChr;
    remainder = Math.floor(remainder / 2);
  }

  // pad front of string with 'a' to make up string length of 5
  if (encodedChr.length < 5) {
    const times = 5 - encodedChr.length;

    for (let i = 0; i < times; i++) {
      encodedChr = 'a' + encodedChr;
    }
  }

  // console.log(`encoding ${chr} as ${encodedChr}`);

  return encodedChr;
}
```

## Useful tips when using process.argv

If your command line program is designed to take in an argument that is the name of a function to be invoked when run, you'll need to map the string to the function name, since `process.argv` is an array of strings.

I'm unaware of any built-in way to invoke a function using a string directly other than to use an object to map it over.

```js
const action = process.argv[2];
const input = process.argv.splice(3).join(' ');

// Map valid command line inputs to the correct functions
const actionMapper = {
  'encode': encode
};

// Execute
const output = actionMapper[action](input);
```

Another tip is to use `splice()` and `join()` together to catch all remaining arguments for passing into your function. From the above Baconian cipher example:

```js
// Extract command line arguments
const action = process.argv[2];
const input = process.argv.splice(3).join(' ');

// printing `input` will produce:
// ['STRIKE', 'NOW']
```

## Summary

- With Node, we can create a command line program trivially
- Command line arguments are parsed by Node and added to the global `process` object as `process.argv`
- Console logs in the program will output directly to Terminal
- We can use `splice()` and `join()` to catch all input arguments
- We can map an input string to a corresponding function by using an object, eg. `mapper[functionString](inputs)`

Hope this has been helpful. Peace!
