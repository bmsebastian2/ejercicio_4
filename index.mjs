import express from "express";
const app = express();
import cors from "cors";
import bodyParser from "body-parser";
import { makeConexion } from "./utils/conexionMongoose.mjs";
import { routerApiUser } from "./apiUser.mjs";
import * as url from "url";

const __dirname = url.fileURLToPath(new URL(".", import.meta.url));

const PORT = process.env.PORT || 3000;

app.use(cors());

app.use(express.static("utils"));
app.use(express.static("public"));
app.use(express.static("views"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});

app.use("/api/users", routerApiUser);
makeConexion();

app.listen(PORT, () => {
  console.log("Your app is listening on port " + PORT);
});
