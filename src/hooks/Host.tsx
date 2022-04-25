import axios from "axios";
import { Clipboard } from "@awesome-cordova-plugins/clipboard";
import { URL } from "../constant";
var randomString = require("random-string");

export function uid(name: String | any) {
  function setIdToStorqge(id: String | any) {
    localStorage.setItem(name, id);
  }

  function resetId(id: String) {
    localStorage.removeItem(name);
    deleteId(id);
    const nid = cuid();
    setIdToStorqge(nid);
    postId(nid);

    return nid;
  }

  function getId() {
    let iid = localStorage.getItem(name);
    if (!iid) iid = cuid();

    // postId(iid!.toString());
    return iid!.toString();
  }

  return { setIdToStorqge, resetId, getId };
}

async function postId(id: String) {
  const r = await axios.post(`${URL}/host/${id}`);
  console.log(r.data);
}

async function deleteId(id: String) {
  const r = await axios.post(`${URL}/host/d/${id}`);
  console.log(r.data);
}

export function cuid() {
  const id = randomString({
    length: 20,
    numeric: true,
    letters: true,
    special: false,
    exclude: ["/"],
  });
  return id;
}

export function copyToClipboard(
  text: String,
  done: Function,
  photo: boolean = false
) {
  const getUrl = `${!photo ? URL + "/talk/" : URL + "/p/"}${text}`;
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
