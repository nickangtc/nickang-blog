---
title: "Delete 'best practice' from your lexicon"
date_published: "2025-02-14"
date_updated: "2025-02-14"
excerpt: "And exercise intellectual honesty instead."
tags: ["Career", "Living", "Daily Reflection"]
fav: false
creation_duration_minutes: 60
backlinks:
ai_summary: "The post argues that the phrase best practice is often misused in software engineering because it ignores context and can hide contradictions between competing principles like DRY and single source of truth. Using an example of climbing with a fearless child and a backend/frontend validation dilemma, the author suggests that people should think independently, evaluate trade-offs honestly, and stop relying on the term altogether."
---

## (Courage) Which one? Okay.

When we were bouldering recently, I felt noticeably less courageous than I was the week before. I wondered why and I think the reason is because my daughter wasn't around.

Her presence makes me courageous.

Now why would that be? Because she is hella courageous, that's why!

She's also a climber. Since she's only a bit over 3 years old, we still identify suitable routes for her to try. Every time we find one, we would point at it and say, "try this one!" And every time, she would reply, "Which one? Okay," and she would go straight onto the wall with her hands and feet. Zero hesitation.

When I climb with her, I inadvertently absorb a bit of that mentality. _Which one? This one? Okay._ I start a route without thinking beyond the first holds, and more often than not I manage to finish the route.

Chalk it up to whatever, it doesn't matter.

We were all extremely courageous before and I don't see how age could prevent us from being so again if we tried.

## (Intellectual honesty) When best practices are harmful

Every industry has best practices. Some from software engineering:

- Add validation logic on both the frontend and the backend to provide the best UX.
- Do not repeat yourself (DRY principle).
- Maintain a single source of truth.
- Write unit and e2e tests so you can ship with confidence and catch bugs early.
- Create small PRs so they get proper and timely reviews.
- Inject dependencies instead of creating tightly coupled systems.

I've come to realise recently that best practices are nonsense. Learn about them and never talk about them again. Here's why - it makes you lazy and insufferable.

I've been in numerous technical debates from small to big. These are Slack threads or meetings where we're supposed to come up with the most suitable technical solution as a team and decide on something. At some point, someone joins the party and simply says "Do this, it's the best practice" like they are dropping wisdom and expects everyone to be convinced that that is the best way forward.

This is nonsense because you know what is the best practice that many "best practices" out there ignore? Context. And context is a major, if not the most important dimension to consider when making a decision.

Look back at the list from earlier:

- Add validation logic on both the frontend and the backend to provide the best UX.
- Do not repeat yourself (DRY principle).
- Maintain a single source of truth.

There is an inherent contradiction here. Let's say we're talking about a Business Info form on a webpage. It has a Tax ID field that is mandatory, and every country has its own pattern, requiring us to have a list of regexes to validate against.

Since we should add validation on both the frontend and backend (Best Practice 1), we should probably add that validation logic in the frontend code. That would indeed provide the best possible UX, since a user doesn't even need to submit the form to know that there is an error in the format of their Tax ID.

But now in the backend, to ensure data integrity, you're also going to want to add the same regex list there for validation before saving anything to the database. This still sits perfectly with BP1, but it violates BP2 - do not repeat yourself. It also violates BP3, which is that you should have a single source of truth (but now we have 2 lists of regexes, one for the frontend and another for the backend).

So what do we do now? How helpful is it really for anyone to say, "that's best practice"?

From what I've observed, best practices are almost always understood (and used) out of context, and there's a lot of moving pieces in every situation:

- Are you working in a 10-engineer startup, 150-engineer growth stage startup, or a 2000-engineer enterprise?
- Is the business currently in code red or peace time? Is there bigger fish to fry?
- Will this part of the product be made redundant soon when Feature X comes out?
- Is the team slated to expand or contract in the next few quarters?
- Which customer segment is using this part of the product? Do we need to invest in or divest from that?
- Are the code bases in the same programming language?
- Is it a microservices architecture or a monolith?

Every situation (i.e. context) is unique and it's impossible to come up with a best practice for every combination. What's left are broad statements that those who don't know enough will incorrectly fall back to. They think it's a safety net, when sometimes it's really one that isn't anchored to the beams.

The solution in my opinion is to default to thinking independently, to exercise intellectual honesty.

We should consider this, evaluate that, weigh them, then say something (or don't if unsure). We should delete the term "best practice" from our lexicon. Your colleagues will appreciate you for not taking intellecutal shortcuts in debates.
