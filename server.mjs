import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { makeConexion } from "./utils/conexionMongoose.mjs";
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.static("routers"));

app.use(express.static("utils"));
app.use(express.static("public"));
app.use(express.static("views"));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(PORT, () => {
  console.log("Your app is listening on port " + PORT);
});
makeConexion();
export default app;
