## Maintenance note (2026)

Pure tic-tac-toe rules live in `assets/scripts/gameEngine.js` (no DOM or npm dependencies). The browser UI adapter is `assets/scripts/gameLogic.js`. Unit tests use Node built-in test runner only; the legacy Webpack 3 browser bundle has **not** been re-run or validated in this maintenance pass.

Run unit tests:

```bash
npm run test:unit
```

Maintenance refactor credit: [@jmsgnnr](https://github.com/jmsgnnr). Source includes game-rule references from the original 2021 README; third-party authors retain their rights.

## Functions


## Styles
CSS

## Technologies used 
1. HTML
2. CSS
3. Javascript
4. Jquery
5. Ajax
6. Bootstrap 

## Development process
As far as planning, I was initially thinking about how to use a grid in order to style my tic tac toe board.
I understood labeling each box and making them equal size, would make a numeric value assigned to each box I had to iterate through.
From there, I was stuck , I delved into some resources after trying to write a huge if/else statement, and realized labeling the winning conditions as one array,
I could condense my code easier. Youtube resources and my notes were necessary to complete these tasks. Youtube spifically for my game board, which was much easier to understand by running gamelogic as one function and exporting that, instead of exporting each individual function like I did in the study lessons. Once the game logic was locked down, I used css techniques such as shadowbox in order to put a creative flair on my working game container.  


youtube resource # 1 - https://www.youtube.com/watch?v=Rzhcb4M9-0Q
youtube resource # 2 - https://www.youtube.com/watch?v=P2TcQ3h0ipQ

## Unsolved problems

Unsolved problems would be modifying the code I learned , and implementing it into up to date JQuery syntax. I also deleted all my original psuedocode, so definetely keeping psudocode for other developers, as well as working on a more consistent schedule/ adding my commits and pushes more often. Editing the CSS to have a couple more static functions, as well as implementing some symbols into the game board would be some things I'd be interested in adding. 



## Wireframes/User stories

Frame - https://files.slack.com/files-pri/T0351JZQ0-F01GEEXQENP/image_from_ios.jpg

User

1.Sign up


2. Sign in

3 . Log in

4. Change Password

5. New Game

6 Game Play Functionality

7. Reset Game 

