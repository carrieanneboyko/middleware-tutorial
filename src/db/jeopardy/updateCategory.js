// UPDATE
const updateCategory = (collection) => (criterion, newData) =>
  new Promise((resolve, reject) => {
    collection.update(
      criterion,
      { $set: newData },
      { upsert: true, returnUpdatedDocs: true },
      (err, newDocs) => {
        if (err) {
          reject(err);
        }
        resolve(docs);
      }
    );
  });

export default updateCategory;
