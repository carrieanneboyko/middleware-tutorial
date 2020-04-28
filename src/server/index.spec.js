import axios from "axios"; // we'll learn more about Axios later.
import launchServer from "./index";

const TEST_URL = "http://localhost";
const TEST_PORT = 3434;
let server;

describe("/src/server/index.js", () => {
  beforeAll(() => {
    // to test the server, we have to launch the server
    server = launchServer(TEST_PORT);
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
});
