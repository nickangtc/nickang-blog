---
title: "A day in the life of a software developer"
date_published: "2020-01-02"
tags: ["Tech"]
fav: true
backlinks:
ai_summary: "The post describes a software developer's day-to-day work, focusing on coding, brief stand-up meetings, and the problem-solving process behind implementing features like validation for a form. The author's main point is that software development is generally rewarding but can be stressful when tasks span multiple days or become harder than expected, so enjoying coding and handling uncertainty is important. The conclusion is that despite frustrations, developers usually reach a clear solution eventually, and the satisfaction of solving difficult problems makes the work worthwhile."
---

If you have ever wondered what it is like to be a software developer, like what a week in the life looks like, this post is for you. I will share from my experience when I was a software developer leading a small team and also draw from my observations of other software developers in companies that I've worked at.

The goal of this post is to equip you with enough information to build an imagination of the job in case you ever ask yourself, _I wonder what it's like to be a software developer_.

## Must be nice

If I weren't in tech and wasn't a software developer, I'd probably answer that question in my mind with, _Hmm, must be nice._ And someone who knows better would tell me: I'm not wrong.

Being a software developer is nice for a few reasons:

1. The starting salary is usually $50k annually
2. You know your skills are in demand practically in any city by most companies
3. You know you always have the power to build things yourself

These are universal Nice Things. You probably already know these things from the constant reminders from the news and social media. _Software developers among highest paid jobs in the world. Ex-Google engineers raised $10m funding round for their startup. Technically skilled immigrants are gentrifying city X._ So I won't try to add to the information that have already made it to your attention.

Let's talk about what a day in the job is like, because if the day-to-day work of a software developer sounds banal to you, you'll probably not do very well at it. Plus, if you put in the time and effort to get the job and you dislike it, you just might feel like you've sold your soul to the devil. Neither are good, so let's use the rest of this post to help you avoid these outcomes.

## Software developers code daily

![a software developer typically uses many screens to maximise screen real estate!](images/a-day-in-the-life-of-a-software-developer-nick-ang-blog.jpg)
_Photo by Max Duzij_

Surprise! Not.

Yes, software developers code _every single day_ at work without exception. (Pardon the geeky joke, I couldn't resist.)

The bulk of a day's work for a software developer is to sit quietly at his multiple screens and mechanical keyboard and read/write code.

What is this like, exactly? Let me draw from my experience doing this for over a year to paint you a picture.

### Understanding a task before coding

Today I have chosen to work on a fresh task. I go to my desk and the first thing I do is check Slack to see if there is anything urgent I need to attend to. Thankfully, nothing. Okay, great, now I can think about how to implement this task.

The task I've chosen is to _Add validation to ad creative fields to prevent submission_.

I read through the Jira ticket, which always contains information that provides the context of the problem, to see what I need to know before diving into the code.

In this ticket, someone who is also in my development team mentioned that a user recently saw a generic "An unexpected error occurred" message when they left one of the form fields blank when they submitted the form. This caused confusion and added extra load on our customer support, and is why we got feedback that we needed to fix it. Makes sense!

### Coding and breaks

I look through the details and with the context in mind, I open my code editor and start working on the folders and files that make up our company's product code base.

To start, I need to figure out which file out of the thousands of files contains the code that renders our product's user interface. I know that once I locate that, it will be my entry point to trace where else the information flows in and out of, and I can make code edits in those places as well if necessary.

I make some progress. _It's so nice to make small changes to the code and see the outcome on the user interface instantly_, I think to myself, grateful for the unique nature of software development work. But as I feel good about my job in general, I realise my mind has become saturated and that I need a break. I go to the pantry and fix a cup of coffee, sipping it while thinking of the problem.

Break over, back to coding.

Moments later, I look up from my computer at the clock on the wall and it tells me that it's already 4pm. Wow. I was really _in the zone_ there trying to implement this validation!

The good news is, it looks like it's ready to be reviewed. I've written the application code as well as some code for testing that code. I've also manually tested that it works on my local machine, and it correctly prevents users from submitting a campaign creation form if certain fields are absent and provides a much clearer error message. _Swell!_

I spend 15 minutes cleaning up my code, removing console logging statements that were helpful as I was developing this improvement but are not useful in the actual web app and generally tightening up every line of code I've touched. At 4:30pm, I submit a pull request and tag my colleague as a reviewer.

_Today's task was really well-scoped_, I think to myself, happy with my performance in implementing this improvement within a day. I know the benefits of the code I've written are not felt until they are deployed, so I don't get ahead of myself. There is a chance that tomorrow after my colleague has reviewed my code that I would need to make some modifications.

But for now, I check Slack one last time to see if there are any administrative work to do. Done with that, I pack up and go home satisfied by a productive day spent solving a specific problem.

## Software developers have daily stand-ups

The next thing that is regularly part of a software developer's daily work is joining stand-ups.

There are usually a thousand things that a development team could work on and the team needs to prioritise. Stand-ups are very short meetings where a team of 3 to 8 developers gather in the morning to prioritise each person's tasks. The product manager and a designer in the team will also likely join, if that team has them.

When I was a full-time software developer, I would have these stand-ups for not more than 20 minutes each day with my team of 3. I've attended the stand-ups at the company that I'm currently working at and the amount of time they spend is also usually under 20 minutes, even with a team of up to 6 developers.

Broadly, at stand-ups, we go through these things like:

- What am I going to work on today?
- Are there things that are blocking me from moving my task forward?
- Are there potential issues that may come from my task that I want the team to know about and potentially discuss?

The point of stand-ups is to ensure that software developers work as a team by facilitating constant communication. I find that developers' meetings are usually much more concise than meetings of the business type because the nature of software development work is that we are always working on discrete tasks with clear end states. I really like the brevity of stand-ups.

## Multi-day problems can be stressful

In the monologue of a great day in the life of a software developer earlier, I omitted something important that happens often. Sometimes, the task that you pick quickly proves to be more difficult to implement than you and/or your team had anticipated. I have encountered these many times and I find myself frustrated, stressed, and sometimes demoralised by it. It can feel like a very personal failure.

Is there any way to avoid this? Yes, spending time to properly scope tasks before they make it to the team's task list can do this. But I've found that multi-day problems cannot be eliminated completely.

In those weeks where I work on a problem that became a multi-day affair, I found myself scribbling on pieces of paper and taking 10 to 15 minutes walks to figure things out in my head. Most of the time this strategy helps me to get unstuck and the stress starts to dissipate slowly. And when they don't, the struggle of trying to solve the issue continues through the day. Some times, I sleep on it and the solution suddenly becomes obvious in the morning.

But here's the thing about coding: there is always a way to design a solution to a problem. And the sweet relief that comes from finishing a difficult task can only be described as euphoria.

Then the cycle of picking a problem, understanding it, trying to build a solution for it begins again.

## 3 bullet summary

- Software developers code every single day at work without exception and it is important to not hate this if you are to be an effective developer
- Developing software is a team sport and daily/weekly stand-up meetings among the team's developers, product manager, and designer help facilitate constant communication that ensures the team works togther to deliver business value
- Software developers sometimes have to work on multi-day problems and it can be stressful and demoralising, but because a development task always has a clear, achievable end state, they always succeed in a matter of time. And the joy of having solved a difficult problem is tremendous
