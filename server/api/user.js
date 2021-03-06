require("dotenv").config();
const express = require("express");
const app = express();
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ limit: "100mb" }));
app.use(bodyParser.raw());

const user = require("../controller/user");
const audio = require("../controller/audio");

app.post("/add", async function (req, res) {
  const r = await user.newUser();
  res.json(r);
});

app.post("/get", async function (req, res) {
  const { id } = req.body;
  if (!id) return res.send({ err: "Missing id" });
  const r = await user.getUser(id);
  if (r?.audio) {
    r["audioDoc"] = await audio.getAudio(r.audio);
  }
  res.json(r);
});

app.post("/audio/like", async function (req, res) {
  const { userId, audioId, like } = req.body;
  if (!userId || !audioId) return res.send({ err: "Missing id" });
  const r = await user.likeAudio(userId, audioId, like);

  res.json(r);
});

app.post("/audio/flag", async function (req, res) {
  const { userId, audioId, flag } = req.body;
  if (!userId || !audioId) return res.send({ err: "Missing id" });
  const r = await user.flagAudio(userId, audioId, flag);

  res.json(r);
});

app.post("/audio/dislike", async function (req, res) {
  const { userId, audioId, dislike } = req.body;
  if (!userId || !audioId) return res.send({ err: "Missing id" });
  const r = await user.dislikeAudio(userId, audioId, dislike);

  res.json(r);
});

app.post("/voicemail/remove", async function (req, res) {
  const { userId, audioId } = req.body;
  if (!userId || !audioId) return res.send({ err: "Missing id" });
  const r = await user.removeVoicemail(userId, audioId);

  res.json(r);
});

module.exports = app;
