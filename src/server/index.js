import path from "path";
import express from "express";
import dotenv from "dotenv";

dotenv.config({ path: path.join(__dirname, '../../.env') });
const PORT = process.env.PORT;

console.log(path.join(__dirname, '../../.env'));
console.log(PORT);


const executeServer = () => {
  console.log(PORT);
};

export default executeServer;
