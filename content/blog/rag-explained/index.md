---
title: "RAG (Retrieval Augmented Generation) explained"
date_published: "2026-05-26"
date_updated: "2026-05-26"
excerpt: "What retrieval really means, why web search is only one part of it, and why the pipeline matters for useful AI agents."
tags: ["Tech"]
fav: false
creation_duration_minutes:
backlinks:
---

I might as well make it public: I'm interested in FDE roles right now and have been actively applying at a few companies. The interview processes made it clear that even though I've built applications with LLMs, I still have gaps in foundational concepts. You can [build functional, reliable AI apps now without knowing the underlying tech and algorithms](/raising-floor-apps/), until the abstraction leaks and you need to know where the manhole is, climb in with a headlamp, and hopefully know where you're going in the plumbings.

It's in that spirit that the next few posts will be related to foundational AI concepts. Note that I'll be drawing from various sources, but the main one is the [DeepLearning.ai course](https://www.deeplearning.ai/courses/retrieval-augmented-generation).

The best place to start, in my opinion, is RAG (retrieval augmented generation), because it's the most commonly used technique among AI application developers to make AI agents actually useful.

Ok, so what's RAG?

RAG is a technique to give LLMs access to relevant documents so they can generate better responses. Responses here can be a simple reply to a question or a series of code changes in an existing code base.

Is web search RAG? Turns out, no, web search is not RAG, it's not even the R (retrieval), but a sub-component of R called the source of documents or knowledge base.

The retrieval step is actually a **pipeline** that consists of:

1. various sources of documents (knowledge bases - e.g. the web is one live, real-time knowledge base)
2. keyword search algo (searching exact keyword matches)
3. [semantic search algo](/blogs-are-gold-mines-now/) (searching by meaning of words/sentences/documents)
4. metadata filtering (filtering by dates, status, labels, geolocation, etc.)
5. reranking algo to a finalise a set of documents to inject into the LLM with the user prompt (used in the "augment" step)

Without RAG, LLMs will only rely on the user's prompt and its fixed internal weights to generate a response.

With RAG, LLMs will rely on the user's prompt **and a set of highly relevant documents** (a subset of all available documents from the various knowledge bases including the internet) on top of its fixed internal weights to generate a more relevant response.

[Coding agents](/devin-added-search-on-this-blog/) (LLMs on loops), if not for RAG, will do a terrible job at writing code that fits into the established patterns, contracts, idioms, and styles of an existing code base. Customer support agents, if not for RAG, will only frustrate the hell out of users because they will have zero access to the ever-growing but ultimately [private institutional knowledge base](/2021-07-18-8-hard-things-about-providing-high-quality-customer-support/) of the company it is supporting. You get the point.

So RAG is definitely an important technique for AI engineers and FDEs to understand. The pipeline above is the study roadmap.
