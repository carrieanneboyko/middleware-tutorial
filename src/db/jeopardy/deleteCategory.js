const deleteCategory = (collection) => (criterion) =>
  new Promise((resolve, reject) => {
    collection.remove(criterion, {}, (err, numRemoved) => {
      if (err) {
        reject(err);
      }
      resolve({ removed: numRemoved });
    });
  });

export default deleteCategory;
