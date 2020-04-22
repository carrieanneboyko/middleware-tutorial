import db from './index';

const addStuff = (stuff) => new Promise((resolve, reject) => {
  db.insert(stuff, (err, newDoc) => {
    if(err){
      reject(err);
    }
    console.log("Document Inserted"); 
    resolve(newDoc);
  })
})

export default addStuff; 