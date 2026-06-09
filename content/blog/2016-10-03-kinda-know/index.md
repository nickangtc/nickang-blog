---
tags: ["Personal"]
title: "Kinda knowing Ruby on Rails"
date_published: "2016-10-03"
backlinks:
ai_summary: "The post reflects on whether someone learning Ruby on Rails needs to understand every detail or can safely “kind of know” the framework and rely on its conventions. The author weighs the convenience of trusting Rails against the risks of customization and debugging, and concludes that a balanced approach is best: assess each new feature or problem to decide whether it needs deeper study or can be left to Rails’ built-in magic."
---

![laptop with spectacles on it](images/photo-1456996290209-634ae6b8be31-1024x683.jpeg)

Is it enough to kinda know something? Like coding, for example?

More specifically, I'm wondering whether it's ever a cause for concern to know _just enough_ about something to be able to make use of it. You see, Ruby on Rails is great but it really gets me _so_ confused some times…

And I'm thinking to myself: Do I really need to know _how_ to set it up? If I'm not wrong, Rails was designed to be plug-and-play, to take the chore out of setting up and configuring the server-side of a web app. So that means it should be ok to not look under the hood often, right?

Right now, I wish I were only asking these questions rhetorically, but I'm not. How should I go about thinking about this (and invest time accordingly)?

## Option 1: Just trust that it works and use the templates

What's the worst that could happen if I embrace the Rails philosophy of "convention over configuration"?

For one, I think it would mean spending more time researching Stack Overflow whenever a customisation is needed. It may at times also be quite difficult to set up particular segments of the server-side code - with many-to-many database table associations, for example. I may end up having to **spend many hours for first-time setups** without actually knowing what's going on.

Blindly following the convention that the Rails developers set out is also **problematic when it comes to troubleshooting**. What if something breaks? I could google the error messages and do a trial-error-elimination until I arrive at a satisfactory solution, but that often doesn't give me the assurance I'm looking for. After all, how can I feel confident that something is going to work if I don't know how it's supposed to work?

Ok, let's take a step back and consider the pluses of strict adherence to the rules.

The first and most noticeable benefit for me would be the **time saved from not having to understand the nitty gritty**, not having to go line-by-line to grasp every little quirk that is Ruby on Rails and just trust the system. That is liberating.

In fact, ever since we were introduced to Rails last week, I've said a few times that **Rails is what I had always expected server setup and configuration to be like before I became a developer**. It's supposed to be the answer to the minimalistic [piece-me-lego-by-lego approach of Node.js](/2016-09-19-nodejs-server-nightmare/), which is very difficult to grasp but in comparison (and in hindsight), relatively straightforward.

Sticking to the rules is probably also going to be **less stressful most of the time** (again, except when troubleshooting). All I need to do is google for the right template or Gem that generates that template for me and the server should be up and doing its thing in a short time.

Ok, let's do a stock take.

- (-) First time setup may take a while. Customisation _will_.
- (-) Troubleshooting when something breaks will be a big pain in the ass.
- (+) Save time from not trying to understand all the Magick under the hood.
- (+) Reusing templates will make coding less stressful most of the time.

Now, what would happen if I took a more balanced approach?

## Option 2: Judge whether something ought to be understood and act accordingly

A more balanced approach would involve a **constant assessment of the obstacle ahead**, rather than always adopting a "refer to the manual" mentality. Off the bat I have to say that this already sounds more appealing, though it probably involves more work.

What constantly judging the situation means is to approach each obstacle with an open mind. Is not knowing about X potentially **going to jeopardise the reliability of my app** and cause it to crash unexpectedly? Or is it most likely okay to just "let Rails do its magic"?

Here's an example:

```ruby
class RecipesController < ApplicationController
    def show
    @recipe = Recipe.find(params[:id])
    end
… 
end
```

Is it important to know how Recipe.find(params\[:id\]) works? I can kind of guess that `find(params[:id])` queries the database based on the `id` parameter, and the result that comes back would be a particular entry in the Recipe table. I think in a case like this, it's fine to trust that Rails' got our back and move on to sweat the bigger things.

What about this?

```ruby
# in app/views/recipes/new.html.erb
<%= form_for @recipe do |f| %>
  <%= f.label :name %>:
  <%= f.text_field :name %><br />

  <%= f.label "Belongs to" %>:
  <%= f.text_field :course_id %><br />

  <%= f.collection_check_boxes :ingredient_ids, @ingredients, :id, :name %>
  <%= f.submit %>

<% end %>
```

Again, I can make a calculated guess that `form_for` is a special helper tool provided by Ruby on Rails to make life easier (it is), and `label` and `text_field` just generate `<label>` and `<input>` elements respectively.

But with `f.collection_check_boxes x, y, a, b`, I'm starting to feel lost. Forget the "how does it work?" path of questioning - I'm asking myself "what does that do?", and I can't seem to arrive at any answers I'm confident about.

I did a quick google search and found out what it's supposed to do and where I'm supposed to be writing (copy-pasting) that line of code. It worked!

But oh, wait, isn't this supposed to work in the edit.html.erb file too? The exact form without that last part with the collection worked superbly, why is this not working? Man…

So here's a case that is actually quite tricky. At first it looked like a straightforward case of using the right syntax to make Rails do something magical… until it's not. There's probably many situations down the road with Rails (for someone new to it) that are like this which requires **a second appraisal to accurately judge if more time should be spent peeking behind the curtains**. In this case, I'm going to go the full kilometre and read the documentation.

## What's the conclusion?

After considering the two (of many) possible options, I think I'll choose option 2. So every time I come across something new in Rails, I'll stop and ask if it's something I need to spend time getting to know, or if it will be fine to just "kinda know" what's going on and let Rails do its magic.

Sounds like I picked the approach that is more troublesome than the lazy let-Rails-do-its-thing approach. I'm counting on the time and frustration saved from banging into less walls to make up for it!

(image: [Aliis Sinisalu](https://unsplash.com/@aliissinisalu)
