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
