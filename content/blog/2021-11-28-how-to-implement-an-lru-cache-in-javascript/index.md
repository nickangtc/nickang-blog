---
title: "How to implement an LRU cache in JavaScript"
date_published: "2021-11-28"
excerpt: 
tags: ["Tech"]
fav: false
backlinks:
ai_summary: "The post explains how to implement an LRU cache in JavaScript, defining its behavior as evicting the least recently used entry when capacity is exceeded while updating recency on gets and replacements. The author argues that an efficient LRU cache should achieve O(1) set and get operations, and shows a design using a doubly linked list plus a plain object to meet that goal. The conclusion is that this combination provides a practical, testable implementation suitable for common caching use cases such as recent files and frequently accessed media."
---

LRU = least recently used.

An LRU cache is supposed to have a maximum size and when the user tries to insert the (max+1)th item, it is expected to evict the least recently used key-value pair to make space for the new insertion.

All requirements:

1. When the max size is hit, and an item is being inserted, evict the least recently used item.
2. When a key already exists, and an item is being inserted, replace the existing key-value pair. Also, update its last accessed time.
3. When trying to get a key, and the item exists, update its last accessed time.

## Performance considerations

An LRU cache becomes more useful the more its implementation is optimised for speed. It should ideally have a time complexity of O(1) for set and get methods internally.

Read my explanation of time complexity and Big O notation [here](/2017-11-15-algorithm-time-complexity-big-o-notation/).

## Use cases

[Dropbox](https://dropbox.tech/infrastructure/caching-in-theory-and-practice) uses LRU cache for the "Recent files" feature on their mobile app.

I couldn't find an article from the engineering blogs of Facebook or Instagram that specified the use of LRU caching for reducing database load for viral posts ([this one](https://research.fb.com/blog/2016/04/the-evolution-of-advanced-caching-in-the-facebook-cdn/) came close), but that's probably also another use case. That is, to keep frequently requested pictures and videos in a cache (in memory) for quicker access than a database, reducing load times for users and compute times for the database servers. 

## Design

Use two data structures to make the LRU cache:

1. Linked list data structure for keeping items sorted by recency of use.
2. Plain JavaScript object as a store for key-value pairs.

## Implementation

Here's how I implemented a basic LRU cache in JavaScript when I tried it recently as practice. I have deliberately left my working annotations as comments to help you and future-me think along. 

First part of implementation is the doubly linked list:

```javascript
class DoublyLinkedNode {
  constructor(value, key) {
    this.next = undefined;
    this.prev = undefined;
    this.value = value;
    this.key = key;
  }
}

export default class DoublyLinkedList {
  constructor() {
    this.head = undefined;
    this.tail = undefined;
    this.size = 0;
  }

  /**
   *
   * @param {DoublyLinkedNode} node to add to head of list
   */
  unshift(node) {
    if (this.size === 0) {
      // case 1: there are no nodes in the list
      this.head = node;
      this.tail = node;
    } else {
      // case 2: there are several nodes in the list
      this.head.prev = node;
      node.next = this.head;
      node.prev = undefined;
      this.head = node;
    }
    this.size++;
  }

  /**
   * Remove least recently used node from tail
   */
  pop() {
    const node = this.tail;
    if (!node) {
      return undefined;
    } else if (this.head === this.tail) {
      this.head = undefined;
      this.tail = undefined;
    } else {
      this.tail.prev.next = undefined;
    }
    this.tail = node.prev;
    this.size--;
    return node;
  }

  moveToHead(node) {
    if (node === this.head) {
      return;
    }

    if (node === this.head && node === this.tail) {
      return;
    }

    if (node === this.tail) {
      // set tail to tail node.prev
      this.tail = this.tail.prev;
      // set new tail node.next to undefined
      this.tail.next = undefined;
      // set node.next to current head
      node.next = this.head;
      // set current head node.prev to node
      this.head.prev = node;
      // set head to node
      this.head = node;
      // set node.prev to undefined
      node.prev = undefined;
    } else {
      // set node.prev.next to node.next
      node.prev.next = node.next;
      // set node.next.prev to node.prev
      node.next.prev = node.prev;
      // set node.next to current head
      node.next = this.head;
      // set current head node.prev to node
      this.head.prev = node;
      // set node as new head
      this.head = node;
      // set node.prev to undefined
      node.prev = undefined;
    }
  }
}
```

I wrote separate posts about linked lists [here](/2017-11-17-linked-list-explained-part-1/) and later [here](/2017-11-18-linked-list-implementation-part-2/).

Right, and here's the implementation of the cache itself using the `DoublyLinkedList` implementation earlier:

```javascript
export default class LRUCache {
  constructor(maxSize) {
    this.maxSize = maxSize;
    this.store = {};
    this.list = new DoublyLinkedList();
  }

  get(key) {
    // case 1: node with this key found
    //    update position of node to head of DoublyLinkedList
    //    return existing node
    // case 2: node with this key not found (i.e. doesn't exist)
    //    return undefined
    const existingNode = this.store[key];
    if (existingNode) {
      this.list.moveToHead(existingNode);
    }
    return existingNode;
  }

  set(key, value) {
    // case 1: search and found existing node with this key
    //    use get() to obtain node
    //    if not exist, go to case 2
    //    if exist, let get() handle re-ordering in DoublyLinkedList
    //        update node with new value
    const existingNode = this.get(key);
    if (existingNode) {
      existingNode.value = value;
      return existingNode;
    }

    // case 2: search and couldn't find existing node with this key
    //    create new node
    //    insert key-value pair into store
    //    insert to the head of DoublyLinkedList
    const newNode = new DoublyLinkedNode(value, key);
    this.store[key] = newNode;
    this.list.unshift(newNode);

    // check if max size is reached and if so, evict LRU node
    if (this.hasReachedMaxSize()) {
      this.evictLeastRecentlyUsed();
    }
  }

  hasReachedMaxSize() {
    return this.list.size === this.maxSize + 1;
  }

  evictLeastRecentlyUsed() {
    const evictedNode = this.list.pop();
    delete this.store[evictedNode.key];
  }
}
```

And of course, tests! Here they are, usable as documentation of how the LRU cache is supposed to be used and expected to behave:

```javascript
import DoublyLinkedList from "./doubly-linked-list";
import LRUCache from "./index";

describe("LRUCache", () => {
  let lru;
  beforeEach(() => (lru = new LRUCache(5)));

  it("puts most recently added item to front of list", () => {
    // note: can't test using lru.get() as that will mess up ordering
    //       reach into the internals directly instead
    lru.set("nick", "nick val 1");
    expect(lru.list.head.value).toEqual("nick val 1");
    lru.set("char", "char val 1");
    expect(lru.list.head.value).toEqual("char val 1");
    lru.set("nick", "nick val 2");
    expect(lru.list.head.value).toEqual("nick val 2");
  });

  it("puts most recently accessed item to front of list", () => {
    // note: can't test using lru.get() as that will mess up ordering
    //       reach into the internals directly instead
    lru.set("nick", "nick val 1");
    lru.set("char", "char val 1");
    lru.set("brow", "brow val 1");
    lru.set("lane", "lane val 1");
    lru.get("nick");
    expect(lru.list.head.value).toEqual("nick val 1");
    lru.get("char");
    expect(lru.list.head.value).toEqual("char val 1");
    lru.get("lane");
    expect(lru.list.head.value).toEqual("lane val 1");
    lru.get("brow");
    expect(lru.list.head.value).toEqual("brow val 1");
    lru.get("brow");
    expect(lru.list.head.value).toEqual("brow val 1");
  });

  it("keeps track of size correctly", () => {
    lru.set("nick", "nick val 1");
    expect(lru.list.size).toEqual(1);
    lru.set("char", "char val 1");
    expect(lru.list.size).toEqual(2);
    lru.set("char", "char val 2");
    expect(lru.list.size).toEqual(2);

    lru.set("bowie", "bowie val 1");
    lru.set("david", "david val 1");
    lru.set("dobrick", "dobrick val 1");
    expect(lru.list.size).toEqual(5);
  });

  it("evicts the last item in list when max size is reached", () => {
    lru.set("nick", 1);
    lru.set("bob", 2);
    lru.set("dylan", 3);
    lru.set("jonny", 4);
    lru.set("depth", 5);
    lru.set("shtick", 6);
    expect(lru.get("nick")).toEqual(undefined);
    expect(lru.get("bob")).not.toEqual(undefined);
  });
});
```

I've also added these to a codesandbox that you can find [here](https://codesandbox.io/s/lru-cache-implementation-u2zr4?file=/src/index.js:2904-2905).

Happy learning!