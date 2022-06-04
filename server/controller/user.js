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

const removeAudio = async (userId) => {
  console.log("Remove audio from user ...");
  const r = await update(collName, userId, { audio: null });

  return r;
};

const deleteUser = async (userId) => {
  console.log("Deleting user ...");
  const r = await deletee(collName, userId);
  return r;
};

const likeAudio = async (userId, audioId, like) => {
  console.log("Liking audio ...");
  let r = null;
  if (like) {
    r = await addToArray(collName, userId, "audioLikes", audioId);
    await deleteFromArray(collName, userId, "audioDislikes", audioId);
  } else r = await deleteFromArray(collName, userId, "audioLikes", audioId);
  return r;
};

const flagAudio = async (userId, audioId, flag) => {
  console.log("Flaging audio ...");
  let r = null;
  if (flag) r = await addToArray(collName, userId, "audioFlaged", audioId);
  else r = await deleteFromArray(collName, userId, "audioFlaged", audioId);
  return r;
};

const dislikeAudio = async (userId, audioId, dislike) => {
  console.log("Disliking audio ...");
  let r = null;
  if (dislike) {
    r = await addToArray(collName, userId, "audioDislikes", audioId);
    await deleteFromArray(collName, userId, "audioLikes", audioId);
  } else r = await deleteFromArray(collName, userId, "audioDislikes", audioId);
  return r;
};

const newVoiceMail = async (userId, voiceMailId) => {
  console.log("Adding new voicemail to user ...");
  const r = await addToArray(collName, userId, "voicemail", voiceMailId);
  return r;
};

const removeVoicemail = async (userId, audioId) => {
  console.log("Removing voicemail ...");
  const r = await deleteFromArray(collName, userId, "voicemail", audioId);
  return r;
};

module.exports = {
  newUser,
  getUser,
  addAudio,
  removeAudio,
  likeAudio,
  dislikeAudio,
  flagAudio,
  newVoiceMail,
  removeVoicemail,
};
