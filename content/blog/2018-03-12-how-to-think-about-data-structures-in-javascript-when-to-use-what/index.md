---
title: "How to think about data structures in JavaScript (and when to use what)"
date_published: "2018-03-12"
tags: ["Tech"]
backlinks:
---

![how to decide what data structure to use in javascript nickang blog](images/how-to-decide-what-data-structure-to-use-in-javascript-nickang-blog-1024x556.jpg) 
_Photo by Beatriz Pérez Moya on Unsplash_

If you're just starting to learn to program, it can take a while to wrap your head around data structures like arrays and objects.

I'll walk through my thought process on how to structure data with a simple quiz game. Along the way, I hope you'll be able to gain an intuition for the Array (sometimes known as "list") and Object (sometimes known as "dictionary" or "hashmap") data structures that can be found in practically any programming language.

## A quiz game example

Let's imagine you're building a quiz game. In this quiz game, there is only one level, and in this level, there will be a series of 3 questions.

You have a design choice to make here. What data structure would you use to store a series of 3 questions?

## Choosing data structure for a Question

What would a self-contained question look like in a program?

First, let's ask ourselves, what are some information about a question that needs to be stored alongside it?

- The question itself (`question`)
- The question's answer (`answer`)
- The multiple-choice options (`option1`, `option2`, `option3`, `option4`)

So for each Question, we will need to store information about its actual question, its correct answer, and a series of pre-determined options for the user to choose from. Great.

Seen in this light, it becomes clear that we cannot capture these various components of a Question in a primitive (ie. a string, boolean, or number).

As we'll see with practice, whenever a thing has multiple components that need to be captured in a self-contained unit, we will have to use some kind of data _structure_. In JavaScript, we have 2 main built-in data structures available to us:

1. Array
2. Object

In this case, let's try and fit our Question into both so we can see which is a more suitable data structure.

```js
// ARRAY
var questionAsAnArray = [
  'the question text itself...',
  'the answer...',
  'the first option...',
  'the second option...',
  'the third option...',
  'the fourth option...'
]

// OBJECT
var questionAsAnObject = {
  question: '...',
  answer: '...',
  option1: '...',
  option2: '...',
  option3: '...',
  option4: '...',
}
```

// hypothetically, try and get the answer to this question
questionAsAnArray[1]       // with array
questionAsAnObject.answer  // with object

As you can probably tell, an Object is more suitable as a data structure to hold a self-contained unit of information (ie. a Question) because to access a particular value, you can just write `question.answer`.

If you used an array, your code is less understandable, because `question[1]` in itself does not have any meaning - it just so happens that you've chosen to place the answer's value in the 2nd position of the array.

Agree? Great! So that settles it for the data structure of a Question.

Now, recall that for our quiz, there will be 3 questions in a level - one question after another. How might we represent that as a data structure?

## Choosing a data structure for a Level

Conceptually, a level is, as mentioned, a series of questions. Since we've decided to settle on an Object to represent a Question, we now need only to decide how to contain 3 of these Question objects.

Again, since a Level must be a self-contained unit, we cannot use primitive values but instead, we need to use a data structure. Let's use both an Array and Object to try and create a self-contained Level.

```js
// ARRAY
var levelAsAnArray = [ {}, {}, {} ]

// OBJECT
var levelAsAnObject = {
  question1: {},
  question2: {},
  question3: {}
}

// hypothetically, try and access the second question
levelAsAnArray[1]
levelAsAnObject.question2
```

Here we don't have an obvious winner as before. Both an Array and an Object can be used to represent a Level seemingly equally well.

However, in this situation, I would choose to use an array because the sequence of questions 1-3 is baked into the array's positional slots themselves. The advantage is the consistency of accessing values (`level[1]`), which tremendously reduces the chances of misspelling the key (`level.quetion1`).

It's a choice, though. In this situation, neither data structure has an obvious advantage.

## Systematically accessing a Question's options

Let's recap. The data structures we've chosen to use will give us this to work with:

```js
var level1 = [
  {
    question: '...',
    answer: '...',
    option1: 'text for option 1'
    option2: 'text for option 2'
    option3: 'text for option 3'
    option4: 'text for option 4'
  },
  {
    // basically a repeated object format for 2nd question
  },
  {
    // basically a repeated object format for 3rd question
  }
]
```

Now let's try and systematically access options 1-4 in the first Question object inside the `level1` array - perhaps to try and create one button for each option to display on the DOM. It might look like this.

```js
for (var i = 0; i < level1.length; i++) {
  var question = level1[i]

  for (var j = 0; j < 4; j++) { // hardcoded nubmer 4!
    var key = `option${j}` // constructing the correct key string
    var option = question[key] // finally, we have the `option` itself
    // do something with `option`
  }
}
```

This code is problematic and bug-prone in a few ways.

Firstly, it will only work if questions will only ever have 4 options - no more, no less. This lack of dynamism makes the code less capable of being extended on.

```js
for (var j = 0; j < 4; j++) { // hardcoded nubmer 4!
var key = `opt${j}` // constructing the correct key string
```

Secondly, we still have to wrangle with constructing the correct key name to access the Question object in each iteration. While this isn't necessarily a big issue, it is potentially error-prone. (Just think what would happen if we decided to rename our Question's option keys from `option1` to `opt1` somewhere down the line, and forgot to update the for loop.)

```js
for (var j = 0; j < 4; j++) { // hardcoded nubmer 4!
var key = `opt${j}` // constructing the correct key string
```

And then there's the last bug-prone issue with this code - the `i` and `j` counters. Keeping track of what alphabet to use in a `for` loop can become a tiresome affair, and when our brain is not on completely on top of it, we may introduce bugs (eg. using `j` when you should use `i`.)

Having identified these problems with using different keys to store the various options and their values, the only logical step forward is to choose a different way to represent these options for easier and less bug-prone access. Which data structure might do the trick here?

## Systematically accessing a Question's options - Improved

If you guessed an array, you're spot on! Let's group options 1-4 into an array.

```js
var level1 = [
  {
    question: '...',
    answer: '...',
    options: [
      'first option',
      'second option',
      'third option',
      'fourth option',
    ]
  },
  // ... 2 more Question objects
];
```

This makes accessing each option much easier.

```js
for (var i = 0; i < level1; i++) {
  var question = level1[i]

  for (var j = 0; j < question.options.length; j++) {
    var option = question.options[j] // direct access to the option!
  }
}
```

Sweet.

Ok, finally, to prevent the mixing up of `i` and `j`, we can get rid of them entirely by using the `forEach` method that is built-in to Arrays.

```js
level1.forEach(function(question) {
  question.options.forEach(function(option) {
    // direct access to the option var!
  })
})
```

And that's it! We have successfully designed our **information architecture** to represent 1 level of a generic quiz game.

## Wrap up - Things learned

- There are 2 main data structures in JavaScript - Array and Object
- In most situations, there will be a clear advantage of using one data structure over another to represent or store data
- Array has built-in `forEach` method, which makes iterating a list of items simple and easy to read
- Designing the information architecture (ie. how to structure data) is an iterative process - as you see in the improvement made from changing from `option1`, `option2`, etc. to an `options` array
- Generally, if the sequence is important, use an Array
- Generally, if a thing has multiple components that are tied together into one self-contained unit, use an Object
