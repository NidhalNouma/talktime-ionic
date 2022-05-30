require("dotenv").config();
const express = require("express");
const app = express();
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ limit: "100mb" }));
app.use(bodyParser.raw());

const audio = require("../controller/audio");
const user = require("../controller/user");

app.post("/add", async function (req, res) {
  let { file, userId, replyToAudio, replyToUser } = req.body;
  if (!file || !userId) return res.send({ err: "Missing file or user" });
  if (!replyToAudio || !replyToUser) {
    replyToAudio = null;
    replyToUser = null;
  }

  const a = await audio.newAudio(file, userId, replyToAudio, replyToUser);
  const nu = await user.addAudio(userId, a);
  if (replyToAudio) await user.newVoiceMail(replyToUser, a);

  res.json(a);
});

app.get("/getall", async function (req, res) {
  const r = await audio.getAllAudios();

  res.json(r);
});

app.post("/getall/:id", async function (req, res) {
  const { id } = req.params;
  const { voicemails } = req.body;
  if (!voicemails) return res.send({ err: "Missing voicemails" });
  if (!id) return res.send({ err: "Missing id" });
  //   const r = await audio.getAllAudiosIn(voicemails);
  const r = await audio.getAllAudiosFrom(id);
  if (r.length > 0) {
    const rf = r.filter((a) => voicemails.find((i) => i === a.id));
    return res.json(rf);
  }

  res.json(r);
});

app.post("/delete", async function (req, res) {
  const { userId, audioId } = req.body;
  if (!userId || !audioId)
    return res.send({ err: "Missing userId or audioId" });
  const r = await audio.deleteAudio(audioId);
  const ri = await user.removeAudio(userId);

  res.json(r);
});

module.exports = app;
