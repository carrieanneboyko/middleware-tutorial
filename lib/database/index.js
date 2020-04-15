"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.reset = exports.find = exports.insert = void 0;

var _nedb = _interopRequireDefault(require("nedb"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// full NeDB info can be found at: https://github.com/louischatriot/nedb
const db = {
  main: new _nedb.default({
    filename: "./data/main.db",
    autoload: true
  }),
  test: new _nedb.default({
    filename: "./data/test.db",
    autoload: true
  })
};
/**
 * insert() - inserts a document into a specified collection
 * @param {string} collection - name of collection
 * @param {Object | Array<Object>} doc - document or documents to insert
 * @returns {Promise}
 *   @resolves {Object} - new document/s
 *   @rejects {string} - error
 */

const insert = (collection, doc) => new Promise((resolve, reject) => {
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


exports.insert = insert;

const find = (collection, query) => new Promise((resolve, reject) => {
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

exports.find = find;

const reset = collection => {
  new Promise((resolve, reject) => {
    if (db[collection] === undefined) {
      reject(`No collection ${collection} exists`);
      return;
    }

    db[collection].remove({}, {
      multi: true
    }, (err, numRemoved) => {
      if (err) {
        reject(err);
      }

      resolve(numRemoved);
    });
  });
};

exports.reset = reset;