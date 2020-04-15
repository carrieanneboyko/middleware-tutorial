import executeServer from './server';
import dotenv from "dotenv";

if(process.env.NODE_ENV === undefined){
  dotenv.config({ path: path.join(__dirname, '../../.env') });
  console.log("process.env.NODE_ENV after:", process.env.NODE_ENV);
}

executeServer(); 