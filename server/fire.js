const randomString = require("random-string");
const { initializeApp } = require("firebase/app");
// import { getFirestore, collection, getDocs } from "firebase/firestore/lite";
const {
  getStorage,
  ref,
  uploadString,
  getDownloadURL,
  deleteObject,
} = require("firebase/storage");

// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
  apiKey: "AIzaSyApGSMWbFNPmUZKk4RQDmZYCBqlB5B69Xk",
  authDomain: "talktime-57dc9.firebaseapp.com",
  projectId: "talktime-57dc9",
  storageBucket: "talktime-57dc9.appspot.com",
  messagingSenderId: "907184166513",
  appId: "1:907184166513:web:5b7cd711a736d985aaadd0",
  measurementId: "G-6049KZ3QMC",
};

const app = initializeApp(firebaseConfig);
// const db = getFirestore(app);
const storage = getStorage();

async function uploadPhoto(photo) {
  if (!photo) return null;
  console.log("Uploading a base64 photo! ");
  try {
    const id = randomString({
      length: 20,
      numeric: true,
      letters: true,
      special: false,
      exclude: ["/"],
    });
    const storagePhotoRef = ref(storage, `photos/${id}`);

    const snap = await uploadString(storagePhotoRef, photo, "data_url");
    const url = await getDownloadURL(snap.ref);
    // console.log(url.toString());

    return { url, id };
  } catch (err) {
    console.error(err);
    return null;
  }
}

function deletePhoto(id) {
  if (!id) return null;
  console.log("Deleting a base64 photo! ");
  const desertRef = ref(storage, `photos/${id}`);

  // Delete the file
  deleteObject(desertRef)
    .then(() => {
      // File deleted successfully
      console.log("deleted successfully, ");
    })
    .catch((error) => {
      console.log(error);
    });
}

module.exports = { uploadPhoto, deletePhoto };
