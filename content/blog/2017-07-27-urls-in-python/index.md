---
title: "How to add prefix or suffix to image urls in Python"
date_published: "2017-07-27"
tags: ["Tech"]
backlinks:
ai_summary: "The post explains how to add a suffix or prefix to image URL strings in Python using the re module, by matching the file extension and inserting text before it. It notes that suffixes are useful for servers that serve different image sizes, such as Shopify, while prefixes are mentioned as less common and handled by adjusting the regex pattern."
---

To add a suffix to an image url string in Python, you'll need to use the `re` (regular expression) module. We can use regex to identify the file format (eg .jpg or .png) and insert some text just before it.

Adding a suffix to image urls (eg. from `abc.com/img/image.jpg to abc.com/img/image_small.jpg`) can be useful for getting smaller or larger images from a server that supports this handy technique. Shopify is a good [example](https://help.shopify.com/themes/liquid/filters/url-filters#size-parameters) of a company that practices this.

Here's the code:

```py
import re

def add_suffix_to_image_url(image_url, suffix):
  """
  Add suffix (eg. "_large") to image name just before .jpg or .png
  """
  try:
    # Find a match of '.jpg' or '.png'
    index = re.search(r"(\.jpg|\.png)", image_url)
    if not index:
      return image_url
    else:
      # Get zero-based index of the start of the matched term in image_url
      index = index.start()
      # Doctor the string by splitting and rejoining with [:index] and [index:]!
      return image_url[:index] + suffix + image_url[index:]
  except:
    return image_url

add_suffix_to_image_url('https://example.com/image/some-cat-image.jpg', '_large')
#= https://example.com/image/some-cat-image_large.jpg
```

I'm not sure what use cases there might be for adding prefixes. Some cases probably exist but most likely not for image urls (?). In any case, to do that, just tweak the regex pattern:

```py
# The same idea applies to adding prefix - just change the regex pattern
index = re.search(r"(http://|https://)", image_url)

# Use index.end() to get index of end of matched term
index = index.end()
```

Additional notes: - [See it in action on repl](https://repl.it/JlLS) - [Python regex documentation](https://docs.python.org/2/library/re.html)
