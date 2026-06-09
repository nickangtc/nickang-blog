---
title: "Bite Size Programming - How programmers are like doctors"
date_published: "2017-10-24"
tags: ["Tech"]
backlinks:
ai_summary: "The post describes how a programmer team diagnosed a memory leak in a machine learning algorithm that was causing server crashes, using Python’s memory_profiler to trace memory growth line by line. The author’s main point is that debugging software can feel like medical diagnosis, requiring careful investigation to locate the underlying problem before treating it through refactoring. The team ultimately found a variable that was not being deallocated by Python’s garbage collector and fixed the code so memory would be released each loop."
---

![BSP programmers are like doctors nickang blog](images/BSP-programmers-are-like-doctors-nickang-blog.png) 
_Photo by Piron Guillaume on Unsplash_

Some days at work as a programmer, I feel like a doctor trying to resuscitate software.

Drawing from a recent example at work, we realised that our machine learning algorithm was taking up quite a bit of memory.

In fact, it was taking so much memory that there wasn't enough for the process to complete when there was a huge store using [Metisa](https://askmetisa.com). That sometimes made our server crash and auto-restart without finishing running the algorithm.

This situation was obviously problematic and had to be fixed. While we knew as a team that our algorithm is supposed to take up quite a bit of memory, we were also confident that it shouldn't take up so much to cause the server to run out of memory.

What we didn't know yet was _which part_ of the code was hogging memory unnecessarily (causing what is known as a "[memory leak](https://stackoverflow.com/questions/312069/the-best-memory-leak-definition)").

And so our task was laid before us: find the problematic code and perform a _code-ectemy_! Or in normal human speak, we needed to **refactor** the problematic code. ([Refactoring](https://en.wikipedia.org/wiki/Code_refactoring) is the term given to the act of re-writing code to make it better, in terms of speed, readability, scalability, or reliability.)

This was my first time trying to diagnose a tumour in our software. We knew that something bad is festering inside; we just had to locate it.

So like a doctor with his stethoscope, a colleague and I installed a Python package called [memory\_profiler](https://pypi.python.org/pypi/memory_profiler) to monitor the memory usage cumulatively and broken down into every single line of code.

First, we noticed something strange about the overall process. Because our script that runs the algorithm actually runs a loop that applies the algorithm to every single store in our system, some memory allocation had been accumulating like carbon on an engine valve. We noticed this from the fact that memory usage increased by about 10 MB to 30 MB with each successive loop.

Then, we surveyed closer, this time applying something more appropriate for the job, a software equivalent of an endoscope. We basically used more specific **methods** provided by the memory\_profiler package.

We applied the method to more and more parts of our code, getting closer each time. Finally, we pinpointed the issue. A variable was increasing in size (and taking up more memory) but not de-allocated by the automatic **[garbage collector](https://en.wikipedia.org/wiki/Garbage_collection_(computer_science))** in [Python](https://docs.python.org/2/library/gc.html).

Once we found the specific problem, we got to work refactoring the code so that it would de-allocate memory with each loop.

And that's the story of how we, with a team of two "doctors" in the operating theatre, resuscitated our software from its recent crash!
