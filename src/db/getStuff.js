import db from './index';

const getStuff = (criterion) => new Promise((resolve, reject) => {
  console.log({criterion})
  const number = criterion.number.toString(); 
  db.find({number}, (err, docs) => {
    if(err){
      reject(err);
    }
    console.log("Docs found", docs); 
    resolve(docs);
  })
})

export default getStuff; 