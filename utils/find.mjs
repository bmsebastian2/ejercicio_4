import { listModel } from "./models.mjs";

const { user, log } = listModel;

export const findAllUsers = async () => await user.find({});
export const findUserById = (id) => user.findById(id);
export const findLogsById = (id) => log.findById(id);
