import { makeConexion } from "./conexionMongoose.mjs";
import mongoose from "mongoose";

const schemaUser = {
  username: String,
};

const schemaExercise = {
  user_id: { type: String, require: true },
  description: String,
  duration: Number,
  date: Date,
};
const logSchema = mongoose.Schema(
  {
    description: String,
    duration: Number,
    date: String,
  },
  { _id: false }
);

const schemaLogs = {
  username: String,
  count: Number,
  _id: String,
  log: [logSchema],
};
function makeSchame(schame) {
  return new mongoose.Schema(schame, { versionKey: false });
}
export const listSchema = {
  user: makeSchame(schemaUser),
  exercise: makeSchame(schemaExercise),
  log: makeSchame(schemaLogs),
};
