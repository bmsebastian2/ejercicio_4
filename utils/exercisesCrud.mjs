import { listModel } from "./models.mjs";
const { exercise } = listModel;

export const AddNewExcercis = (user, body, fecha, id) => {
  const { description, duration } = body;
  const { _id, username } = user;

  const filter = { _id: id };
  const update = {
    _id,
    username,
    date: fecha,
    duration,
    description,
  };
  return exercise.findOneAndUpdate(filter, update, {
    new: true,
    upsert: true,
  });
};
//Lo busca si lo encuentra lo actualiza sino lo agrega
