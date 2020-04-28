// ./src/db/jeopardy/index.js;
import db from "../index"; // let's get the NeDB database.
import addCategory from "./addCategory";
import findCategory from "./findCategory";
import searchCategories from "./searchCategories";
import updateCategory from "./updateCategory";
import deleteCategory from "./deleteCategory";

export const dbService = (collection) => {
  return {
    create: {
      category: addCategory(collection),
      categories: addCategory(collection), // quirk of syntax.
    },
    read: {
      category: findCategory(collection),
      categoryByTitle: (title) => findCategory(collection)({ title }),
      categoryById: (id) => findCategory(collection)({ id }),
      searchCategoriesByRegex: searchCategories(collection),
      searchCategories: (substring) =>
        searchCategories(collection)(new RegExp(substring)),
    },
    update: {
      category: updateCategory(collection),
    },
    delete: {
      category: deleteCategory(collection),
      categoryById: (id) => deleteCategory(collection)({ id }),
      categoryByTitle: (title) => deleteCategory(collection)({ title }),
    },
    drop: () =>
      collection.remove({}, { multi: true }, function (err, numRemoved) {
        if (err) {
          throw new Error(err);
        }
        console.log(`Successfully removed ${numRemoved} documents`);
      }),
  };
};

export default dbService(db.jeopardy);
