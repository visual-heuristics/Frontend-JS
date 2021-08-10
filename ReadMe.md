# Planimation Javascript Frontend

The initial work of Planimation JS Library, and the frontend is waiting to be developed.  

## Features
- Visualise Planimation VFG file
- Visualise the last action of a given plan

## Tech

- [PIXIJS] - The HTML5 Creation Engine
- [RequireJS] - RequireJS is a JavaScript file and module loader

## Run the demo
In the root folder:
```sh
npm install http-server -g
http-server
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

[PIXIJS]: <https://www.pixijs.com/>
[RequireJS]:<https://requirejs.org/>