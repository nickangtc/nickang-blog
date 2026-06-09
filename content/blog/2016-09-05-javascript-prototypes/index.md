---
title: "Reducing redundancy through JavaScript prototypes"
date_published: "2016-09-05"
tags: ["Tech"]
backlinks:
  - slug: "/2017-11-18-linked-list-implementation-part-2/"
    title: "How to implement a Linked List in JavaScript"
ai_summary: "The post explains JavaScript prototypes using constructor functions for objects like Car and Lorry, showing how methods such as sell can be shared through Car.prototype instead of duplicated inside every instance. The author's main point is that prototypes reduce redundant code and save memory by keeping one shared function definition rather than recreating the same methods for each object. The conclusion is that this was a major optimization insight for the author, though they note they still want to explore prototypes further."
---

![picture of a small tree blossoming with flowers](images/20160905-IMG_20160905_124834-1024x768.jpg) 
_Chinatown_

Ever wondered why Mozilla Developer Network's documentation often include a `.prototype`, like Array.prototype.push()? I did, for a long time, and today the veil was lifted for me. It's a great concept.

So, what's the difference between `Array.push('Foo')` and `Array.prototype.push('Foo')`? Functionally speaking, they are exactly the same. Both will add the string 'Foo' to the end of Array. No difference there.

The difference becomes apparent only when you consider what happens in the back-end (inside the browser). First, let's take a step back and think about a common scenario for using the prototype: when using constructor functions.

## In conjunction with Constructors

In order to create objects that share exactly the same properties in JavaScript, we use constructors. They look like this:

```js
function Car (make, model, year, color, seats) {
  this.make = make;
  this.model = model;
  this.year = year;
  this.color = color;
  this.seats = seats;

  this.previousOwners = [];
  this.owner = 'manufacturer';
  this.running = false;

  this.sell = function (newOwner) {
    this.previousOwners.push(this.owner);
    this.owner = newOwner;
}
```

This is a Car constructor function. Every time we write `var nicksCar = Car('toyota', 'altis', 2010, 'silver', 5)`, we create an instance of the Car object with the specified property values: it's a Silver 2010 Toyota Altis that seats 5. By default, it also inherits the following: running status is false, owner is manufacturer, and there are no previous owners.

Each Car object that is created using this constructor function also comes with the method called `.sell`, which is a function defined inside the constructor and can be called on 'nicksCar' with `nicksCar.sell('mei')`.

Imagine now we also want to define a `paint`, `start`, `off`, `driveTo`, and `park` method for Car objects. We do that by writing 6 more functions inside the constructor function, which will make them accessible accordingly through `nicksCar.methodName()`.

Additionally, now imagine if we needed a Lorry constructor and it needs the same methods that Car has in every Lorry object it creates - what can we do?

Using this method, we'll have to copy and paste the code from the Car constructor and paste it into Lorry. We're repeating - that's never good in programming, so something is amiss.

Something fishy aside, what's worse is that by re-defining these functions, we're creating many instances of essentially the same block of code. It's the equivalent of issuing every factory worker a manual and expecting them each to carry their own during work every day when they could easily be sharing 10 or 20 to one manual - saving resources like paper and adenosine triphosphate (ATP). On top of making your code longer, running multiple instances of the same thing hogs computing resources. Herein lies the difference between declaring the function twice (in both object constructors) and using a prototype.

Prototypes help solve this problem (and probably more that I'm unaware of at this point) by preventing _repeated instantiation_ of the same block of code. Sticking with the example of a Car constructor, the prototype syntax looks like this:

```js
Car.prototype.sell = function (newOwner) {
  this.previousOwners.push(this.owner);
  this.owner = newOwner;
};
```

This is defined _outside_ of the constructor function, which makes it globally accessible. When we create a new instance of the Car object called nicksCar, we now create an object with one less method _hard-wired_ into it.

Instead, to use the `.sell()` method on nicksCar, JavaScript will refer to the single Car.prototype.sell function. If this were an actual car database with hundreds of thousands of car entries, all of them will refer _outward_ to the same prototype function rather than _inward_ to the function that is defined in itself. In that way, we've cut 99% of the redundancy in the back-end of having to re-create many, many instances of the same function. There's only one instance with the prototype.

That's the biggest thing I learned today. I'm sure my understanding (and thus, my explanation) is only scratching the surface, but it was a revelation in optimisation (to me). I believe it's also possible to wrap a whole bunch of prototypical functions into a single prototypical function so that the code can truly be reused. I'll have to play around and explore more to know if that's true.
