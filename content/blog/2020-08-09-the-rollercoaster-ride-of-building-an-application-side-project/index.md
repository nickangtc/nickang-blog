---
title: "The rollercoaster ride of a side project"
date_published: "2020-08-09"
backlinks:
ai_summary: "The post describes the author’s side project to build a remote sprint-planning tool that aggregates team votes in real time, aimed at making remote estimation sessions less clunky. The main point is that side projects can be psychologically slow and frustrating because capability is not the same as proficiency, and the author spent significant time relearning technologies, changing approaches, and questioning whether the effort was worth it. The conclusion is that the project is still worth finishing for its practical use at work, and that the author rejects the pressure to treat every personal learning effort as a productivity or ROI calculation."
---

![demo gif of nickang's remote sprint planing side project](images/remote-sprint-planner-demo-nickang-blog.gif)
*Getting to this point took over a month*

A bit over a month ago I got very excited to work on a new side project all over again, and now, I realise my progress has been slower than expected. I thought I would have v1.0 deployed and usable in about a month. *It really isn't that hard to build*, I thought to myself that day. What is it that people say? Famous last words? Right.

In this article I reflect on the rollercoaster ride of building an application as a side project. Too few articles exist on the internet talking about the psychological grind of makers building things in their free time, so this is my contribution. We need more of these because *man*, we know we are technically capable to build things but a million things seem to stand in the way, real or imagined. I want to talk about that.

But first, a brief on the project.

## Remote challenges

In tech, there's this way of organising team work called the "sprint". Part of a team's working in 2-week sprints is the sprint planning session where the team comes together to go through a list of tasks and estimate "story points" for them. The whole affair is concerned with estimating the level of effort each task would take by assigning a number to it. It's a number collectively agreed by the team to describe the effort needed to complete the task.

With COVID and the remote work arrangement that fell into our homes recently, sprint planning has become slightly trickier.

A particular problem that my team and I face during remote sprint planning is the chaos that ensues right after everyone reveals their votes. *5, 5, 3, 8, 13, 3. Hang on guys, let me count how many voted 3, 5, 8, and 13…* 

I've been administering these sessions and I noticed myself regularly asking everyone to keep their hands up near the screen so I can tally the numbers. Sometimes I also struggle to figure out the number based on hand gestures. *What is one hand showing 3 and the other showing the index finger?* The whole sprint planning process feels clunky when done remotely and I felt that a tool that let people vote and aggregated those votes could makes things smoother.

So, that's what I've been trying to build. Now we're ready to talk about why v1.0 is not ready even after a month. After all, people build functional apps in 24 hours at hackathons, so a month is ludicrously slow, right?

## Capable vs Proficient

Here's my quip: I know I am capable of building this thing. In fact, I've built some of it but it's just not usable yet. Next steps are also clear to me. So why is it not done already?

I've come to realise that being capable is not the same as being proficient. I am capable of building a web app that receives data from multiple browsers and relays it to those browsers in real-time. But I am not proficient enough to build it as quickly and beautifully as other software developers. Proficiency comes with regular practice, like a lean body comes with regular exercise.

And so, upon reflection, it is not a surprise to me that I build things slower than other software developers. In my current role at work, I'm not building the product. I apply my know-how and skills to solve ad-hoc problems arising from people's use of our product. As a result, my general software development skill is rusty and I need to google a lot to clarify concepts. 

For example, I spent over an hour to research what technologies I could make use of to build a real-time application. I'd used one of them (web sockets) in a project two years ago, but I'd never used this thing that's apparently called Server-Sent Events (SSE) in any project before. Neither have I implemented my own long-polling system before. Picking a technology among the three and writing a "hello world" program with it already took significant time and felt laboured. For a developer who codes everyday, she probably could have breezed through this with intuition. For me, it took me a weekend's worth of allocated side project time.

Worse, at first I picked SSE as the technology for the real-time aspect of the app. Then I realised that I'd need the client to send client-specific information like user ids along with each request. Associating those requests to the uni-directional SSE pipe is tricky and makes the code hard to read. So 2 weeks in, I dismantled the SSE implementation completely and began re-implementing things using web sockets, a bi-directional pipe that makes associating a user with a connection much simpler.

Mixing up being capable and being proficient affects my psyche through my ego. This is why the skill of seeing things for what they are is so important.

Proficiency takes time to develop and I should be okay with not being as proficient as the developers at my company. After all, they chose to go deep in this field and I have chosen not to.

And you know what? At least I know I can build this thing. I'll just do it slower. Besides, [being proficient has its downsides](/2018-01-12-courage-to-build/) too.

## Does it make sense to work on this skill?

Because I'm not working as a software developer at the moment, I regularly question my time investment in learning certain technologies and sharpening my general ability to build software. Does it make sense to spend time learning all this just to build this project that I intend to be done with not too long from now, if I don't get to apply the learnings at work, the thing that *actually* helps me earn money? Would I not get more out of investing my time in, say, learning technical writing so I can do better at my job?

As you can imagine, second guessing your own use of time at every turn can take the bounce off your keystrokes.

The way I reason about this, at least for this particular project, is that by the time I'm done, I can use it at work to save me some time counting fingers on the screen. If not for this direct benefit, I probably would give up trying to finish this project. *Project X, meet my side project graveyard.*

But, taking a step back to see the whole, perhaps this line of questioning should itself be questioned and banished from resurfacing again and again. Being someone who is technically skilled, I'm not actually at risk of not being employed. The means that worrying about maximising my time investment in what skills to pick up or sharpen is not actually warranted. Outside of work I can afford to learn whatever I want without the pressure of needing to maximise ROI (return on investment). Besides, I also read fiction. How do you measure the ROI of *that*? 

If I were tasked to find the culprit of me thinking this way, I'd point my finger straight at Singapore society. Everything I do should purportedly yield an increase in productivity, income, or something else. *Don't pursue art which, by the way, is useless by definition. Upskill! Keep yourself employable!* Being in Berlin has helped me notice the water I'd been swimming in in Singapore all along. I respectfully reject this utilitarian-to-the-core thinking, thank you very much.

These are the ups and downs I've experienced in the last month and a half from working on my current side project. I still intend to finish this project and get v1.0 shipped, mainly so that I can use it with my team at work.

You can view the open-source code for the project here: [GitHub - nickangtc/remote-sprint-planner: A little app to make remote sprint backlog estimation sessions more efficient and fun.](https://github.com/nickangtc/remote-sprint-planner). 

---

**Related things**

The best summary of the 3 technologies for real-time applications I've found: [Do you really need WebSockets?. Over the years I've had this… | by Stanko Krtalić Rusendić | Not again](https://blog.stanko.io/do-you-really-need-websockets-343aed40aa9b)