import axios from "axios"; // we'll learn more about Axios later.
import launchServer from "./index";
import db from "../db/index";
import mockData from "../__mockdata__/categories_clues.json";

const TEST_URL = "http://localhost";
const TEST_PORT = 3434;
let server;

describe("/src/server/index.js", () => {
  beforeAll(async () => {
    // to test the server, we have to launch the server
    server = launchServer(TEST_PORT);
    // let's also drop the test db
    await db.test.remove({}, { multi: true }, function (err, numRemoved) {
      if (err) {
        throw new Error(err);
      }
      console.log(`Successfully removed ${numRemoved} documents`);
    });
    return;
  });
  afterAll(() => {
    // we returned the server object from launchServer so that we can close it;
    server.close();
    return;
  });
  // Let's test our endpoints
  describe("get /hello-world", () => {
    it("gets hello world", async () => {
      const result = await axios.get(`${TEST_URL}:${TEST_PORT}/hello-world`);
      expect(result.data).toBe("Hello World!");
    });
  });
  describe("post /hello-world", () => {
    it("posts hello world", async () => {
      const result = await axios.post(`${TEST_URL}:${TEST_PORT}/hello-world`);
      expect(result.data).toBe("Hello World From Post!");
    });
  });
  describe("get /jeopardy/:identifier", () => {
    it("gets a category from jeopardy", async () => {
      // This WILL access db.jeopardy, not db.test
      const firstDip = await axios.get(
        `${TEST_URL}:${TEST_PORT}/jeopardy/11512`,
        { params: { test: true } }
      );
      expect(firstDip.data).toEqual({
        ...mockData[0],
        cache: "miss",
        _id: firstDip.data._id,
      });
    });
    it("grabs from the cache on a second dip.", async () => {
      // This WILL access db.jeopardy, not db.test
      const secondDip = await axios.get(
        `${TEST_URL}:${TEST_PORT}/jeopardy/11512`,
        { params: { test: true } }
      );
      expect(secondDip.data).toEqual({
        ...mockData[0],
        cache: undefined,
        _id: secondDip.data._id,
      });
    });
  });
});
