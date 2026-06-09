---
title: "How to squash git commits"
date_published: "2017-09-23"
tags: ["Tech"]
fav: true
backlinks:
  - slug: "/2017-09-26-git-stash/"
    title: "How to use git stash (and when not to use it)"
  - slug: "/2017-09-30-replace-git-branch-code/"
    title: "How to completely replace git branch code with another branch's code"
  - slug: "/2017-11-03-what-is-git/"
    title: "What is Git?"
ai_summary: "The post explains how to squash multiple Git commits from the command line using interactive rebase, since Git has no direct git squash command. It argues that squashing feature-branch commits into one commit keeps shared history cleaner and makes pull requests easier to review, then concludes that after editing the rebase and commit message, the branch should show a single combined commit."
---

In this short post, I'll demystify the process to squash git commits from the command line. This process is simple if you're using a remote like GitHub, which can be done with the click of a few buttons in the Pull Request UI. This post focuses on squashing commits on the command line.

Note before proceeding: I use Terminal on a Mac and the commands below are based on that.

![shirtless boy hugging a ball trying to squash it](images/vance-osterhout-129608.jpg) 
_Photo by Vance Osterhout on Unsplash_

### Why bother to squash git commits?

Squashing git commits is technique useful for working with teams. Depending on your work style, you might have anywhere between 1 to 50 (or even more?) commits in a local feature branch. If you're working with a team of developers, merging all these commits into `master` branch may not be useful and may make the project's commit history unpleasantly long.

A little more on this. The idea of a feature branch is that it contains code that implements a particular feature. So by the time you are done writing the code and testing it in development, it makes sense to combine (or "squash") all the commits you've made since branching from the upstream branch (eg. `master`) into a single commit.

In the eyes of the project manager, your pull request implements a single feature. Therefore when merged into the deployed branch of the repository, your feature code should appear neatly as a single commit. This keeps the repository's commit history lean and easy to follow, with all the changes to the code base visible in a single commit, which is even nicer when viewed using GitHub's diff UI.

### How to squash git commits

You might find it surprising that there's actually no command called `git squash`. To squash commits, we have to use [`git rebase`](https://git-scm.com/docs/git-rebase) instead.

Let's say you have 3 commits in your `responsive-ui` branch and you want to squash them into a single commit. Here's the sequence of Terminal commands to run, with explanations in between.

```shell
git rebase -i HEAD~3

This will bring up an interactive console in Terminal (that's what the `-i` flag stands for):

pick 3e7bcf6 add bootstrap and grid-ify all html
pick 2e5f39d fix bugs
pick ead1764 clean up for deployment

# Rebase 9d4818a..ead1764 onto 9d4818a (3 command(s))
#
# Commands:
# p, pick = use commit
# r, reword = use commit, but edit the commit message
# e, edit = use commit, but stop for amending
# s, squash = use commit, but meld into previous commit
# f, fixup = like "squash", but discard this commit's log message
# x, exec = run command (the rest of the line) using shell
# d, drop = remove commit
#
# These lines can be re-ordered; they are executed from top to bottom.
#
# If you remove a line here THAT COMMIT WILL BE LOST.
#
# However, if you remove everything, the rebase will be aborted.
#
# Note that empty commits are commented out
```

In the interactive console, which is going to be your default command line editor (mine is [Nano](https://www.nano-editor.org/)), you will need to change all except one of the commits to "squash" instead of "pick":

```shell
pick 3e7bcf6 add bootstrap and grid-ify all html
squash 2e5f39d fix bugs
squash ead1764 clean up for deployment
```

Tip: You can save time by replacing the word "squash" with the letter "s", as in `s 2e5f39d fix bugs`. The result is the same.

When done, exit the interface (for Nano editor it is Ctrl + X, then Y, then Enter). This will save the methods you've decided to rebase each commit on. That is stage 1 of 2 of the interactive rebase. Stage 2 will involve a second interactive console:

```shell
# This is a combination of 3 commits.
# The first commit's message is:
add bootstrap and grid-ify all html

# This is the 2nd commit message:

fix bugs

# This is the 3rd commit message:

clean up for deployment

# Please enter the commit message for your changes. Lines starting
# with '#' will be ignored, and an empty message aborts the commit.
```

In stage 2, you're given the opportunity to edit the commit message for the single remaining commit. I usually prefer to keep my commit message succinct in a single line, so I delete all the other by-now extraneous commit messages:

```shell
# This is a combination of 3 commits.
# The first commit's message is:
add bootstrap and grid-ify all html
```

But before saving, I amend the commit message to reflect the feature that this branch will implement once merged, using the protocol that we use internally in the team:

```shell
# This is a combination of 3 commits.
# The first commit's message is:
feat(UI): add bootstrap v4.0 for responsive grids
```

Exit to save as before. Now when you run `git log`, you should see that the 3 commits in your local feature branch has become one!

Other git-related short tutorials:

- [How to use git stash (and when not to use it)](/2017-09-26-git-stash/)
- [How to completely replace git branch code with another branch's code](/2017-09-30-replace-git-branch-code/)
