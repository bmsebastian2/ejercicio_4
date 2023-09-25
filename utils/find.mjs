import { listModel } from "./models.mjs";

const { user, log, exercise } = listModel;

export const findAllUsers = async () =>
  await user.find({}).select("_id username");
export const findUserById = async (id) => await user.findById(id);
export const findLogsById = (id) => log.findById(id);
export const findExcercises = async (filter,limit) =>
  await exercise.find(filter).limit(+limit ?? 500);
