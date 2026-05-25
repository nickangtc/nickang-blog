---
title: "My first game of Tic Tac Toe!"
date_published: "2016-08-21"
tags: ["Tech"]
backlinks:
---

I think every aspiring programmer gets extremely excited when they create their first game. No, just me? Huh…

It's my first weekend at General Assembly as a web development student, and as a gift, our loving instructors told us to create our first game - the classic Tic Tac Toe.

Present this task to me just a month ago and I would break out in cold sweat. This weekend was different - what a challenge! I savoured every bit of it (pun very much intended).

Here's the pseudo-code to make a game like Tic Tac Toe for the web:

- Create a 9-box square grid in HTML, each doing something when clicked.
- Write a function that…
    - keeps track of turns for two players.
    - adds a "X" or "O" to a box when clicked based on whose turn it was.
    - checks every possible winning combination after every turn is over.
    - updates a sentence displayed in the browser with info about whose turn it is.
    - resets the game to the start state when reset button is clicked.

That's more or less what is needed to put together a game like Tic Tac Toe. It is quite straightforward. Whenever I got stuck while coding, I just used pen and paper to rework the logic and write the code accordingly.

## Meet Blue: my own little AI

There's a second part to the challenge, which is rather open-ended if interpreted by an over-achiever (thankfully I'm not one). It reads, harmlessly:

> Add a simple AI to support one player vs computer mode. Note that randomly selecting a space would count as "simple". Try that and iterate from there.

Though not an over-achieving type, I set out to create the so-called "simple AI". It took me about an hour to write the function that made a random box selection in vanilla JavaScript, and another 2 hours to integrate it into the existing 1-player game. After some restructuring, it worked.

![tic tac toe game gif](images/ic-tac-toe-game20160821223435.gif) 
_A dialogue box pops up to announce the winner (doesn't show up here)_

I witnessed, for the first time, a computer programme that I created playing against me. It was beautiful. I smiled even though I was the only person in the room. A moment to savour!

This is the code that contained the "simple AI", which probably won't make sense to you without seeing the rest of the code:

function blueMove () {
    var randomInt = randomIntFromInterval(1,9);
    while (boardArray.includes(randomInt) === false) {
      randomInt = randomIntFromInterval(1,9);
    }
    var delay = randomIntFromInterval(1000, 3000); 
    setTimeout(function() {
      // Blue makes a random move.
      if (boardArray.includes(randomInt)) {
        var boxId = "box" + randomInt;
        updateTurnDisplay(player1);
        document.getElementById(boxId).classList.add("x");
        boardArray\[boxIndex\[boxId\] - 1\] = "X";
        round++;
        winOrLose();
      }
    }, delay);
  }

Lines 221 to 238 made up just 17 lines of code. With JavaScript, that was enough to make a programme play a game with a user. Just imagine what we can do with 100 lines and greater depth of knowledge!

At this point I can already see that the next step is to write code that makes Blue—yes I named this AI after [the one IBM nerds made](http://www-03.ibm.com/ibm/history/ibm100/us/en/icons/deepblue/) that defeated the world's number 1 chess player in 1997—play defensively. It should be able to block winning moves when a threat is detected (eg. when the opponent is one move away from victory). I haven't quite come up with a way to do that without having to write out every possible threatening situation (when two of the same symbols are next to each other).

Then the logical next step after that is an actual AI that learns the best move. It should play defensively when threatened, and play aggressively to win when it senses no threats. Most importantly it should learn as it plays by having the ability to recognise patterns.

From here, those flags look so far away. Yet they are in sight, albeit a little fuzzy as to make me wonder if they are flags at all. But in that direction I will venture.

Just because it's so fulfilling to have made it here!
