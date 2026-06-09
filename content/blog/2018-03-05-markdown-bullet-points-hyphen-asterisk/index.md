---
tags: ["Personal"]
title: "Markdown bullet points - hyphen or asterisk?"
date_published: "2018-03-05"
date_updated: "2022-12-07"
backlinks:
ai_summary: "The post discusses whether Markdown bullet lists should use hyphens or asterisks, and argues that asterisks are preferable because they are less likely to appear in normal text and are easier to select and convert in editors like VS Code. It concludes that while both work, asterisks are the more practical choice for the author’s workflow, especially when changing bulleted lists into numbered lists."
---

Markdown is amazing. It's like HTML but much, much more readable and less work. But some things can get confusing, especially if there is more than one way to do the same thing. Bullet points--or unordered lists if you're a web developer--are one of those things.

So which should you use to create lists in Markdown - hyphen or asterisk?

I've preferred to use the hyphen `-` because visually they resemble the kind of bullets that I'd write by hand on paper. But I just realised that the asterisk `*` has one slight advantage over hyphens.

The asterisk is less often used in the English language. In fact, it's hardly ever used at all.

Scarce usage is the reason why "TK" is so commonly used by the editorial world to indicate "to come", or an unfinished sentence. Nowhere else in the English language will you see these two letters side by side!

Since `*` is much less often used than `-` in a markdown file, I now prefer using that because it allows me to do quick multi-selection like this:

![asterisk bullet point converts easily to numbered list with multiselection](./images/asterisks-bullet-markdown-success.gif)

Otherwise, if the same list were to be bulleted using `-` hyphens, I would face this problem:

![hyphen bullet point fails because hyphens occur regularly in english text](./images/hyphen-markdown-bullet-fail.gif)

I know it's not a frequent use case, but changing a list from unordered (bulleted) to ordered (numbered) comes up just enough to give preferential treatment!

**Tool note**: In case you're not familiar with the tool I'm using, it's Visual Studios Code - an editor designed for programmers to work with code. But for this "multiselect" functionality alone, it might be worth downloading as a writer. It's [free to download](https://code.visualstudio.com/download) from Microsoft. On a Mac, you can do multi-selection by highlighting the text you want to multi-select and hitting `Command` + `D` as many times as you want to select more.

---

*7 Dec 2022 edit: Thank you Nikita Iashchenko for pointing out to me that this page had a broken gif!*
