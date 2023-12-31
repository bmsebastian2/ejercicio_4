import express from "express";
import { findAllUsers, findUserById, findExcercises } from "./utils/find.mjs";
import { AddNewExcercis } from "./utils/exercisesCrud.mjs";
import { addUser } from "./utils/userCrud.mjs";
import { listModel } from "./utils/models.mjs";

export const routerApiUser = express.Router();

routerApiUser.get("/", (req, res) => {
  findAllUsers()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => res.send("No existen usuarios"));
});

routerApiUser.post("/", (req, res) => {
  let userName = req.body.username;
  addUser(userName, res);
});

routerApiUser.post("/:_id/exercises", async (req, res) => {
  const id = req.params._id;
  const { date, duration, description } = req.body;

  if (id) {
    try {
      console.log(id);
      const user = await findUserById(id);
      console.log("user:", user);
      if (user) {
        //const fecha = formatoFecha(date);

        AddNewExcercis(description, duration, date, user, res);
        // if (fecha) {

        // } else {
        //   res.send("ERROR CON LA FECHA");
        // }
      } else {
        res.send("_ID de usuario no existe");
      }
    } catch (error) {
      console.log("Error ", error);
    }
  } else {
    res.send("Id vacio");
  }
});
routerApiUser.get("/:_id/logs", async (req, res) => {
  const { from, to, limit } = req.query;
  const { _id } = req.params;
  const user = await findUserById(_id);

  if (!user) {
    res.send("No existe usuario");
    return;
  }
  let dateObject = {};
  if (from) {
    dateObject["$gte"] = new Date(from);
  }
  if (to) {
    dateObject["$lte"] = new Date(to);
  }
  let filter = {
    user_id: _id,
  };
  if (from || to) {
    filter.date = dateObject;
  }
  const exercises = await listModel.exercise.find(filter).limit(+limit ?? 500);
  const log = exercises.map((e) => ({
    description: e.description,
    duration: e.duration,
    date: e.date.toDateString(),
  }));
  res.json({
    username: user.username,
    count: exercises.length,
    _id: user._id,
    log,
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
