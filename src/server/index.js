import express from "express";
import simpleLogger from './middleware/simpleLogger';
import addUserIs from './middleware/userIs'; 

const launchServer = (port) => {
  const app = express();

  return app.listen(port, () => {
    console.log(`Application listening on port ${port}`);
  });
};

export default launchServer;
