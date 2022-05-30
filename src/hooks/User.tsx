import { useState, useEffect, createContext } from "react";
import axios from "axios";
import { URL } from "../constant";

export const UserContext = createContext(null);

interface tabProps {
  value: any;
  children: React.ReactNode;
}
export const UserComponent: React.FC<tabProps> = ({ value, children }) => (
  <UserContext.Provider value={value}>{children}</UserContext.Provider>
);

export const User = () => {
  const [id, setId] = useState(window.localStorage.getItem("id"));
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    if (!id) {
      newUser().then((r) => setId(r.data));
    } else if (id) {
      window.localStorage.setItem("id", id);
      getUser(id).then((r) => setUser(r?.data));
    }
  }, [id]);

  return { user, setUser };
};

const newUser = async () => {
  const url = `${URL}/user/add`;
  const r = await axios.post(url);
  // console.log(r);
  return r;
};

export const getUser = async (id: string) => {
  const url = `${URL}/user/get`;
  if (!id) return null;
  const r = await axios.post(url, { id });
  // console.log(r);
  return r;
};

export const likeAudio = async (userId: string, audioId: string) => {
  const url = `${URL}/user/audio/like`;
  if (!userId || !audioId) return null;
  const r = await axios.post(url, { userId, audioId });
  // console.log(r);
  return r;
};

export const dislikeAudio = async (userId: string, audioId: string) => {
  const url = `${URL}/user/audio/dislike`;
  if (!userId || !audioId) return null;
  const r = await axios.post(url, { userId, audioId });
  // console.log(r);
  return r;
};

export const flagAudio = async (
  userId: string,
  audioId: string,
  flag: boolean
) => {
  const url = `${URL}/user/audio/flag`;
  if (!userId || !audioId) return null;
  const r = await axios.post(url, { userId, audioId, flag });
  // console.log(r);
  return r;
};

export const removeVoicemail = async (userId: string, audioId: string) => {
  const url = `${URL}/user/voicemail/remove`;
  if (!userId || !audioId) return null;
  const r = await axios.post(url, { userId, audioId });
  // console.log(r);
  return r;
};
