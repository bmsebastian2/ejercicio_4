import app from "./server.mjs";
import * as url from "url";
import bodyParser from "body-parser";
import { routerApiUser } from "apiuser.mjs";
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const __dirname = url.fileURLToPath(new URL(".", import.meta.url));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});

app.use("/api/users", routerApiUser);
