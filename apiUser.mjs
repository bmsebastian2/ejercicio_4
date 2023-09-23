import express from "express";
import { findAllUsers, findUserById, findLogsById } from "./utils/find.mjs";
import { AddNewExcercis } from "./utils/exercisesCrud.mjs";
import { addUser } from "./utils/userCrud.mjs";
import { NewLog } from "./utils/logCrud.mjs";

export const routerApiUser = express.Router();

routerApiUser.get("/", (req, res) => {
  findAllUsers().then((result) => {
    res.send(result);
  });
});

routerApiUser.post("/", (req, res) => {
  let userName = req.body.username;
  addUser(userName).then((resp) => res.json(resp));
});

routerApiUser.post("/:_id/exercises", async (req, res) => {
  const { body } = req;
  const { _id } = body;
  if (_id) {
    const user = await findUserById(_id);
    if (user) {
      const fecha = formatoFecha(body.date);
      const exerci = await AddNewExcercis(user, body, fecha, _id);
      await NewLog(exerci);
      res.json(exerci);
    } else {
      res.send("_ID de usuario no existe");
    }
  }
});
routerApiUser.get("/:_id/logs", (req, res) => {
  const { _id } = req.params;

  findLogsById(_id).then((register) => {
    if (register === null) {
      res.send("_ID no se encuentra");
    } else {
      res.json(register);
    }
  });
});

function formatoFecha(date) {
  return (date ? new Date(`${date}T00:00:00`) : new Date()).toDateString();
}
