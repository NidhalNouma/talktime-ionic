const {
  add,
  get,
  update,
  deletee,
  addToArray,
  deleteFromArray,
  uploadFile,
} = require("../db/fire");
const collName = "Audios";

const newAudio = async (audioBase46, userId) => {
  console.log("Adding new audio ...");
  const uploadAudio = await uploadFile(audioBase46, collName);
  const data = { audioUrl: uploadAudio.url, userId: userId };
  const r = await add(collName, data);
  if (!r) {
    return null;
  }
  console.log("New audio added: ", r);
  return r;
};
