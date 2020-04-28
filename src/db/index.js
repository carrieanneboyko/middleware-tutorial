import Datastore from "nedb";
import path from "path";

const data = new Datastore({
  filename: path.resolve(__dirname, "../../data/data.db"),
  autoload: true,
});

const jeopardy = new Datastore({
  filename: path.resolve(__dirname, "../../data/jeopardy.db"),
  autoload: true,
});
jeopardy.ensureIndex({ fieldName: "id", unique: true }, function (err) {
  if (err) {
    throw new Error(err);
  }
});

const test = new Datastore({
  filename: path.resolve(__dirname, "../../data/test.db"),
  autoload: true,
});
test.ensureIndex({ fieldName: "id", unique: true }, function (err) {
  if (err) {
    throw new Error(err);
  }
});

export default { data, jeopardy, test };
