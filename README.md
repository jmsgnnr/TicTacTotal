## Maintenance note (2026)

Pure tic-tac-toe rules live in `assets/scripts/gameEngine.js` (no DOM or npm dependencies). The browser UI adapter is `assets/scripts/gameLogic.js`. Unit tests use the Node built-in test runner.

### Reproducible browser build (isolated toolchain)

The historical root `package.json` / Grunt / Webpack 3 pipeline is **not** used on modern Node (do not run `npm install` at the repo root or Grunt deploy tasks). Instead, install and build only inside `tools/browser-build/`:

```bash
cd tools/browser-build
npm install --ignore-scripts
npm run build
```

From the repo root you can run `npm run build:browser` after the one-time `tools/browser-build` install. On OMEN's Remote Desktop Commander PowerShell, the `npm.ps1` shim currently errors reading `stdin`; use `npm.cmd run build:browser` or the equivalent direct `node tools/browser-build/build.mjs` instead. Both of those commands completed successfully under Node 24. Outputs:

- `public/application.js` — esbuild bundle (jQuery, Bootstrap JS, app modules from `assets/scripts/`)
- `public/application.css` — Dart Sass compile of `assets/styles/index.scss`

`index.html` loads those artifacts. Legacy `public/vendor.js` is left unchanged on disk but is no longer referenced.

**Browser QA:** After the build, run `node --test tests/*.test.cjs` for the game engine, DOM, bundle and CSS. Offline browser acceptance is `node tools/browser-build/browser-smoke.mjs`. It uses an already installed Chrome or Edge when Playwright's bundled Chromium is missing (no browser download required). The browser script blocks offsite requests and verifies a win, draw, restart, invalid/post-game moves, Enter/Space, JavaScript errors and overflow at 1440px and 390px; screenshots are saved outside the Git checkout when the supervising run folder exists. The test exposes the board without authentication because the historical auth API is unavailable. **Live sign-in, New Game, and remote API compatibility remain unverified.** Do not submit auth forms against the historical Heroku API during QA.

Maintenance refactor credit: [@jmsgnnr](https://github.com/jmsgnnr). Source includes game-rule references from the original 2021 README; third-party authors retain their rights. Distributed jQuery/Bootstrap/Popper notices are recorded in [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md).

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

