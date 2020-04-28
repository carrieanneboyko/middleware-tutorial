// UPDATE
const updateCategory = (collection) => (criterion, newData) =>
  new Promise((resolve, reject) => {
    collection.update(
      criterion,
      { $set: newData },
      { returnUpdatedDocs: true },
      (err, numAffected, newDocs, upsert) => {
        if (err) {
          reject(err);
        }
        resolve(newDocs);
      }
    );
  });

export default updateCategory;
