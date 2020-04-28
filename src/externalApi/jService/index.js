import { getCategories } from "./categories";
import { getCategoryById } from "./category";

// let's get categories AND request the clues for those categories.
const getCategoriesAndClues = async (count, offset) => {
  try {
    const categories = await getCategories(count, offset);
    const categoriesWithClues = await Promise.all(
      categories.map(async (category) => {
        const cluesResult = await getCategoryById(category.id);
        return { ...category, clues: cluesResult.clues };
      })
    );
    return categoriesWithClues;
  } catch (err) {
    throw new err();
  }
};

const jService = {
  getCategories,
  getCategoryById,
  getCategoriesAndClues,
};

export default jService;
