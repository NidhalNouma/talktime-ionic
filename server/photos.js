// const imgbbUploader = require("imgbb-uploader");
require("dotenv").config();
const { uploadPhoto, deletePhoto } = require("./fire");

console.log(process.env.APP_NAME);

const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const path = require("path");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ limit: "100mb" }));
app.use(bodyParser.raw());

app.get("/p/:id", function (req, res) {
  const id = req.params.id;
  const p = getById(id);

  if (p) {
    return res.sendFile(path.join(__dirname, "../build/index.html"));
  } else return res.redirect("/photos");
});

app.post("/p", function (req, res) {
  const id = req.body.id;
  const p = getById(id);

  return res.json(p);
});

app.post("/post", async function (req, res) {
  const image = req.body.image;
  const date = req.body.date;
  const expie = new Date(date).setHours(new Date().getHours() + 24);
  const expiration = new Date(expie);
  // console.log(expiration, date);

  // const options = {
  //   apiKey: "8379f94d61683a24c3bf04fa8488ed80",
  //   // expiration: expiration - Date.now(),
  //   base64string: image,
  // };

  try {
    // const p = await imgbbUploader(options);
    const p = await uploadPhoto(image);
    if (!p) res.send(null);
    const r = newPhoto(p.url, date, expiration, p.id);
    console.log(r);
    res.json(r);
  } catch (err) {
    console.log(err);
    res.send({ err });
  }
});

app.post("/d/:id", (req, res) => {
  const r = { id: req.params.id, delete: false };

  const p = photos.find((v) => v.id === r.id);
  if (p) {
    var index = photos.indexOf(p);
    if (index !== -1) {
      photos.splice(index, 1);
      deletePhoto(r.id);
      r.delete = true;
    }
  }

  res.send(r);
});

var periode = 1000 * 60 * 60 * 24;
setInterval(() => {
  const time = new Date();
  photos.forEach((v, index) => {
    if (time > v.expie) {
      photos.splice(index, 1);
      deletePhoto(v.id);
    }
  });
}, periode);

module.exports = app;

const photos = [];

function newPhoto(url, reveal, expire, id) {
  const obj = { url, reveal, expire, id };
  photos.push(obj);
  return obj;
}

function getById(id) {
  const s = photos.length;

  for (let i = 0; i < s; i++) {
    const p = photos[i];
    if (p.id === id) return p;
  }

  return null;
}
