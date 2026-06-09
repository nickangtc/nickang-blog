---
title: "What it's like building app features in 2017"
date_published: "2017-05-21"
backlinks:
  - slug: "/2017-11-10-email-html/"
    title: "Dear email HTML, please get better"
  - slug: "/2017-12-14-prevent-jquery-loading-image-parsehtml/"
    title: "How to prevent jQuery from loading image in parseHTML"
ai_summary: "The post discusses building a drag-and-drop email editor feature in 2017, using React and open-source libraries such as QuillJS, react-quill, and react-dnd. The author argues that modern open-source tools make it possible for a single developer to ship complex features quickly, though this also creates dependency on maintainers and requires careful work on existing codebases. The conclusion is that the current software ecosystem is highly collaborative and has made feature development faster and more accessible than in the past."
---

First of all let me admit, I wasn't there to witness what it was like to build web/mobile app features before 2016, since I only became a web developer last year.

That said, seeing that the open source movement really only picked up amazing momentum in the past couple of years, I can imagine that it was much harder to build full-fledged features from the ground up till as late as early 2010s. That difficulty is also probably exacerbated by the less nimble management practices of tech companies (agile wha-?) and the overall economics of hiring developers to build software.

But this is 2017, and I now have the vantage point of being a developer / software engineer that affords me some insights into what it's like building app features now.

I'm writing this article on the same day that I created a pull request to submit my last two and a half weeks worth of work. The work was for a drag and drop email editor user interface, built mainly with ReactJS, and I'm really happy to complete my first major feature ever for a [live product](https://askmetisa.com)! Although I was a little overly optimistic and ended up delivering about half a week behind schedule...

Over the course of building this feature I've learned a few things about software development, some general and some more specific to current times. Some of the more interesting ones:

- There are _a lot_ of great open source software that anyone (companies and individuals) can use for free now
- Using an open source library also means trusting the creators/maintainers enough to make our project dependent (reliant?) on theirs
- Software developers have to be like surgeons when building features on top of an existing code base

More on the point about free, open source software available out there in 2017. In the process of building the email editor feature, I used three open source libraries that I think are really well made, and for which I'm incredibly appreciative of. [QuillJS](https://quilljs.com/), [react-quill](https://zenoamaro.github.io/react-quill/) and [react-dnd](http://react-dnd.github.io/react-dnd) helped me ship the feature in two and a half weeks.

Now I know that I mentioned that I shipped this feature about half a week late, but just pause for a moment and appreciate how short that timeframe is. In less than a month, _one person_ was able to write the code that powers a [Wix](https://www.wix.com/)\-like drag and drop editor for composing emails that all users of our product can make use of. While it's probably still buggy to some degree, it's definitely ready for use.

This is the environment we operate in now. Regardless of what it was like building software before 2017, I'm grateful to be alive and contributing to the software industry now. The collaborative atmosphere in the software community doesn't just make me feel warm and fuzzy, it actually helps me do my job better!
