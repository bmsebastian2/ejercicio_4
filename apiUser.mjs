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

      if (fecha) {
        const exerci = await AddNewExcercis(user, body, fecha, _id);
        await NewLog(exerci);
        //const { username } = user;
        const { date, duration, description } = exerci;
        //const newObject = { date, duration, description };
        //console.log(user._doc);
        res.json({ ...user._doc, date, duration, description });
      } else {
        res.send("ERROR CON LA FECHA");
      }
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
  if (date === "") return new Date().toDateString();
  if (isDateNew(date)) {
    let newDate = new Date(`${date}T00:00:00`);
    return newDate === "Invalid Date" ? false : newDate.toDateString();
  } else {
    return false;
  }
}

function isDateNew(value) {
  switch (typeof value) {
    case "number":
      return true;
    case "string":
      return !isNaN(Date.parse(value));
    case "object":
      if (value instanceof Date) {
        return !isNaN(value.getTime());
      }
    default:
      return false;
  }
}
