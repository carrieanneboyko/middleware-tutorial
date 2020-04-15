# Prerequisites

- We're going to assume you know the basics of Express
- You'll need node v12.16.2 or later
- You'll need to have Postman installed
- You'll need to have yarn installed

## Lesson 1
### A world without middleware

Slide 1

You can start a webserver in node without any external libraries at all, but it is difficult to read, hard to maintain, and not very flexible.  That's why libraries like Express.js were created - to provide easy to setup and configure webservers in node.  

You already know the basics of Express, so some of this might be material you've already covered, but we're going to look at it in a new way.  

Slide 2

Okay, so what do we need.  Well, first, you're gonna want the latest Node LTS.  I made this with v12.16.2, but anything after that should be fine.  You'll need to fork and clone the repo I've set up for this slide deck so that you can follow along. 

Before we begin, I'd like you to talk a look at this repository's lesson-01 branch.  Most of this stuff you won't be touching - you'll mainly be touching only files in the /src/server directory, but it's good to kind of show you what we've got working for us.  We have a database that we're going to use called NeDB. It is a file-based "database lite" system which is to MongoDB what SQLite is to SQL.  I've set it up here so that we can use it to store information without necessarily having to go through the whole rigamarole of setting up Mongo on our local systems.  Plus, it's file based, so I can save it with the rest of the repository, and change it as we need to.  

I'd also like to mention that I'm a huge fan of Typescript and _especially with backend code_ I think that you should always use Typescript for any professional or serious projects.  We're not using Typescript here though - so we can focus on learning Express, rather than having to learn Typescript at the same time.  (But seriously though.  Typescript. _Typescript._ It is _so awesome_.)

Before we spin this puppy up, I want to give you a little tour of our application structure.

- /data - This directory will contain our databases in file format. Remember that these *will* be committed to git, by design. 
- /lib - When you start running builds, babel will transpile the code from our src to lib directory. 
- /src - This is where the source code lives
- /src/database - This is where the code lives for our program interfacing with the database.  Don't worry too much about this. 
- /src/server - This is where the magic happens, and where we'll be doing most of our editing.  

So, let's get started.  

On the command line, just type: 'git checkout -b develop' from inside of the master branch.  That will create a copy of the master branch to a new branch, develop, which you'll be doing the heavy lifting in.  

Then run yarn in the console to install our dependencies, and "yarn setupenv" after that's done to copy the example.env file into a local .env file.  (Why not just have .env in the repo?  Well, .env files can contain things like secret API tokens, passwords, or even embarassing teenage poetry, so we want to make sure that .env is gitignored so that we don't accidentally commit it for everyone to see.)

Slide 3

So - what is middleware?  Before I answer that, I'd like to show you a world without middleware.  It is a cold and bleak world. One which cannot be xplained, but only experienced. 

On your command line, type in "yarn dev"

You should see something like this: 

Slide 4

Okay, we have a server up.  Great.  Open up your web browser, though and go to localhost:3000.

Slide 5

Womp womp... 

Well, obviously.  Let's look at /src/server/index.js, and our launchServer function. 

What we're doing here is launching the server... we're just not telling the server to actually _do_ anything.  So when we go to the root route - that is, '/' - it won't actually do anything but show the error.  

Slide 6

All we've told the server to do is to recieve requests, and display the result - in this case, an error that it shows whenever there's an invalid GET request.  In order to make it actually _do_ something, there needs to be instructions in-between when the server gets the request and when the server resolves the request.  In fact, you could say that we need to give it a way to do something in the _middle_ of request and resolution.  Some bit of _software_ we can put in the _middle_ of those two things.  

You're getting it now, right? Let's crack on. 

---