---
title: "Learning doesn't stop even when you become the teacher"
date_published: "2016-12-06"
backlinks:
ai_summary: "The post describes the author’s first day as a teaching assistant at General Assembly Singapore and reflects on how teaching also deepens their own learning. The main takeaway is that learning never stops, and a class insight about HTML’s lack of graceful error handling prompted the author to start using a linter to avoid simple mistakes like unclosed tags."
---

I'm starting a new (short) chapter in my life as a teaching assistant at General Assembly Singapore. Actually, yesterday was my first day and it was great. Questions I used to ask myself are now aimed at me and my fellow instructors, and being able to answer most of them (well, it's still early to say) is satisfying because you know you've helped someone attain a clear understanding.

But learning doesn't ever stop. Not as this stage when I'm a "qualified" junior web developer with no experience, and not at any stage I don't think. As bookworm-writer Maria Popova puts it, the day you feel like you've arrived is when you know you're dead.

Yesterday in class I learned to see HTML in a different light because of something Jeremiah (our main instructor) said. HTML does not have graceful errors!

When HTML breaks, perhaps because we forgot yet another closing `</tag>`, it just looks like a mess. Literally, the page looks as though the Tasmanian Devil had ransacked every element in the room whenever we commit a mistake as simple as not closing a tag.

This in contrast to how Ruby on Rails handles errors, which from what I've experienced so far, are traced with 60 to 70 percent accuracy to the root cause of the problem. :thumbsup:

The best way to avoid having to waste time fixing silly HTML errors? Use a linter add-on. Because of yesterday's epiphany, I'm going to start using one from now.
