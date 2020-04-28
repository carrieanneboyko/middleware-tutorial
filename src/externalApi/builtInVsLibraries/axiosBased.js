import axios from "axios";

export const getFirstPostViaAxios = () =>
  new Promise((resolve, reject) =>
    axios
      .get(`https://jsonplaceholder.typicode.com/posts/1`)
      .then((result) => {
        resolve(result.data);
      })
      .catch(reject)
  );

export const postToApi = (data) =>
  new Promise((resolve, reject) =>
    axios
      .post(`https://jsonplaceholder.typicode.com/posts`, data, {
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      })
      .then((result) => resolve(result.data))
      .catch(reject)
  );
