import { listModel } from "./models.mjs";

const { log } = listModel;

export async function NewLog(exerci) {
  const { description, duration, date, _id, username } = exerci;
  let newObject = { description, duration, date };

  log.findById(_id).then((result) => {
    if (result === null) {
      log({
        username,
        count: 1,
        _id,
        log: newObject,
      }).save();
    } else {
      result.log.push(newObject);
      result.count = result.log.length; // Actualiza el contador de registros
      result.save();
    }
  });
}
