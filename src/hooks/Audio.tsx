import { useState, useEffect } from "react";
import axios from "axios";
import { Clipboard } from "@awesome-cordova-plugins/clipboard";
import { io } from "socket.io-client";

import { URL } from "../constant";

export const Audios = () => {
  const [audios, setAudios] = useState<any>(null);

  useEffect(() => {
    getAll().then((r) => setAudios(r?.data));

    const socket = io(URL);
    socket.on("newAudio", (r) => {
      setAudios((a: any) => [...a, r]);
      // console.log(r, "socket");
    });
  }, []);

  return { audios };
};

export const Voicemails = (id: string, arr: Array<string>) => {
  const [audios, setAudios] = useState<any>(null);

  useEffect(() => {
    const socket = io(URL);
    socket.on("newAudio", (r) => {
      if (r.replyToUser === id) setAudios((a: any) => [...a, r]);
    });
  }, []);

  useEffect(() => {
    if (id)
      getVoiceMails(id, arr).then((r) => {
        console.log(r?.data);
        const nr = r?.data.filter((a: any) =>
          arr.find((b: string) => b === a.id)
        );
        setAudios(nr);
      });
  }, [id, arr]);

  return { audios };
};

export const getAll = async () => {
  console.log("get all audios ...");

  const url = `${URL}/audio/getAll`;
  const data = {};

  try {
    const req = await axios.get(url, data);
    // console.log(req);
    return req;
  } catch (err) {
    console.log(err);
  }
};

export const getVoiceMails = async (
  userId: string,
  voicemails: Array<string>
) => {
  console.log("get all voicemails ...");

  const url = `${URL}/audio/getAll/${userId}`;
  const data = {
    voicemails: [...voicemails],
  };

  try {
    const req = await axios.post(url, data);
    console.log(req);
    return req;
  } catch (err) {
    console.log(err);
  }
};

export const upload = async (
  file: any,
  userId: any,
  id: string,
  toUser: string | null
) => {
  if (!file) return;
  const base64 = await blobToBase64(file);
  if (!base64) return;

  console.log("Uploading ...", userId);

  const url = `${URL}/audio/add`;
  const data = {
    file: base64,
    userId,
    replyToAudio: id,
    replyToUser: toUser,
  };

  try {
    const req = await axios.post(url, data);
    console.log(req);
  } catch (err) {
    console.log(err);
  }
};

export const deleteAudio = async (userId: string, audioId: string) => {
  console.log("deleting ...", userId);

  const url = `${URL}/audio/delete`;
  const data = {
    audioId,
    userId,
  };

  try {
    const req = await axios.post(url, data);
    // console.log(req);
    return req;
  } catch (err) {
    console.log(err);
  }
};

function blobToBase64(blob: Blob) {
  return new Promise((resolve, _) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result);
    reader.readAsDataURL(blob);
  });
}

export function copyToClipboard(text: String, done: Function) {
  const getUrl = `${URL + "/f-url/"}${text}`;
  Clipboard.copy(getUrl).then(
    function () {
      console.log("Async: Copying to clipboard was successful!");
      done("Copied", 1);
    },
    function (err) {
      console.error("Async: Could not copy text: ", err);
      navigator.clipboard.writeText(getUrl).then(
        function () {
          console.log("Async: Copying to clipboard was successful!");
          done("Copied", 1);
        },
        function (err) {
          console.error("Async: Could not copy text: ", err);
          done("Could not copy text", -1);
        }
      );
    }
  );
}
