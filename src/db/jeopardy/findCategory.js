const findCategory = (collection) => (criterion) =>
  new Promise((resolve, reject) => {
    collection.find(criterion, (err, docs) => {
      if (err) {
        reject(err);
      }
      resolve(docs);
    });
  });

export default findCategory;
