import { listModel } from "./models.mjs";
import { ObjectId } from "mongodb";

export const addUser = (name) =>
  listModel
    .user({
      _id: new ObjectId(),
      username: name,
    })
    .save();
