import { getCategories } from "./categories";
import { getCategoryById } from "./category";

const jService = {
  getCategories,
  getCategoryById,
  getCategoriesAndClues: async (count, offset) => {
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
  },
};

export default jService;
