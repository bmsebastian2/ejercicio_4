// server.js
import mongoose from "mongoose";
const server = "127.0.0.1:27017"; // REPLACE WITH YOUR DB SERVER
const database = "admin"; // REPLACE WITH YOUR DB NAME
const uri =
  "mongodb://bmsebastian2:Ab15415958@ac-79zezp4-shard-00-00.fhwg3s0.mongodb.net:27017,ac-79zezp4-shard-00-01.fhwg3s0.mongodb.net:27017,ac-79zezp4-shard-00-02.fhwg3s0.mongodb.net:27017/?ssl=true&replicaSet=atlas-loit2h-shard-0&authSource=admin&retryWrites=true&w=majority";
export const makeConexion = () => {
  mongoose
    //.connect(`mongodb://${server}/${database}`)
    .connect(uri)
    
    .then(() => {
      console.log("Database connection successful");
    })
    .catch((err) => {
      console.error("Database connection error");
    });
};
