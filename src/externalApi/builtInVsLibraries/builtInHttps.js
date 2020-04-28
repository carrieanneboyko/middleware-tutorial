// ./src/externalApi/builtInVsLibraries/builtInHttps.js
import https from "https"; // we don't need to yarn add https becase https is built into node!
// if we were using http, import "http";

export const getFirstPost = () =>
  new Promise((resolve, reject) => {
    // we define the http options;
    const httpsOptions = {
      method: "GET",
      hostname: "jsonplaceholder.typicode.com",
      path: "/posts/1",
      headers: {
        Accept: "application/json",
      },
    };
    const req = https.request(httpsOptions, (res) => {
      // req and res are not objects, they are 'streams';
      const dataArray = [];
      res.setEncoding("utf8"); // without this, we'll get a Buffer, not string.
      res.on("data", (chunk) => {
        // data can often get sent in multiple chunks.
        dataArray.push(chunk);
      });
      res.on("end", () => {
        // join the data strings, parse them from JSON into object, then resolve.
        resolve(JSON.parse(dataArray.join("")));
      });
    });
    req.on("error", (err) => {
      console.error(err);
      reject(err);
    });
    req.end(); // if we don't end, the request will never figure out we're done adding stuff.
  });
