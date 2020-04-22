import express from "express";
import bodyParser from "body-parser";
import simpleLogger from "./middleware/simpleLogger";

import fs from "fs";
import path from "path";
import addToDatabase from "./middleware/addToDatabase";
import getFromDatabaseByNumber from "./middleware/getFromDatabaseByNumber";

const launchServer = (port) => {
  const app = express();

  app.use(simpleLogger);
  app.use(bodyParser.json());

  // handler for the /user/:id path, which prints the user ID to the console

  app.get(
    "/user/:id",
    (req, res, next) => {
      console.log("ID:", req.params.id);
      if (["bozo", "pennywise", "krusty", "ronald"].includes(req.params.id)) {
        console.warn("CLOWN DETECTED");
        next(); // go to the next function in this function chain;
      } else {
        next("route"); // go to the next matching route, skip the other functions;
      }
    },
    (req, res, next) => {
      res.send(`Hey! I thought I told you clowns to get out of here!`);
    }
  );

  // handler for the /user/:id path, which prints the user ID to the browser
  app.get("/user/:id", function (req, res, next) {
    res.send(`User is ${req.params.id}`);
  });

  app.get("/hello-world", (req, res) => {
    res.send("Hello World!");
  });

  app.post("/hello-world", (req, res) => {
    res.send("Hello World From Post!");
  });

  app.post("/save", addToDatabase);

  app.get(
    "/byNumber/:number",
    (req, res, next) => {
      console.log({ number: req.params.number });
      next();
    },
    getFromDatabaseByNumber
  );

  app.get("/file", function (req, res, next) {
    console.log(path.resolve(__dirname, "../../filemaybe.txt"));
    fs.readFile(path.resolve(__dirname, "../../filemaybe.txt"), function (
      err,
      data
    ) {
      if (err) {
        next(err); // Pass errors to Express.
      } else {
        res.send(data);
      }
    });
  });

  // error handlers

  app.use(function (err, req, res, next) {
    console.error(err.stack);
    res.status(500).send("Something broke!");
  });

  return app.listen(port, () => {
    console.log(`Application listening on port ${port}`);
  });
};

export default launchServer;
