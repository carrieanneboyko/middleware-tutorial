import Datastore from "nedb";
import path from 'path';

const db = new Datastore({
  filename: path.resolve(__dirname, "../../data/data.db"),
  autoload: true,
});

export default db; 