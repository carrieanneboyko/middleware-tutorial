# Prerequisites

- We're going to assume you know the basics of Express
- Use version 12.16.2 (latest LTS as of this writing) of node. This is mainly so we can use the async/await syntax for our promises.
- To make requests to our standalone server, we're going to be using REST conventions, and we're going to be using Postman to make those requests manually. Make sure you have Postman installed.
- We're going to be using yarn instead of npm, so make sure you have yarn installed.

## Software

### NeDB

Our database will be NeDB - you can think of it as a very lightweight version of MongoDB, without any of the config overhead. If you've used SQLite before, it's a very similar concept.

This basically allows us to use a database-like structure without going through all the rigamarole of assuming we've set up a database.

(Another cool side effect is that since the NEDB files are only text files, you can add them to a git repo -- like this one -- with wonderful prepopulated data.)

## Getting started

After forking and cloning the file, run:

yarn && yarn setupenv

The first command installs the necessary libraries into node_modules, the second will copy example.env (which we do commit) into .env - which we gitingore. .env usually contains secret files like API tokens. We don't want to commit those.
