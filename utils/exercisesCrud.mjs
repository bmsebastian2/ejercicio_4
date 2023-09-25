import { listModel } from "./models.mjs";
const { exercise } = listModel;

export const AddNewExcercis = async (
  description,
  duration,
  date,
  user,
  res
) => {
  const update = {
    user_id: user._id,
    description,
    duration,
    date: date ? new Date(date) : new Date(),
  };
  try {
    const exerciseSend = await exercise(update).save();
    res.json({
      _id: user._id,
      username: user.username,
      description: exerciseSend.description,
      duration: exerciseSend.duration,
      date: new Date(exerciseSend.date).toDateString(),
    });
  } catch (error) {
    console.log("Error en AddNewExcercis : ", error);
    res.send("Error send exercises: ", error);
  }
};
//Lo busca si lo encuentra lo actualiza sino lo agrega
