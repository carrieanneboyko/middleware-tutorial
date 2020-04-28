import { getFirstPost } from "./builtInHttps";
import { getFirstPostViaAxios, postToApi } from "./axiosBased";

const EXPECTED_RESULT = {
  userId: 1,
  id: 1,
  title:
    "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
  body:
    "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto",
};
describe("Getting the first post", () => {
  describe("https module", () => {
    it("gets the expected result using node's built-in https", async () => {
      const result = await getFirstPost();
      expect(result).toEqual(EXPECTED_RESULT);
    });
  });
  describe("with Axios", () => {
    it("gets the expected result using axios", async () => {
      const result = await getFirstPostViaAxios();
      expect(result).toEqual(EXPECTED_RESULT);
    });
  });
});
describe("Using Axios to post", () => {
  it("makes a post request", async () => {
    const result = await postToApi({ title: "foo", body: "bar", userId: 1 });
    expect(result).toEqual({ title: "foo", body: "bar", userId: 1, id: 101 });
  });
});
