# Planimation Javascript Frontend

The initial work of Planimation JS Library, and the frontend is waiting to be developed.  

## Features
- Visualise Planimation VFG file
- Visualise the last action of a given plan

## Tech

- [PIXIJS] - The HTML5 Creation Engine
- [RequireJS] - RequireJS is a JavaScript file and module loader

## Run the demo
Open the working directory with VS code, in the terminal:
```
yarn //or “npm install”
```
This command will automatically install all the packages you need in this project.

Run the demo:
```
npm run start
```
This will open a page on your browser, and you should see a jumping rabbit like this:

 

Now, the development environment is all set up! Start coding😊

Test your code:
```
yarn test  //or “npm test”
```
Open the link in your browser, and you should see a visualisation of block world .

## Development Guide
Currently, only the main logic of the visaulisation part has been developed, and there are lots of other features that can be developed.

For examples:
* Subgoal feature
* Step Control
* Linear animation

When you develop the new features for Planimation JS Libary, please try to modularise it. So it will be easier to maintain the front-end in future. Also, the potential user can use the relevant feature to build their application. Visualise the search tree with Planimation is a good example here.

## Resources
* Pixi JS - https://www.pixijs.com/
* Pixi JS Tutorial - https://github.com/kittykatattack/learningPixi
* Pixi JS Demos - https://pixijs.io/examples/#/demos-basic/container.js
* ReactPixi - https://reactpixi.org/
* React - https://reactjs.org/docs/getting-started.html

[PIXIJS]: <https://www.pixijs.com/>
[RequireJS]:<https://requirejs.org/>