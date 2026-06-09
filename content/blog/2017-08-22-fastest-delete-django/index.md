---
title: "Fastest way to bulk delete in Django"
date_published: "2017-08-22"
tags: ["Tech"]
backlinks:
  - slug: "/2017-10-26-optimisation-worth-time-part-1/"
    title: "Optimisation: Is it worth the time? (part 1)"
ai_summary: "The post discusses speeding up bulk deletion of rows in Django for a recommendations table that was slowing down daily dataset processing. It compares raw SQL, Django’s private `_raw_delete()`, and the standard `delete()` method, concluding that raw SQL is fastest, `_raw_delete()` is nearly as fast and more maintainable, while `delete()` is much slower and should be used only when full model-layer behavior is needed."
---

Was faced with an optimisation problem today at work. Our [product](https://askmetisa.com) analyses large datasets every day and as our number of user grew over the last few months, we've had to optimise our algorithm that generates and saves recommendations to our database. Poking around a bit, I noticed the step that deleted rows in our recommendations table was taking a long time to process.

![cheetah running](images/cheetah_min.jpg) 
_Photo by Cara Fuller on Unsplash_

### Time taken for code to run

Before going into the optimisation step, we need to find out which part needs optimising. Here's a neat way to use the built-in `print` statement to find out how long a code block takes to run that I use a lot. This will have to do until I hone my sense of runtime efficiency just by looking at code...

import time

def delete\_recommendations(cutoff\_time):
  """ Delete all old recommendations before cutoff\_time. """
  start = time.time()
  # Code block that does the deletion
  end = time.time()

  print 'delete\_recommendations took {}s'.format(end - start)

# => delete\_recommendations took 1.461352134s

That's the simplest way I know of to identify processes that take a long time to run. I just wrap a `start` and `end` time around any block I suspect to be slow and print the difference.

Now on to deleting rows in the database using Django.

### The fastest: raw SQL

By first principles, nothing beats raw SQL in terms of speed because it operates closest to the database!

To execute raw SQL queries in Django, use the `connection` and `cursor` APIs like this:

from django.db import connection
from app.account.models import Store
from app.recommendations.models import Recommendation

store = Store.objects.get(name='amazon')
recommendations = Recommendation.objects.filter(store=store)
if recommendations.exists():
  cursor = connection.cursor()

  # Raw SQL delete, using params for protection against SQL injection
  cursor.execute("DELETE FROM app\_recommendation WHERE store\_id = %s", \[store.id\])

(In case you're wondering, this obviously isn't our company code. Just an illustration!)

This method was indeed the fastest when I tested it, blazing through 20,000 deletions in about 4 seconds on my Macbook Pro. YMMV. (That means Your Mileage May Vary, I learned it from the cool kids on Reddit recently. Think I'll use it more often now. Handy!)

### The fast and maintainable way: \_raw\_delete()

The second fastest way to bulk delete entries in the database with Django is to use the private method [`_raw_delete`](https://docs.djangoproject.com/en/1.8/_modules/django/db/models/query/). I got this idea when my colleague pointed me to this \[answer on Stack Overflow\][2](https://stackoverflow.com/questions/4867852/how-to-make-django-queryset-bulk-delete-more-efficient).

recommendations = Recommendation.objects.filter(store=store)
if recommendations.exists():
  # Raw delete with the convenience of using Django QuerySet
  recommendations.\_raw\_delete(recommendations.db)

We ended up using this approach because it maintained just the right level of abstraction for us to work with Django. In the raw SQL approach we wrote actual structured query language, which is verbose and more problematically, it meant writing code that would be harder to maintain.

This approach leverages the Django QuerySet ORM, allowing us to write Django QuerySet queries instead of raw SQL. It executed just slightly slower than the raw SQL approach, taking 6 seconds for 20,000 deletions.

One important limitation of using [`_raw_delete`](https://docs.djangoproject.com/en/1.8/_modules/django/db/models/query/) is that it **bypasses the model layer** of Django, so dependent database tables will not be informed ("signalled" is the right term in Django I think). That means if a dependent entry in another table is supposed to be deleted along with this entry, that dependent delete will not be executed.

### The normal way: delete()

If you don't want to bypass the model layer (because you know this deletion affects other tables, for example), the best way is to use Django's [`.delete()`](https://docs.djangoproject.com/en/1.11/ref/models/querysets/#delete) QuerySet method.

recommendations = Recommendation.objects.filter(store=store)
if recommendations.exists():
  # Standard Django delete
  recommendations.delete()

This was the slowest approach. It took about 18 seconds for 20,000 deletions, about 3-4 times slower than the above two approaches.

There are obviously other considerations when deciding which approach works best in a particular scenario. Here I've merely stated the three approaches I've tried to optimise our algorithm.
