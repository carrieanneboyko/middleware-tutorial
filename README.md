Here's the slide deck:

https://slides.com/brianboyko/express-middleware

# Prerequisites

- We're going to assume you know the basics of Express
- You'll need node v12.16.2 or later
- You'll need to have yarn installed

## Lesson 1
### A world without middleware

Slide 1

You can start a webserver in node without any external libraries at all, but it is difficult to read, hard to maintain, and not very flexible.  That's why libraries like Express.js were created - to provide easy to setup and configure webservers in node.  

You already know the basics of Express, so some of this might be material you've already covered, but we're going to look at it in a new way.  

Slide 2

Okay, so what do we need.  Well, first, you're gonna want the latest Node LTS.  I made this with v12.16.2, but anything after that should be fine.  You'll need to fork and clone the repo I've set up for this slide deck so that you can follow along. 

I'd also like to mention that I'm a huge fan of Typescript and _especially with backend code_ I think that you should always use Typescript for any professional or serious projects.  We're not using Typescript here though - so we can focus on learning Express, rather than having to learn Typescript at the same time.  (But seriously though.  Typescript. _Typescript._ It is _so awesome_.)

Before we spin this puppy up, I want to give you a little tour of our application structure.

- /lib - When you start running builds, babel will transpile the code from our src to lib directory. 
- /src - This is where the source code lives
- /src/server - This is where the magic happens, and where we'll be doing most of our editing.  


So, let's get started.  

On the command line, just type: 'git checkout -b develop' from inside of the master branch.  That will create a copy of the master branch to a new branch, develop, which you'll be doing the heavy lifting in.  This is sort of a sandbox playground for you to play along with, as well as a sort of template so you can experiment after this session. 

Then run yarn in the console to install our dependencies, and "yarn setupenv" after that's done to copy the example.env file into a local .env file.  (Why not just have .env in the repo?  Well, .env files can contain things like secret API tokens, passwords, or even embarassing teenage poetry, so we want to make sure that .env is gitignored so that we don't accidentally commit it for everyone to see.)

Slide 3

So - what is middleware?  Before I answer that, I'd like to show you a world without middleware.  It is a cold and bleak world. One which cannot be explained, but only experienced. 

On your command line, type in "yarn dev"

You should see something like this: 

Okay, we have a server up.  Great.  Open up your web browser, though and go to localhost:3000.

Slide 4

Womp womp... 

Well, obviously.  Let's look at /src/server/index.js, and our launchServer function. 

What we're doing here is launching the server... we're just not telling the server to actually _do_ anything.  So when we go to the root route - that is, '/' - it won't actually do anything but show the error.  

Slide 5

All we've told the server to do is to recieve requests, and display the result - in this case, an error that it shows whenever there's an invalid GET request.  In order to make it actually _do_ something, there needs to be instructions in-between when the server gets the request and when the server resolves the request.  In fact, you could say that we need to give it a way to do something in the _middle_ of request and resolution.  Some bit of _software_ we can put in the _middle_ of those two things.  

You're getting it now, right? Let's crack on. 

---

Slide 6

When we talk about Express middleware, we're really talking about a series of functions that basically chain together.

Each of these functions gets three parameters: 

The request object -- which is created by the listener when it recieves a request.  

They also get a response object -- basically, a set of data and methods for how the server should respond to the request. 

Finally, they get a next callback - which lets the middleware know that it should call the next bit of middleware in the chain because we're done with this piece of middleware. (A lot of middleware functions are asynchronous - like looking up info from a database, or grabbing data from an external API, or doing a really thorny algorithm, so it makes sense that it would use a callback here.)

Inside a middleware function, you can:
* Execute any code
* Make changes to the request and response objects
* And you can either call the next middleware function in the stack OR end the request-response cycle. 
  * If the current middleware function doesn't end the cycle, it has to call the next() function, otherwise the response will hang. 

Slide 7 

Here's a simple middleware function that we can write together.  

Create a new file: 
src/server/middleware/simpleLogger.js

>> Exercise <<

Now, import that simpleLogger middleware into your server index.js file, somewhere AFTER the app is started on line 4, and somewhere BEFORE we return the server from app.listen on line 6.

Let's shut down the server with a simple control-C, and then restart it with yarn dev

Now, I want you to reload localhost:3000 in your browser. 

Nothing's going to be different in the browser, but if you look in the console where you started the server, you'll see something like this:

Slide 8

Request Type: GET received at 1587070701458

Hit reload a bunch of times and it'll log each and every time. Ain't that cool? 

Slide 9

What we wrote was "Application Level Middleware" - that is, middleware bound to the app object created by express.  

This is done by using "app.use" or by one of the method methods, like app.get or app.post.  The main difference is that app.use executes on every request, while the method method executes only when the user is using that method. 

There's also another parameter as well, the application path. 

Slide 10

So, we have this logger which executes on every request.

You'll notice that if you browse to say, localhost:3000/foo, or localhost:3000/bar it'll still execute.  That's because just like we haven't defined a method with app.use, we also haven't defined a path.  

If we want a certain piece of middleware to execute only conditionally - usually when a user accesses a specific endpoint with a specific method - like "GET"ing a webpage, or "POST"ing data - we need to define that path. 

To do this, both app.use and the method methods take a first parameter - a string that defines the path.  

So, let's start by sending the classic "Hello World!" to our users. 

All we'll be doing is sending the string, "Hello World!" when a user hits the "/hello-world" endpoint.  

But we want it specifically to happen only if: we recieve a GET request - AND they hit the hello-world endpoint.  

This is pretty simple, as far as endpoints go, so I don't think we need to create a seperate file for this.  Just put it right into your server itself. I mean, this is all javascript, so you could do it a number of ways.  You could create a seperate middleware file, like we did with simpleLogger, and import that, or you could create a function that takes app as a parameter and adds the endpoint, or a number of different ways.  To keep things simple, though, for right now, let's just put it right into src/server/index.js

The server should restart when you save it - and browse to localhost:3000/hello-world and - voila. 

When your server starts to get complicated, you're going to want to think more about how to keep your code loosely coupled and tightly cohesive.  That is - you're going to want to think: Do I want to keep my route methods in the same place?  Do I want to just have them all in the server file?  What if, for example, I had both authenticated and non-authenticated routes?  Do I want them in the same file? 

Slide 12

Now I'm going to assume that most of you are thinking: "Whoa, Brian.  This is a bit basic, isn't it?  Wasn't this all covered when we were introduced to Express earlier in the front-end-to-back-end-course?  We already know how to set up a Hello World server, and if we didn't - there's a tutorial on it on the Express site. 

Well... yes, but there's a reason I dipped back into the very basics.  That was to illustrate that at the very core of express is the idea that _everything is middleware_.  Middleware to handle paths, middleware to access databases, to authenticate, to add features, all of it -- it all follows this basic pattern -- get a request, do something, and either end with a response or go to the next middleware. 

When you import a third party express library like bodyParser or morgan or cors, which enable you to do more things with your Express server, they all follow this same pattern.  

Slide 13

So we could go over the types of middleware here: application middleware - what we've been writing.  

There's also router middleware - really complicated websites might have really tough paths to follow and sometimes it helps to break those paths up into smaller routers - for example, something like getting a photo on flickr is https://flickr.com/{user id}/{picture id}/in/{photolist information}/ 

But for the most part, using router middleware is exactly the same as using application middleware - same methods and everything.  

There's built-in middleware. Express has express.static for serving static assets such as HTML files, images, etc.  express.json parses incoming requests with JSON payloads.  And express.urlencoded parses incoming requests with URL-encoded payloads.  

Error handling middleware is a special case - and we'll skip that for right now. 

And there's third party middleware - imported middlewares that you can use in your application from third party libraries.  Loggers, parsers, cors, and authentication, for example.  

So - about those special types... I'm just going to quickly go over the basics: 

Slide 14

So, error handling middleware is for when things go a little bit oopsy doodle.  This is a simple example, when something throws an error, handle it by console logging the stacktrace, and then send a message saying that something broke with a 500 error.  

Note that unlike the other middleware - this takes four, not three, arguments - the first argument being, of course, 'err'.  

Also, you want to make sure you're defining error handling middlware AFTER all your other app.use() and other route calls.  

But what would cause an error to be thrown, for example? 

Slide 15

Well, this is one - let's say that you're trying to read a file, but it doesn't exist.  Pass the error to the next() callback as a parameter. If next is passed *any* parameter other than the string "route", express will regard the current request as being an error and will skip to the error handling middleware. 

Slide 16

That brings us to third party middlewares.  Most of those are actually maintained by the express.js team.  But here are a few examples: body-parser, cors, morgan, passport, session, timeout... etc. 

Slide 17

Getting close to the end now.  

Okay, remember how I said that middleware is a chain?  As it turns out, a particular path can have more than one route.  It will execute the first path defined first, then the second. 

In this case, we have two middleware handlers for both the /user/:id path.  It will execute the first, then, because we call next in the first, execute the second.  If we failed to call next, OR we called the response object to end the response in the first function, the second won't run, so be aware of that when writing your own.  

Slide 18

Express takes advantage of the fact that JS functions have flexible arity -- basically, a particular route can have _more than one middleware_.  

In this example, similar to the first, we always console.log the id. But if that ID is a clown, we send up a console warning of a detected clown, then execute the next() function in the chain, in this case, the next function parameter, and admonish the clown. 

But if the user isn't a clown, we want to skip that, and move on to the next matching *route*, skipping the rest of the functions we've defined in the route. 

What does that look like? 

Slide 19

So, why is this advanced middleware so important? 

Well, quite frankly, because it allows us to do different things on the same route based on different conditions.  Particularly, you'll find this pattern a lot when you talk about authenticating users - redirecting users if they're not authenticated, or sending a forbidden message if the authenticated user is not authorised.  You also have cases where you want to log traffic to a particular route, or maybe you sell e-books and you want to watermark the PDF, and log when it was downloaded, and by whom.  

Here's a good one.  You've got a third-party authorisation service like Auth0 - but you want to be able to get the user id from the JWT token.  If there's no user ID, you want to send a 401 status, otherwise, you want to store the userID from the JWT token on the request object to use in future calls down the middleware chain.  

Slide 20

Now, there's tons of stuff we didn't cover. I showed you the basics of WHAT middleware is, but to do anything practical with them, we pretty much have to know how to set up authorisation, or connect to databases, or do a whole bunch of other stuff.  But I'm happy to answer any questions you have with the time we have left.  







