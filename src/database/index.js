import Datastore from "nedb";
// full NeDB info can be found at: https://github.com/louischatriot/nedb
const db = {
  main: new Datastore({
    filename: "./data/main.db",
    autoload: true,
  }),
  test: new Datastore({
    filename: "./data/test.db",
    autoload: true,
  }),
};

/**
 * insert() - inserts a document into a specified collection
 * @param {string} collection - name of collection
 * @param {Object | Array<Object>} doc - document or documents to insert
 * @returns {Promise}
 *   @resolves {Object} - new document/s
 *   @rejects {string} - error
 */
export const insert = (collection, doc) =>
  new Promise((resolve, reject) => {
    if (db[collection] === undefined) {
      reject(`No collection ${collection} exists`);
      return;
    }
    db[collection].insert(doc, (err, newDoc) => {
      if (err) {
        reject(err);
      }
      resolve(newDoc);
    });
  });

/**
 * find() - Gets information from a collection via a query.
 * @param {string} collection
 * @param {Object} query - find documents matching the query
 * @returns {Promise}
 *   @rejects {String}
 *   @resolves {Array<Object>}
 */
export const find = (collection, query) =>
  new Promise((resolve, reject) => {
    if (db[collection] === undefined) {
      reject(`No collection ${collection} exists`);
      return;
    }
    db[collection].find(query, (err, docs) => {
      if (err) {
        reject(err);
      }
      resolve(docs);
    });
  });

export const reset = (collection) => {
  new Promise((resolve, reject) => {
    if (db[collection] === undefined) {
      reject(`No collection ${collection} exists`);
      return;
    }
    db[collection].remove({}, { multi: true }, (err, numRemoved) => {
      if (err) {
        reject(err);
      }
      resolve(numRemoved);
    });
  });
};
