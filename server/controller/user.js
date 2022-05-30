const {
  add,
  get,
  update,
  deletee,
  addToArray,
  deleteFromArray,
} = require("../db/fire");
const collName = "Users";

const newUser = async () => {
  console.log("Adding new user ...");
  const data = {
    audioLikes: [],
    audioDislikes: [],
    audioFlaged: [],
    voicemail: [],
    audio: null,
  };
  const r = await add(collName, data);
  if (!r) {
    return null;
  }
  console.log("New user added: ", r);
  return r;
};

const getUser = async (userId) => {
  console.log("Getting user ...");
  const r = await get(collName, userId);
  return r;
};

const addAudio = async (userId, docData) => {
  console.log("Adding audio to user ...");
  const r = await update(collName, userId, { audio: docData });

  return r;
};

const deleteUser = async (userId) => {
  console.log("Deleting user ...");
  const r = await deletee(collName, userId);
  return r;
};

const likeAudio = async (userId, audioId) => {
  console.log("Liking audio ...");
  const r = await addToArray(collName, userId, "audioLikes", audioId);
  const r1 = await deleteFromArray(collName, userId, "audioDislikes", audioId);
  return { r, r1 };
};

const dislikeAudio = async (userId, audioId) => {
  console.log("Disliking audio ...");
  const r = await addToArray(collName, userId, "audioDislikes", audioId);
  const r1 = await deleteFromArray(collName, userId, "audioLikes", audioId);
  return { r, r1 };
};

const newVoiceMail = async (userId, voiceMailId) => {
  console.log("Adding new voicemail to user ...");
  const r = await addToArray(collName, userId, "voicemail", voiceMailId);
  return r;
};

module.exports = {
  newUser,
  getUser,
  addAudio,
  likeAudio,
  dislikeAudio,
  newVoiceMail,
};
