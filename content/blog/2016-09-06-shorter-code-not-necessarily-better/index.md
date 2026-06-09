---
title: "Shorter code is not necessarily better code"
date_published: "2016-09-06"
tags: ["Tech"]
backlinks:
  - slug: "/2017-10-26-optimisation-worth-time-part-1/"
    title: "Optimisation: Is it worth the time? (part 1)"
ai_summary: "The post compares two class code solutions, one shorter and more compact and the other longer but more readable and commented. The author argues that shorter code can use less memory and look neater, but longer code may be better for human understanding and future maintenance, so brevity is not always the best measure of quality. In the specific classroom example, the shorter version is preferred, but the broader conclusion is that clarity can outweigh compactness in real projects."
---

![people smiling in front of pinnacles at duxton](images/20160906-IMG_20160906_123527-1024x768.jpg) 
_Going to lunch_

Here's a real example from class today.

```js
// MY CODE
function urlEncode(url, params) {
    if (params === undefined) {
        return url;
    } else {
        var paramObj = params;
        var formattedParams = [];

        // format each param for url
        for (var k in paramObj) {
            var key = k;
            var val = paramObj[key];
            var string = '&' + key + '=' + val;
            formattedParams.push(string);
        }

        // handle fencepost problem of no '&' for first param
        formattedParams[0] = formattedParams[0].replace('&', ''); // remove & for first string

        // build up return string
        var formattedUrl = url + '?';
        for (var i = 0; i < formattedParams.length; i++) {
            formattedUrl = formattedUrl.concat(formattedParams[i]);
        }
        return formattedUrl;
    }
}

// ONE OF MY CLASSMATES' CODE
function urlEncode(url, params) {
  var tailUrl = "";
  if(params !== undefined) {
    var firstParam = true;
    for(key in params) {
      if(firstParam) {
        tailUrl += "?" + key + "=" + params[key];
        firstParam = false;
      }
      else {
        tailUrl += "&" + key + "=" + params[key];
      }
    }
  }

  return url+tailUrl
}
```

My code is significantly longer than my friend's. To be honest, I also feel like his code is better than mine in many ways. One of the most significant is the fact that it is more succinct and doesn't declare any non-crucial variables. His code gets right down to business, and every line knows its place. This can be chalked up to my friend's great analytical mind and prior experience in coding similar things.

Broken down, here are the ways that the second approach (my classmate's) beats the first (mine): \* uses less computer memory because less variables are declared \* looks neater overall \* more compact code

But as you're probably guessing, I'm alluding to the fact that sometimes there are benefits to writing more lines. I consider my approach less refined than my classmate's, but it has its strengths too: \* appears more readable and sequential \* more comments that guide others who might read my code

The first point is important to consider when you think that there might be others who will read, edit, or maintain your code in the future. It's beyond courtesy - it is a matter of practicality.

The succinct, shorter way might be optimised for computational efficiency, but the longer, slightly more verbose way is optimised for human-comprehensibility. As long as the latter doesn't hog resources like a blackhole, I'd consider it better if it is used in a project meant for deployment for actual use.

In our case today though, since we weren't trying to write anything that would be read by anyone other than ourselves, I'd crown his code the winner (between the two). But shorter isn't always better.
