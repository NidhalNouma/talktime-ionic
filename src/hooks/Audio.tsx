import { useState } from "react";
import axios from "axios";
import { URL } from "../constant";

const upload = async (file: any) => {
  if (!file) return;
  const base64 = await blobToBase64(file);

  const url = `${URL}/a/post`;
  const data = {
    audio: file,
    date: new Date(),
  };
  //   console.log(data, date);
  try {
    const req = await axios.post(url, data);
    console.log(req);
  } catch (err) {
    console.log(err);
  }
};

function blobToBase64(blob: any) {
  return new Promise((resolve, _) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result);
    reader.readAsDataURL(blob);
  });
}
