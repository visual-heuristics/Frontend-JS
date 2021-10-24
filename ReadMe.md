# COMP900082 - PL-Boxjelly. Project: Planimation

planimation is a modular and extensible open source framework to visualize sequential solutions of planning problems specified in PDDL. planimation has a preliminary declarative PDDL-like animation profile specification, expressive enough to synthesise animations of arbitrary initial states and goals of a benchmark with just a single profile.(https://planimation.github.io/documentation/).


# Table of Contents
[1.0 Project Overview](#1.0)

[2.0 Deployment](#2.0)
    
[3.0 Development Environment](#3.0)

[4.0 Using the system](#4.0)
 
[5.0 Architecture and Design](#5.0)

[6.0 Change Log](#6.0)

[7.0 Demo](#7.0)

<h1 id="1.0"> 1.0 Project Overview </h1>

## Background

Planimation is an openSource framework to visualise sequential solutions of planning problems specified in PDDL. The framework was built by a team of University of Melbourne students in the context of the course SWEN90013 and under the lead of Professor Nir Lipovetzky and it has been continually supported by students and contributors. The project has important awards and recognitions.

The planimation goals are:

* help to debug PDDL code for Online PDDL Editor users 

* increases user understanding of planning problems

* showing planning solutions to non-technical audiences

The system uses a domain PDDL script, a problem PDDL script and a Animation profile script to produce visualisation.

## Goal for This Project

The main goal is:
* Improve project efficiency, maintainability and extendability of Planimation software

The specific goals are:
* replace the current frontend programed in C# with the Unity engine, for a Javascript and PixiJS framework

* decrease the loading times produced by the Unity engine

* maintaining its current features

* integrate with current development tools (Online pddl Editor plugin)

* develop a new plugin for Visual Studio Code

<h1 id="2.0"> 2.0 Deployment </h1>

## Overview 

Before building your development environment, you’ll need:
A code editor
VS Code is suggested. Download link

Recommended extensions: Jest; GitLens;tslint;

WebStorm is an alternative JavaScript IDE for frontend development.

Git
Check if you installed Git:

```
git --version
```
Please refer to https://docs.github.com/en/get-started/quickstart/set-up-git to see the installment and basic usage of Git.

### Node
Please follow the instructions and download Node.js to your system. https://nodejs.org/en/

Recommended version: 14.17.5. Npm is the package manager for the Node JavaScript It is already installed along with Node.

Now you can check the versions:
```
node -v
v14.17.5
npm -v
6.14.14
```

### Install yarn:

```
npm install -g yarn
```

### Building development environment:
Clone the repository from GitHub:
```
git clone https://github.com/visual-heuristics/frontend-js
```
### It’s good if you could setup your username and email address for the repository, so the other team members will have a clear idea the contributors of branches and codes on GitHub.

```
git config user.name "Mona Lisa"
 
git config user.email "email@example.com"
```
## Install frontend development environment:
In the current working directory to the local repository:

Open the working directory with VS code, in the terminal:
```
yarn //or “npm install”
```
This command will automatically install all the packages you need in this project.

### Run the project:
```
npm run start
```
This will open a page on your browser, and you should see a jumping rabbit like this:

 

Now, the development environment is all set up! Start coding😊

### Test your code:
```
yarn test  //or “npm test” or testing in Jest
./node_modules/.bin/cypress open // for testing in Cypress
```
Open the link in your browser, and you should see a visualisation of block world .


<h1 id="3.0"> 3.0 Development Environment</h1>

### Technical Environment

https://confluence.cis.unimelb.edu.au:8443/display/VH/Technical+Environment

### Non-technical Environment

https://confluence.cis.unimelb.edu.au:8443/display/VH/Non-technical+Environment

### Development Environment Setup

https://confluence.cis.unimelb.edu.au:8443/display/VH/Development+Environment+Setup


<h1 id="4.0"> 4.0 Using the system </h1>

## 4.1. Project Homepage:

In coordinator homepage: Shows the four sections of the project.
https://confluence.cis.unimelb.edu.au:8443/display/VH/Design+Notebook 

### 4.1.1 Go to PDDL file upload page

Go to the first page to generate visualisation using PDDL files.

### 4.1.2 Go to VFG file upload page

Go to the second page to generate visualisation using VFG files.

### 4.1.3 Check document for the project

Check the documentation for Planimation

### 4.1.4 Check demo video for the project

Check the Demo Video for Planimation


## 4.2. PDDL file upload page

On this page, you need to upload 3 PDDL file to the PDDL editor server, and it will lead you to the visualization page with a generated vfg file.

## 4.3. VFG file upload page

On this page, you need to upload a single vfg file for animation generating. It will lead you to the visualization page once your .vfg file is accepted.

## 4.4. Document Page

On document page, you can access the resources for how to use planimation and how to deploy it on your computer.

## 4.5. Demo Page

In the demo page we have a youtube video which would teach you how does planimation works and how we deployed it.

## 4.6. Visualization Page

This is the main functionality page for the project. It will show the animation generated from the VFG file on pages 1 and page 2. On this page, your could de the following operation.

### 4.6.1 Check the stage list on the left side of the page
On the left, you will see a list of all the stages for this problem. And you can check the visualization for this stage by clicking on it.

### 4.6.2 Check the subgoal list on the right side of the page
On the right, you will see a list of all the subgoal conditions for this problem. And you can check the visualization for the condition where this sub goal is satisfied by clicking on that step.

### 4.6.3 Operation on visualization
In the middle of the page, you will see the visualization sections which will look different depends on your problem. By clicking on the control button in this section, you can easily pause, play, reset, speed up, slow down and move to the pre/next step.


<h1 id="5.0"> 5.0 Architecture and Design </h1>

### Architecture Model

https://confluence.cis.unimelb.edu.au:8443/display/VH/Architecture

### Prototype Design and Interactive Diagram

https://confluence.cis.unimelb.edu.au:8443/display/VH/Prototype+Design+and+Interactive+Diagram

### System Architecture Diagram

https://confluence.cis.unimelb.edu.au:8443/display/VH/System+Architecture+Diagram

### Design Notebook

https://confluence.cis.unimelb.edu.au:8443/display/VH/Design+Notebook

### Operational Concept Documents

https://confluence.cis.unimelb.edu.au:8443/display/VH/Operational+Concept+Documents


### Directory structure and key files and components

https://confluence.cis.unimelb.edu.au:8443/display/VH/Developer+Information+Frontend


<h1 id="6.0"> 6.0 Change Log </h1> 


### 19/08/2021
* Fork from original repository, initial commits

### 22/08/2021
* Init react framework

### 23/08/2021
* Update Jest

### 25/08/2021
* Update .travis.yml; Add template

### 06/09/2021
* Updated global styles

### 11/09/2021
* Add drag&drop function
* Animation bugs fixed

### 15/09/2021
* Add animation playing/pausing function

### 18/09/2021
* Updated Confluence

### 26/09/2021
* Added speed control for animation

### 01/10/2021
* Added function of reading vfg file

### 03/10/2021
* Interact with backend

### 06/10/2021
* Added export file function

### 13/10/2021
* Updated Animation display

### 20/10/2021
* Modified styles for pages

### 21/10/2021
* Updated tests

<h1 id="7.0"> 7.0 Demo</h1>

https://morning-ridge-78538.herokuapp.com/
