---
title: "How to write tests during live coding interviews"
date_published: "2023-05-25"
date_updated: "2023-05-25"
excerpt:
tags: ["Tech", "Interviewing"]
fav: false
backlinks:
ai_summary: "The post explains how to write tests during live coding interviews, especially when an interviewer explicitly wants testing to be part of the assessment. The author argues that instead of using a full test framework, candidates should keep things simple by using console.assert with a structured array of test cases containing inputs, expected outputs, and descriptions. The main conclusion is that this approach makes tests easier for both the candidate and interviewer to read, debug, and trust during the interview."
---

This post is for anyone who is wondering what might be a good approach to writing tests during a software engineering live coding interview.

Companies assess different things during the live coding stage of an interview process. Some will want you to have an efficient algorithm, others will want you to focus on writing maintainable code. Yet others will want you to ensure that you test your algorithm comprehensively.

Good thing is, companies usually tell you upfront what they will be looking out for so you can prepare.

If you're preparing for an interview where testing is explicitly called out as something they would like to assess, read on.

## Context: what you shouldn't do

I recently interviewed at a large tech company and **did an absolute nightmare of a job when it came to writing tests properly**. This company expected my algorithm to work and be tested properly. Algorithm efficiency was explicitly not a thing they cared about in that round.

This company allowed me to use my own IDE to code, so I still have the code I wrote. Here it is, with info that would give away the company name removed:

```js
// implementation
function redact(inputStr) {
  const tokens = inputStr.split(" ");

  return tokens
    .map((token) => {
      // implementation details...
    })
    .join(" ");
}

// testing
console.log(redact("a 898928394891288918293 gets redacted"));
console.log(redact("pretty 555231 no redaction"));
console.log(redact("number -08909591034122412321 no redact"));
```

I wrote that code, and I ran `node redact.js` to see the outputs.

You might be wondering to yourself, geez, I see the problem. It's that everything was in a single file, right?! But no, that was fine because I explicitly asked the interviewer if they wanted me to split into separate files and do imports (and they said no). So that's not a problem, and in fact, it's an advantage because you save time from switching tabs.

The problem was the fact that every single test case was isolated and hard to read and reason about. Which are the positive cases? Which are the negative ones? What is the human-readable description of what each test is testing?

What happened throughout the rest of the interview as I wrote more and more individual `console.log` statements was that the interviewer and I both got really confused about which test cases were passing, which ones were not, and whether there were wrong expectations.

If I were interviewing me, I would fail myself just for this lack of structure.

## No test suites

Before I share with you what I found to eventually work better, I'd like to put a constrain on what is allowed.

The company I interviewed at allowed me to use my own IDE. I was technically allowed to do `npm install jest` and do the whole shebang of having a test runner and separate test files.

I could, but I chose not to. And I'd recommend you don't, either.

The reason is this: keep things simple. Less fiddling is better in an interviewing environment. Last thing you want is to be looking up the interface of Jest or something else.

Now, let's hear it. What's a good approach to writing tests while writing algorithms in a live coding interview?

## A good approach: Using the built-in console.assert

In a sentence, the good approach I'd advocate is this:

> Use console.assert, and write an array of inputs to loop through.

```js
const testCases = [
  {
    input: "a 898928394891288918293 gets redacted",
    expect: "a xxxxxxxxxxxxxxxxx8293 gets redacted",
    description: "redacts when token length is >=10 and <= 16",
  },
  {
    input: "pretty 555231 no redaction",
    expect: "pretty 555231 no redaction",
    description: "does not redact when token length is < 10",
  },
  {
    input: "number -08909591034122412321123 no redact",
    expect: "number -08909591034122412321123 no redact",
    description: "does not redact when token is negative",
  },
  // below is a failure case to prove console.assert is working
  {
    input: "number -08909591034122412321123 no redact",
    expect: "foobar",
    description: "This is an EXPECTED failure! :)",
  },
];
```

This is super easy to reason about for everyone involved:

- It's an array of `testCases`, which means each item is a test case
- Each test case has an input, an expected output, and a human-readable description

And to use it, you write a little bit of code ONCE, involving a `forEach` loop and some string interpolation:

```js
testCases.forEach((testCase) => {
  // 🗣 call your algorithm
  const output = redact(testCase.input);

  // 🧪 test it by asserting the output against expectations
  console.assert(
    _.isEqual(output, testCase.expect),
    `Test case "${testCase.description}" failed. Input was ${testCase.input}, expected ${testCase.expect}, got ${output} instead.`
  );
});

```

Or if you're working with inputs that are Object or Array types, you can modify it to use `JSON.stringify` for the output like so:

```js
const _ = require('lodash');

testCases.forEach((testCase) => {
  const output = redact(testCase.input);

  console.assert(
    // Comparing 2 arrays or objects is tricky,
    // so best not to implement it yourself.
    // So we use lodash.
    _.isEqual(output, testCase.expect),
    `Test case "${testCase.description}" failed. Input was ${
      testCase.input
    }, expected ${JSON.stringify(testCase.expect)}, got ${JSON.stringify(
      output
    )} instead.`
  );
});
```

Putting it all together, you'll have a single file that would look something like this:

```js
const _ = require('lodash');

// implementation
function redact(inputStr) {
  const tokens = inputStr.split(" ");

  return tokens
    .map((token) => {
      // implementation details...
    })
    .join(" ");
}

// testing
const testCases = [
  {
    input: "a 898928394891288918293 gets redacted",
    expect: "a xxxxxxxxxxxxxxxxx8293 gets redacted",
    description: "redacts when token length is >=10 and <= 16",
  },
  {
    input: "pretty 555231 no redaction",
    expect: "pretty 555231 no redaction",
    description: "does not redact when token length is < 10",
  },
  {
    input: "number -08909591034122412321123 no redact",
    expect: "number -08909591034122412321123 no redact",
    description: "does not redact when token is negative",
  },
  // below is a failure case to prove console.assert is working
  {
    input: "number -08909591034122412321123 no redact",
    expect: "foobar",
    description: "This is an EXPECTED failure! :)",
  },
];

testCases.forEach((testCase) => {
  const output = redact(testCase.input);

  console.assert(
    _.isEqual(output, testCase.expect),
    `Test case "${testCase.description}" failed. Input was ${
      testCase.input
    }, expected ${JSON.stringify(testCase.expect)}, got ${JSON.stringify(
      output
    )} instead.`
  );
});
```

So whenever you run the node script, and your test cases are all passing, you'll simply see this output in your command line program:

```
Assertion failed: This is an EXPECTED failure! :)
```

And real failures will be super descriptive:

```
Assertion failed: Test case "redacts when token length is >=10 and <= 16" failed. Input was "a 898928394891288918293 gets redacted", expected "a xxxxxxxxxxxxxxxxx8293 gets redacted", got "undefined" instead.
```

You can add `\n` linebreaks in the `console.assert` message if you want to make things even easier to read. The point is, you know exactly how to do such modifications, since console.assert is all you're using. Simple.

I'm definitely going to write tests this way in future interviews that emphasise testing. Hope this helps you in landing a job you want!
