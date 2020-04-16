import express from "express";

const launchServer = (port) => {
  const app = express();

  return app.listen(port, () => {
    console.log(`Application listening on port ${port}`);
  });
};

export default launchServer;
