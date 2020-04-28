const addCategory = (collection) => (categoryData) =>
  new Promise((resolve, reject) => {
    collection.insert(categoryData, (err, newDoc) => {
      if (err) {
        reject(err);
      }
      resolve(newDoc);
    });
  });

export default addCategory;
