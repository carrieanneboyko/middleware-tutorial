const searchCategoriesByRegex = (collection) => (regex) =>
  new Promise((resolve, reject) => {
    collection
      .find({ title: { $regex: regex } })
      .sort({ title: 1 })
      .exec((err, docs) => {
        if (err) {
          reject(err);
        }
        resolve(docs);
      });
  });

export default searchCategoriesByRegex;
