import mongoose from "mongoose";
import { listSchema } from "./schemas.mjs";

function makeModel(name, schemaModelo) {
  return mongoose.model(name, schemaModelo);
}

export const listModel = {
  user: makeModel("User", listSchema.user),
  exercise: makeModel("Exercise", listSchema.exercise),
  log: makeModel("Log", listSchema.log),
};
