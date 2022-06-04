require("dotenv").config();
const randomString = require("random-string");
const { initializeApp } = require("firebase/app");

const {
  getStorage,
  ref,
  uploadString,
  getDownloadURL,
  deleteObject,
} = require("firebase/storage");
const {
  doc,
  collection,
  addDoc,
  getDoc,
  getDocs,
  query,
  orderBy,
  where,
  updateDoc,
  deleteDoc,
  arrayUnion,
  arrayRemove,
  getFirestore,
  serverTimestamp,
} = require("firebase/firestore");

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: "talktime-57dc9.firebaseapp.com",
  projectId: "talktime-57dc9",
  storageBucket: "talktime-57dc9.appspot.com",
  messagingSenderId: "907184166513",
  appId: "1:907184166513:web:74dcf3afcf0c5d5aaaadd0",
  measurementId: "G-QV17V8P1F8",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage();

async function uploadFile(file, path) {
  if (!file || !path) return null;
  console.log("Uploading a base64 file! ");
  try {
    const id = randomString({
      length: 20,
      numeric: true,
      letters: true,
      special: false,
      exclude: ["/"],
    });
    const storagePhotoRef = ref(storage, `${path}/${id}`);

    const snap = await uploadString(storagePhotoRef, file, "data_url");
    const url = await getDownloadURL(snap.ref);
    // console.log(url.toString());

    return { url, id };
  } catch (err) {
    console.error(err);
    return null;
  }
}

function deleteFile(id, path) {
  if (!id || !path) return null;
  console.log("Deleting a base64 file! ");
  const desertRef = ref(storage, `${path}/${id}`);

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

async function add(document, data) {
  console.log("Adding new document ...", data);
  const docRef = await addDoc(collection(db, document), {
    ...data,
    createdAt: serverTimestamp(),
  });
  console.log("Document written with ID: ", docRef.id);

  return docRef.id;
}

async function get(document, colId) {
  const d = doc(db, document, colId);

  const r = await getDoc(d);

  if (r.exists()) {
    console.log("Document data:", r.data());
    return { ...r.data(), id: colId };
  } else {
    // doc.data() will be undefined in this case
    console.log("No such document!");
    return null;
  }
}

async function getAll(coll) {
  const q = query(collection(db, coll), orderBy("createdAt", "desc"));
  const r = [];
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    // console.log(doc.id, " => ", doc.data());
    r.push({ ...doc.data(), id: doc.id });
  });

  return r;
}

async function getAllIn(coll, nameDoc, arr) {
  const q = query(collection(db, coll), where(nameDoc, "in", arr));
  const r = [];
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    // console.log(doc.id, " => ", doc.data());
    r.push({ ...doc.data(), id: doc.id });
  });

  return r;
}

async function getAllFrom(coll, nameDoc, val) {
  const q = query(
    collection(db, coll),
    orderBy("createdAt", "desc"),
    where(nameDoc, "==", val)
  );
  const r = [];
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    // console.log(doc.id, " => ", doc.data());
    r.push({ ...doc.data(), id: doc.id });
  });

  return r;
}

async function update(document, colId, data) {
  const d = doc(db, document, colId);

  const r = await updateDoc(d, {
    ...data,
    updatedAt: serverTimestamp(),
  });

  return r;
}

async function deletee(document, colId) {
  const d = doc(db, document, colId);

  const r = await deleteDoc(d);

  return r;
}

async function addToArray(document, colId, arrName, data) {
  const d = doc(db, document, colId);

  const r = await updateDoc(d, {
    [arrName]: arrayUnion(data),
  });

  return r;
}

async function deleteFromArray(document, colId, arrName, data) {
  const d = doc(db, document, colId);

  const r = await updateDoc(d, {
    [arrName]: arrayRemove(data),
  });

  return r;
}

module.exports = {
  uploadFile,
  deleteFile,
  add,
  get,
  getAll,
  getAllIn,
  getAllFrom,
  update,
  deletee,
  addToArray,
  deleteFromArray,
};
