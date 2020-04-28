import { getFirstPost } from "./builtInHttps";
import { getFirstPostViaAxios } from "./axiosBased";
test("it gets the first post", (done) => {
  getFirstPost()
    .then((result) => {
      expect(result).toEqual({
        userId: 1,
        id: 1,
        title:
          "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
        body:
          "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto",
      });
      done();
    })
    .catch((err) => {
      console.error(err);
      throw new Error(err);
      done();
    });
});

test("it gets the first post via Axios", (done) => {
  getFirstPostViaAxios()
    .then((result) => {
      expect(result).toEqual({
        userId: 1,
        id: 1,
        title:
          "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
        body:
          "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto",
      });
      done();
    })
    .catch((err) => {
      console.error(err);
      throw new Error(err);
      done();
    });
});
