import axios from "axios";

const JSERVICE_URL = `http://jservice.io`;

export const getCategoryById = async (categoryId) => {
  try {
    const result = await axios.get(`${JSERVICE_URL}/api/category/`, {
      params: { id: categoryId },
    });
    return result.data;
  } catch (err) {
    throw new Error(err);
  }
};
