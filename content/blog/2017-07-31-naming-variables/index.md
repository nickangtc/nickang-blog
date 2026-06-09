---
title: "Naming variables well"
date_published: "2017-07-31"
tags: ["Tech"]
backlinks:
ai_summary: "The post argues that variable names should make a program’s intent immediately clear, using a Django recommender system example where a variable like `use_sku` is too ambiguous to understand without digging through the code. It recommends renaming such variables to reflect their meaning and adding docstrings to classes and methods so future readers can understand the code’s purpose and dependencies more quickly."
---

Let's talk about naming variables.

Today I saw something like this in the code base at work. No I'm not sharing the actual code but it's a good enough representation:

```py
import pandas

class RecommenderUtility(object):
  @staticmethod
  def get_recommendations_related_data(store):
    use_sku = False

    products = Product.objects.filter(store=store)
    customers = Customer.objects.filter(store=store)

    df_products = pandas.DataFrame(products)
    df_customers = pandas.DataFrame(customers)

    # ...

    # Imagine some_condition = some long comparison expression
    if (some_condition):
      use_sku = True

    return df_products, df_customers, use_sku

class Recommender(object):
  def __init__(self, store):
    self.store = store
    self.df_products, self.df_customers, self.use_sku = RecommenderUtility.get_recommendations_related_data(self.store)

  def generate_recommendations(self):
    df_user_recommendations = self._get_user_recommendations()
    df_bestseller_recommendations = self._get_bestseller_recommendations()

    return df_user_recommendations, df_bestseller_recommendations

  def _get_user_recommendations(self):
    if self.use_sku:
      # ...
    else:
      # ...

# Init class and generate recommendations
store = Store.objects.get(name='spiderman_photos')   # (1)
recommender = Recommender(store)                     # (2)

# (3)
df_user_recommendations, df_bestseller_recommendations = recommender.generate_recommendations()
```

So the code does something like this, in order:

1. Get Store object with name "spiderman\_photos" using QuerySet (Django's built-in Object-Relational Mapper or ORM)
2. Instantiate `Recommender` class and store in `recommender` variable
3. Call `generate_recommendations` method to generate recommendations for the specific store

But here is a question. Imagine you are tasked to find out why some recommendations are coming out funny and you had to examine this code in detail for the first time. Can you tell what `use_sku` is for? What data type do you expect it to be, and what information do you expect it to represent?

A quick primer on "SKU" - it is an acronym for Stock Keeping Unit, which is the basic unit for keeping track of inventory in a typical shop (traditional and e-commerce). Specific to this case we are looking at an e-commerce store, which is probably the biggest use case for recommender systems nowadays.

When I first saw this in the code base and had to troubleshoot the problem without any helpful class and method docstrings to rely on, I had a few questions:

- Can an e-commerce store use anything _besides_ `sku` to keep track of inventory? `product_id` perhaps?
- Since a conditional statement in `get_recommendations_related_data` method changed `use_sku` to `True`, I can assume the value of `use_sku` is dependent on data in the database. But what is it based on exactly?
- Are other methods in the `Recommender` class also similarly dependent on the `use_sku` variable (which at this point would serve more like a flag for "this store uses SKU")?

These were the questions I had to ask myself because the answers were _implicit_, as opposed to explicit, in the code. It was my job to follow the trail and understand what `use_sku` is really trying to represent and its importance in this class.

But this should not be the case! The **onus of clarity and ease of code comprehension should lie strictly in the hands of the programmer who is writing the code**, because that person knows the intent of every variable, statement, and expression the clearest. Every subsequent reader of the code will have to deduce the original programmer's intent, unless that programmer takes care to leave signposts, like class and method docstrings and short comments.

**Improvement 1: Rename the variable to make sense on first look**

Here is an example of an improvement that is relatively easy to implement and can potentially save a lot of time from deduction.

```py
# Instead of
use_sku = True

# How about something like
store_uses_sku = True
```

Ambiguity is enemy number one. Leave no room for different interpretations of what a variable is supposed to do if you can help it!

**Improvement 2: Add docstrings to every class and method**

Another improvement that can be made with almost no additional effort is writing docstrings. Docstrings are basically multiline comments that appear directly below the `def` or `class` declarations in Python. Practitioners of various programming languages advocate different ways of doing this, but I really like Python docstrings - they are systematic, easy on the eyes (those """), and they even have built-in support even though I don't personally use it (you can call `print my_method.__doc__`).

```py
class RecommenderUtility(object):
  """
  Execute common tasks needed for Recommender system.
  """
  # ...

  @staticmethod
  def get_recommendations_related_data(store):
    """
    Query database and return data from tables relevant to creating recommendations.
    Relevant tables: Product, Customer.

    Return Tuple (df_products, df_customers, use_sku):
      DataFrame df_products: products dataframe
      DataFrame df_customers: customers dataframe
      Boolean store_uses_sku: flag indicating whether the store uses SKU as primary id for products
    """
    # ...
```

There are definitely more ways to improve on this. What other low hanging fruits have I missed?
