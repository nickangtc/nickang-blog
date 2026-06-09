---
title: "Software bugs and trash"
date_published: "2021-02-14"
excerpt: "Software bugs are in many ways analogous to everyday trash."
tags: ["Leadership", "Tech"]
fav: true
backlinks:
  - slug: "/2021-10-10-specialist-or-generalist/"
    title: "Specialist or Generalist?"
ai_summary: "The post compares software bugs to city trash, arguing that bug reports should be treated as inboxes that capture problems directly and with minimal friction, rather than relying on informal Slack messages that can be forgotten. It suggests automatically creating Jira bugs from reports, and says that if a team is overwhelmed by bug volume, the solution is to expand capacity or split the team rather than leave reports unhandled."
---

Software bugs are in many ways analogous to everyday trash.

A city government needs to deal with the trash in the city that is produced every day by its citizens, tourists, and whoever happens to be walking the streets. In Berlin where I currently reside, the city has bright orange bins attached to lamp posts throughout the city designed to ensure that when there is trash to be thrown, they are thrown into these bins rather than littered in random street corners.

A software company needs to do the same thing for its users and its employees. When people use a piece of software, they inevitably encounter situations where the software is not behaving the way it is supposed to. These are [bugs](/2017-10-31-bugs/).

What happens when someone encounters a bug? For a new user, they might simply quit using the software forever with a bitter taste left in their mouth. But for users who have grown to like that software, they would probably report the problem to the company. Employees in that software company would probably want to report the bug as well, because nobody wants to sell, troubleshoot, maintain, or develop buggy software. 

So a company, like a city government, needs to have bins to collect these bug reports.

Put directly:

1. A company is like a city government. It must provide bins to collect the things that stink.

2. The bins in a city are like the bug boards (e.g. Jira) in a software company. They serve as inboxes for trash that must be disposed of.

Now let's talk about a hypothetical example of a software company.

## Workflow for dealing with bugs

Imagine a software company has an existing workflow for dealing with bugs that goes like this: 

1. Employee finds a potential bug 

2. Employee goes to the relevant development team's Slack channel and pings the team's "bug investigator of the week" about the issue

3. The bug investigator looks at the message when he/she has time, and if considered valid, asks the employee to then file a bug report in their Jira board

What's the problem with this workflow?

The main problem is that there is **friction** between "potential bug reported to the right development team" and "bug report filed in Jira." Is this the kind of friction that helps a person not fall flat when walking on ice, or the kind that builds up heat and wears things down?

A better workflow might be for step 3 to be like this instead:

3. The ping by the employee reporting the bug gets **automatically created** as a bug report in the relevant development team's Jira board.

This makes more sense than the old workflow because the Jira board is the inbox, the equivalent of a city's rubbish bin, where bug reports are supposed to be filed. The old workflow is akin to littering in the city, as the trash is mentioned once in Slack and potentially forgotten until it gets swooped up by the wind, hits the windscreen of a passing car, and causes a fatal accident. Or it causes fewer tourists to visit the city because the streets are dirty and smelly. The city (or the company) slowly withers.

All good so far. Now let's add a twist.

## Bug overflow

![overflowing trash in Berlin](./images/overflowing-trash-berlin-nickang.jpg)
_The bright orange trash bin in Berlin and its overflowing trash at a busy intersection. Oh, and Brownie._

Suppose there is one development team that has a good reason to not like the new workflow.

This is the development team with the most bugs, not because of substandard work but because of the nature of the domain that they are working in (for example, dealing with a fast-changing external API). They are afraid that this workflow would drown them in bug reports in Jira and cripple their ability to work on new features that customers are impatiently waiting for.

If you were an executive on the Engineering leadership team, what would you do? I believe the analogy of the city and the company can help us think through this problem.

If there is a particularly busy intersection in a city, and the bins around that intersection are too few and too small to accommodate everyone's trash, and people are starting to leave their trash on the ground next to the bin when the bins are full, what would a city official do?

I guess that the city government would either install more bins or expand the existing ones and find a way to increase the capacity for processing the trash. Either way would be better than letting the trash pollute the city streets. Ignoring the trash is just not a viable option if the city wanted to remain conducive to locals and attractive to visitors.

A software company, in my opinion, needs to do the equivalent. Expand the bins (and staff more people to process the inbox), or install more bins (by splitting the team into several smaller ones). Ignoring the overflow is just not an option.