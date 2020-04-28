import jService from "../externalApi/jService";
import db from "../db/index"; // let's get the NeDB database.
import { dbService } from "../db/jeopardy/index";

const getCategoryById = (databaseService) => async (id) => {
  const dbResults = await databaseService.read.categoryById(id);
  if (dbResults.length === 0) {
    console.info(`Cache miss for id# ${id}`);
    const categoryData = await jService.getCategoryById(id);
    databaseService.create.category(categoryData); // will run in background.
    return { ...categoryData, cache: "miss" };
  }
  console.info(`Cache hit for id# ${id}`);
  return dbResults[0];
};

const getCategoryByTitle = (databaseService) => async (title) => {
  const dbResults = await databaseService.read.categoryByTitle(title);
  if (dbResults.length === 0) {
    throw new Error(`No results for title: ${title} in db`);
  }
  return dbResults[0];
};

export const jeopardy = (collection) => {
  return {
    getCategory: (idOrTitle) => {
      const parsed = parseInt(idOrTitle, 10);
      return isNaN(parsed)
        ? getCategoryByTitle(dbService(collection))(idOrTitle)
        : getCategoryById(dbService(collection))(parsed);
    },
    getCategoryBypassCache: async (id) => {
      const result = await jService.getCategoryById(id);
      return { ...result, cache: "bypassed" };
    },
  };
};

export default jeopardy(db.jeopardy);
