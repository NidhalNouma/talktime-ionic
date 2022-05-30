const {
  add,
  get,
  getAll,
  getAllIn,
  getAllFrom,
  update,
  deletee,
  addToArray,
  deleteFromArray,
  uploadFile,
} = require("../db/fire");
const collName = "Audios";

const newAudio = async (audioBase46, userId, replyToAudio, replyToUser) => {
  console.log("Adding new audio ...");
  const uploadAudio = await uploadFile(audioBase46, collName);
  const data = {
    audioUrl: uploadAudio.url,
    userId: userId,
    replyToAudio,
    replyToUser,
  };
  const r = await add(collName, data);
  if (!r) {
    return null;
  }
  console.log("New audio added: ", r);
  return r;
};

const getAudio = async (audioId) => {
  console.log("Getting audio ...");
  const r = await get(collName, audioId);
  return r;
};

const deleteAudio = async (audioId) => {
  console.log("Deleting audio ...");
  const r = await deletee(collName, audioId);
  console.log("Audio deleted: ", r);
  return r;
};

const getAllAudios = async () => {
  console.log("Getting all audios ...");
  const r = await getAll(collName);
  return r;
};

const getAllAudiosIn = async (arr) => {
  console.log("Getting all voicemails ...", arr);
  const r = await getAllIn(collName, "replyToUser", arr);
  return r;
};

const getAllAudiosFrom = async (val) => {
  console.log("Getting all voicemails by user ...", val);
  const r = await getAllFrom(collName, "replyToUser", val);
  return r;
};

module.exports = {
  newAudio,
  getAudio,
  deleteAudio,
  getAllAudios,
  getAllAudiosIn,
  getAllAudiosFrom,
};
