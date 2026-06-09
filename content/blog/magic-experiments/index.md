---
title: "Magic Experiments"
date_published: "2026-05-13"
excerpt: "Small vibe coded apps to prove real magic exists (and taking the opportunity to introduce what computers can do) to a 4 year old."
tags: ["Project"]
cover: "/project-covers/magic-canvas.png"
backlinks:
ai_summary: "The post describes a father building simple \"magic\" computer experiments for his 4-year-old daughter, inspired by her question about whether real magic exists. He says AI agents made it easy to create local, browser-based hand-motion and sound effects without APIs, and he guided the system with a clear constraint to keep everything computed locally. His conclusion is that AI can be resourceful and effective when given a well-defined goal and boundaries, making it useful for low-complexity creative coding projects."
---

<iframe
  width="560"
  height="315"
  src="https://www.youtube.com/embed/pr8QE93RTRQ"
  title="Youtionary"
  frameborder="0"
  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
  referrerpolicy="strict-origin-when-cross-origin"
  allowfullscreen
></iframe>

One day, my 4 year old daughter asked me, "daddy, is there such a thing as real magic?"

As a good software engineer, I had to ask some clarifying questions. "What does real magic look like to you?"

"Oh, like if I wave my hand, something will happen," she replies without hesitation.

I think for a second. Hmm, move hands, something happens. I can totally make this happen with computer vision detecting hand movements and rendering stuff on the computer screen. (Even though I'd never done it before, I knew it'd likely be trivial with AI agents because it's in the training dataset.)

So I said, "Oh yeah, that kind of real magic exists! I can show it to you tomorrow. But the magic will happen on the computer, ok?"

She hears about the computer and says "then that's not real magic."

"Let's start with making magic on the computer, then we can try to make magic happen in real-life. Deal?"

She smiles and nods and goes off to kindergarten. And I, got to work.

It turns out that I was right - it is trivial to prompt these things into existence with AI agents, especially if you have an idea of what the rails should be. I happen to be a developer, but if you aren't and still want to find out what prompts were used and how I guided the AI agent to conjure magic software, you can view the full conversation history between me and my AI agent (GPT-5.5 on medium):

- prompt history for creating magic-sounds: https://pi.dev/session/#3b465ded5d047756875ae89c6a676da0
- prompt history for creating magic-canvas: https://pi.dev/session/#68136264d4a60562e1e9760921581a20

An interesting technical point: I specifically gave it a constraint - "no APIs, everything should be computed locally." I didn't want to deal with a backend to handle API keys. I'm practising vibe coding in the context of wanting to let Charlotte make changes (using voice commands and voice readouts) in the future, and API keys is a layer of complexity and risk I didn't feel ready to foist upon her, espeically not in the Introduction To Computers session.

Anyway, the LLM understood the constraint and confidently loaded libraries on the browser that did everything locally. I didn't even know of the existence of the library until it loaded them. One point for camp "you can let the AI be resourceful in getting you results."
