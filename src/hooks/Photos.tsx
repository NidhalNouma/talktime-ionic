import axios from "axios";
import { URL } from "../constant";

export async function postPhoto(img: any, date: any, setUrl: Function) {
  if (!img) return null;
  const url = `${URL}/p/post`;
  const data = {
    image: img,
    date: new Date(date),
  };
  //   console.log(data, date);
  try {
    const req = await axios.post(url, data);

    console.log(req);
    setUrl(req.data);
  } catch (err) {
    setUrl(null);
  }
}

export async function getPhoto(id: string, setUrl: Function) {
  const url = `${URL}/p/p`;
  const data = { id };

  const req = await axios.post(url, data);
  console.log(req);
  setUrl(req.data);
  return req.data;
}

async function deletePhoto(id: String) {
  const r = await axios.post(`${URL}/p/d/${id}`);
  console.log(r.data);
}

export function uid(name: String | any) {
  function setIdToStorqge(id: String | any) {
    localStorage.setItem(name, id);
  }

  function resetId(id: String) {
    localStorage.removeItem(name);
    deletePhoto(id);
  }

  async function getId(setUrl: Function) {
    let iid = localStorage.getItem(name);
    if (iid) {
      const r = await getPhoto(iid.toString(), setUrl);
      if (r) {
        return r.id;
      }
    }

    return iid;
  }

  return { setIdToStorqge, resetId, getId };
}

async function postId(id: String) {
  const r = await axios.post(`${URL}/host/${id}`);
  console.log(r.data);
}
