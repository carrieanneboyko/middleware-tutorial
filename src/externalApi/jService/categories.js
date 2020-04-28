import axios from "axios";

const JSERVICE_URL = `http://jservice.io`;

export const getCategories = async (count = 10, offset = 0) => {
  try {
    // we could do this as axios.get(`${JSERVICE_URL}/api/categories/?count=${count}&offset=${offset}`) too!
    const result = await axios.get(`${JSERVICE_URL}/api/categories/`, {
      params: { count, offset },
    });
    return result.data;
  } catch (err) {
    throw new Error(err);
  }
};
