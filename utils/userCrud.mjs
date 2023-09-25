import { listModel } from "./models.mjs";

export const addUser = async (name, res) => {
  try {
    const user = await listModel
      .user({
        username: name,
      })
      .save();
    res.json(user);
  } catch (error) {
    console.log("Error addUser: ", error);
  }
};
