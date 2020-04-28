import axios from "axios";
import launchServer from "./index";

const TEST_URL = "http://localhost";
const TEST_PORT = 3434;
let server;

describe("/src/server/index.js", () => {
  beforeAll(() => {
    server = launchServer(TEST_PORT);
    return;
  });
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
  afterAll(() => {
    server.close();
    return;
  });
});
