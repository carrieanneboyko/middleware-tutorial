// new file: ./src/server/middleware/simpleLogger.js

const simpleLogger = (req, _res, next) => {
  console.log(`Request Type: ${req.method} received at ${Date.now()}`);
  next(); 
}

export default simpleLogger; 