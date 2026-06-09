---
title: "Conceptual overview of Jest Enzyme testing"
date_published: "2018-01-05"
tags: ["Tech"]
backlinks:
ai_summary: "The post explains how the author introduced automated frontend testing to a React and Backbone codebase using Jest and Enzyme, with Jest serving as the test runner and snapshot-testing tool and Enzyme providing React component helpers such as shallow rendering. It also outlines setup details, file organization, watch mode, mocks, and a test-first workflow. The main conclusion is that shallow rendering, snapshots, and writing describe/it blocks before implementation make React component testing easier, more isolated, and more maintainable."
---

![jest and enzyme testing blog post banner nickang](images/BSP-jest-do-it.png)

I recently had the privilege of introducing frontend testing to our code base at work. With 5 engineers working on different parts of the product at any given time, it finally made sense to add automated tests. I can foresee this helping us cut down time spent on debugging and improving the overall quality of the product.

Because our frontend stack was [React](https://reactjs.org/) and [Backbone](http://backbonejs.org/), we needed a test library that can test React components. Some deliberation later, we decided to go with [Jest](https://facebook.github.io/jest/) (by Facebook and used internally at Facebook) and [Enzyme](http://airbnb.io/enzyme/) (by Airbnb and also used internally at Airbnb).

In the rest of this article, I share a broad conceptual overview of what Jest and Enzyme are, what they can do separately and combined, and some notes on how to get set up with them for any existing React projects. Basically, what I wished someone wrote before to help me gain a high level understanding of what Jest and Enzyme offers.

## Jest? Enzyme? How do they work together?

Jest is a **test runner**, which means it knows where to look for test files, how to run multiple tests in parallel and combine their output, and how to display useful error messages when things go awry within your implementation code.

Aside from its functionality as a test runner, Jest is also useful for its unique [snapshot testing](https://facebook.github.io/jest/docs/en/snapshot-testing.html) feature. More on that later.

Enzyme, on the other hand, is a library of helper functions that are especially useful for testing React components. Without Enzyme, testing React components will be significantly harder because you'd have to implement your own functions to "shallow render" a component (as opposed to actually mounting it onto a DOM) and search for specific elements within them yourself, for example.

In short:

- Jest is the test runner, and it provides a cool feature called snapshot testing
- Enzyme provides useful helper functions for testing React components (eg. `shallow()`)

### Jest notes from the field

- `describe()` is used to group multiple relevant tests together
- `it()` is an [alias](https://facebook.github.io/jest/docs/en/api.html#testname-fn-timeout) of `test()`
- `expect()` is used to assert
    
    - eg. `expect(wrapper.find('.header').text()).toEqual('hello');`
- It is perfectly fine to nest a `describe` within another. As this [article](https://techblog.commercetools.com/testing-in-react-best-practices-tips-and-tricks-577bb98845cd) puts it: _'"describes" are meant to explain conditions, whereas "its" are meant to explain the expected output.'_
- We make use of Jest's unique [snapshot testing](https://facebook.github.io/jest/docs/en/snapshot-testing.html) feature to easily keep an eye on unwanted changes to our React views
    
    - Jest will automatically generate a new snapshot and compare it with the old snapshot whenever [`toMatchSnapshot()`](https://facebook.github.io/jest/docs/en/expect.html#tomatchsnapshotoptionalstring) is called in test code
    - snapshots are plain text files with a .snap file extension that contain the markup generated from rendering a React component
    - snapshots are automatically generated and stored in the `__snapshots__` folder
    - this feature has more use cases than keeping a frozen snapshot of a rendered React view, but we will have to explore it at a later stage

### Enzyme notes from the field

- `shallow()` will shallow render a React component without the DOM. It renders only the component itself, and its children components (eg. `<ChildComponent>`) will just appear as `<ChildComponent>` instead of its constituent HTML elements. This is so that tests for one component do not break if its children components have been modified - a good thing, because tests can be done in isolation
- When in doubt, use shallow rendering to test React components. Only use `mount()` or `render()` when you really can't test with just shallow rendering

## package.json

Here's the exhaustive list of npm packages and Jest configurations that we needed to use the Jest/Enzyme combination together:

// package.json
...
  "devDependencies": {
    "enzyme": "^3.2.0", 
    "enzyme-adapter-react-15": "^1.0.5",
    "enzyme-to-json": "^3.3.0",  // to seralise Enzyme output for use with Jest snapshots
    "eslint-plugin-jest": "^21.5.0",  // linter plugin for Jest
    "jest": "^22.0.4",
    "jest-cli": "^22.0.4",
    "react-test-renderer": "^15.6.2",  // dependency of enzyme-adapter-react
  },

  "jest": {
    "moduleDirectories": \[
      "client",
      "node\_modules"
    \],
    "moduleNameMapper": {  // specify mock file for import/require statements that match these
      ".+\\\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga|scss|css)$": "/private/jest/fileMock.js",
      "imports?.\*": "/private/jest/fileMock.js"
    },
    "moduleFileExtensions": \["js", "json", "jsx", "node"\],
    "setupFiles": \[  // make available global variables like lodash, jQuery, Backbone, etc.
      "/private/jest/setup.js"
    \],
    "snapshotSerializers": \[  // configure to use enzyme-to-json as serializer for snapshots
      "enzyme-to-json/serializer"
    \]
  }
... 

## How to run tests

This is our scripts setup in `package.json`:

...
  "scripts": {
    "test": "jest",
    "test:up": "jest -u",
    "test:watch": "jest --watch"
  },
...

Once the "scripts" in `package.json` has been set up as above, to run existing tests:

$ npm run test

### How to use Jest snapshots

With Jest, snapshots of rendered React components are automatically regenerated with every `.toMatchSnapshot()` call that exists in your tests.

For example, if tab-simple.test.jsx has 10 `expect(...)` blocks that each make a `.toMatchSnapshot()` call, there would be 10 snapshots generated within 1 file in `__snapshots__/tab-simple.test.jsx.snap`.

Here is a sample `tab-simple.test.jsx.snap` plain text file:

// Jest Snapshot v1, https://goo.gl/fbAQLP

exports\[\`TabSimple component should render exactly as last snapshot 1\`\] = \`
- Tab 
      1
       
    
\`;

### Generate new snapshot

For snapshots that are generated for the first time (ie. there's a new test using `.toMatchSnapshot()`), you should:

1. Open the generated .snap file
2. Search for the part that contains the new snapshot markup
3. **Verify that the markup is what you expect** your component to be rendering
4. If it is not, find out why and fix the issue and update the snapshot (see below)

### Update snapshots

Sometimes, you will need to override the old snapshot with a new one (when you change the frontend UI, for example, or when your freshly generated snapshot is showing you unexpected markup). To update the relevant snapshot, follow these steps carefully:

1. Understand the gravity of the situation. Snapshots are only useful for alerting you when there's been a change in the rendered output of a React component. **It's up to you to determine if the change is expected or not**, and what to do about it if it is unexpected
2. Use the Terminal output from Jest to identify the part of the snapshot that is now different
3. Check whether that change is expected (perhaps because you changed the UI or underlying implementation)
    
    - if it is expected, then update your snapshot (see below for command to do this)
    - if the change is unexpected, fix your implementation and re-run the test until it passes again!

```shell
# update ALL snapshots
$ npm run test:up

# or if in watch mode, hit 'u' (only after confirming changes are EXPECTED)
$ npm run test:watch
```

## How to write tests while developing

In this section, I will go into some of the details of how to use Jest to write tests and suggest a general approach to doing test-driven development (TDD) with Jest.

### Put test files in a nearby tests folder

Because Jest is a test runner, it will automatically find all files inside `__tests__` folders and use them as source files whenever we run `npm run test`.

We should keep `__tests__` files close to the implementation. For example, the test file for `client/components/component-x.view.jsx` should be contained in `client/components/__tests__/component-x.test.jsx`. Visually:

client/
|--- components/
|  |--- \_\_tests\_\_/
|  |   |---> component-x.test.jsx
|  |---> component-x.view.jsx
|  

Note: As a convention, test files should be named with `.test.` in its suffix.

### Use watch mode

Watch mode is a very useful functionality that works similar to other commands with `--watch` flag. In watch mode, Jest will observe changes in any files in `__tests__` folders and automatically re-run all tests for us. It's even optimised to run only the files with changes since your last git commit!

To run Jest in watch mode:

$ npm run test:watch

### Use a mock to return a dummy function/object

The idea of the "[mock](https://facebook.github.io/jest/docs/en/manual-mocks.html)" is not unique to Jest but common to most testing libraries. From what I can tell so far, mocks have two key purposes in unit testing:

- Maintain isolation in the component that is being tested by removing external dependencies. This prevents our tests from failing potentially because the dependency has a bug, for example (see [this SO answer](https://stackoverflow.com/a/38256/6463816))
- Prevent ES6 or AMD import/require errors with external libraries (eg. I had errors importing [Blueimp jQuery file upload](https://github.com/blueimp/jQuery-File-Upload) lib and mocking it solved the problem)

### Start with 'describe's and 'it's first

Borrowing from test-driven development (TDD) and the incarnations before it, you should default to writing test code _before_ writing implementation code if you are building a new React component.

Take advantage of the structure of tests, which is to write `describe(...)` blocks followed by several nested `it(...)` blocks. By writing your expectations of the component you're about to build before writing any test or implementation code, you are clarifying the requirements.

Here is an example of writing the general `describe` and `it` blocks before writing any test code:

describe('EmailBuilder component', () => {
    it('always renders a "Subject Line" label and input');
    it('always renders 4 Recommender draggable components');
    it('always renders 5 Basic draggable components');
    it('should not render Sandbox component by default');

    describe('when used in Campaign (One-off Campaign)', () => {
        it('should render exactly as last snapshot');
        it('always renders at least 1 variant tab');
        it('always renders a "Preview Mode" button');
        it('should not render a Receipt draggable component');
    });
});

In the above code snippet, you've basically laid out the top level specifications of your component! From here, you can begin writing test code in the `it` blocks, make sure the test fails first, then write the actual component implementation to pass that test, and finally refactor any redundant code.

**Useful resources:**

- Jest [matcher methods](https://facebook.github.io/jest/docs/en/expect.html#content)
- Enzyme [helper methods](http://airbnb.io/enzyme/docs/api/)
- [Article](https://hackernoon.com/testing-react-components-with-jest-and-enzyme-41d592c174f) on Hacker Noon on using Jest and Enzyme for testing React components
