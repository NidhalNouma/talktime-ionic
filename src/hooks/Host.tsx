import axios from "axios";
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

export function copyToClipboard(text: String) {
  const getUrl = window.location;
  navigator.clipboard.writeText(getUrl.protocol + "//" + text).then(
    function () {
      console.log("Async: Copying to clipboard was successful!");
    },
    function (err) {
      console.error("Async: Could not copy text: ", err);
    }
  );
}
