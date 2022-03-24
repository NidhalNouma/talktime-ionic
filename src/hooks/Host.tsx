import axios from "axios";
import { Clipboard } from "@awesome-cordova-plugins/clipboard";
// import cryptoRandomString from "crypto-random-string";
const bcrypt = require("bcryptjs");

export function uid(name: String | any) {
  function setIdToStorqge(id: String | any) {
    localStorage.setItem(name, id);
  }

  function resetId(id: String) {
    localStorage.removeItem(name);
    deleteId(id);
    const nid = cuid();
    setIdToStorqge(nid);

    return nid;
  }

  function getId() {
    let iid = localStorage.getItem(name);
    if (!iid) iid = cuid();

    return iid!.toString();
  }

  return { setIdToStorqge, resetId, getId };
}

async function postId(id: String) {
  const r = await axios.post(`/host/${id}`);
  console.log(r.data);
}

async function deleteId(id: String) {
  const r = await axios.post(`/host/d/${id}`);
  console.log(r.data);
}

export function cuid() {
  //   const id = cryptoRandomString({ length: 10 });
  const id = bcrypt.genSaltSync(10);
  return id;
}

export function copyToClipboard(text: String, done: Function) {
  const getUrl = window.location.origin + "/talk/" + text;
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
