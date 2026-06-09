---
title: "Quicksort explained"
date_published: "2023-05-15"
date_updated: "2023-05-15"
excerpt:
tags: ["Tech"]
fav: false
backlinks:
ai_summary: "The post explains how quicksort works, using a random pivot to split an array into less and greater subarrays and then recursively sort them. Its main point is that quicksort is efficient on average at O(n log n), but can degrade to O(n^2) and O(n) space if the pivot choice is poor, such as always picking the first element. The useful conclusion is to avoid hardcoding the pivot and instead use randomness or another sensible heuristic, with tail recursion suggested as an additional optimization."
---

Quicksort – stylised as a single word for some reason unknown to me – is a practical sorting algorithm that is often used in production code because it is very efficient for a sorting algorithm.

To give you an idea of how complicated this is, I spent about 45 minutes reading the Quicksort chapter in [Grokking Algorithms](https://www.oreilly.com/library/view/grokking-algorithms/9781617292231/) to fully understand how it works and its time and space complexity, and later spent 15 minutes to implement it in JavaScript (code below).

Quick disclaimer, though: in our example below, we just use an array of integers to directly simulate the sortable property (a number), but in reality, you can imagine that that probably isn't a frequent use case. What's probably more common is sorting an array of objects by one of their properties, like IDs. Once you know how it works, you can write your own custom sorter that uses quicksort under the hood.

Right, now let's talk quicksort.

## How it works

1. Receive an array - let's call this simply 'the array'
2. Pick a random item in that array - call that the 'pivot'
3. Initialise 2 new empty subarrays - call them 'less' and 'greater'
4. Now all setup is complete. Let's start the sorting!
5. Iterate through the array (but skip the pivot), comparing each item to the pivot's value:
   1. if smaller or equal, put it in the 'less' subarray
   2. if greater, put it in the 'greater' subarray
6. Now call quicksort again on the less and greater subarrays - this is where the recursion comes in
7. Combine the results: `[...quicksort(less), pivot, ...quicksort(greater)]`

If some parts of that explanation is confusing, that's because it tries to express something that is probably best expressed in code. So now let's look at a simple implementation in JavaScript.

## Quicksort in JavaScript

```js
function quicksort(arr) {
  if (arr.length < 2) return arr;

  // incorporating randomness forces this algorithm to most often hit
  // the average time complexity: O(n log n)
  const randomPivotIndex = getRandomIntInclusive(0, arr.length - 1);
  const pivot = arr[randomPivotIndex];

  const less = [];
  const greater = [];

  // iterate and place each item in either `less` or `greater` partition
  arr.forEach((item, index) => {
    if (index === randomPivotIndex) return;
    item <= pivot ? less.push(item) : greater.push(item);
  });

  // 🙌 this is the essence of quicksort
  return [...quicksort(less), pivot, ...quicksort(greater)];
}

console.log(quicksort([5, 13, 2, 3, 8, 1]))
// => prints [1, 2, 3, 5, 8, 13]
```

And separately, here's the run-of-the-mill function for picking a random integer in a range that I copied from [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random):

```js
// The maximum is inclusive and the minimum is inclusive
function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
}
```

## Time complexity

The time complexity is `O(n log n)` in the best and average cases. Looking at every single element constitutes linear time complexity `O(n)`, and since each call splits the input in _roughly half_ to each be recursed upon, those operations constitute another `O(log n)` runtime complexity.

But quicksort's worst case time complexity is actually quadratic, or `O(n^2)`. This happens, for example, when you pass an already sorted array into quicksort and always pick the 1st element in the array as the pivot. In such a case, each call to quicksort splits the input into 2 partitions but the `less` partition is always empty, while the `greater` partition always has `n - 1` items. Recursing on that second half will yield the same inefficient partitioning all the way up your callstack.

So, effectively, calling quicksort on an already sorted array means re-sorting everything when you hardcode the pivot to be the 1st element of the array. So, __don't hardcode the pivot to look at the 1st element__! What we ought to do is to throw in some randomness so that we push quicksort to operate, on average, with `O(n log n)` time complexity.

## Space complexity

For space complexity, it's `O(log n)` in the average case and `O(n)` in the worst case. Can you reason why?

In the earlier example where we passed a sorted array into quicksort, what happens to the callstack? Let's say we passed in an array with 10 elements – how many `quicksort` calls will be added to the callstack before the first array is returned?

Answer: 10 calls, which is the size of our input n, so that's `O(n)` space complexity in the worst case.

And if we picked a random pivot, or picked it according to some other sensible heuristic, then we would likely have half or less than half the number of calls in total. So that's `O(log n)` space complexity in the average case.

---

Further optimisation: rewrite algorithm to be tail recursive to save on memory and reduce space complexity from O(n) to O(log n) in the worst case. Average case remains O(log n).
