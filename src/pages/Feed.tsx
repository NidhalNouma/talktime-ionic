import { useContext, useState, Fragment, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";

import { IonContent, IonPage } from "@ionic/react";
import Nav from "../components/navbar/Nav";

import Wave from "../components/WaveSurface";
import { HostUrli } from "../components/hostUrl";
import { ReplyButton } from "../components/Buttons/CallButton";

import { Audios, copyToClipboard } from "../hooks/Audio";

import { ShowToast } from "../App";
import {
  UserContext,
  getUser,
  likeAudio,
  dislikeAudio,
  flagAudio,
} from "../hooks/User";
import "./Feed.css";

interface tabProps {}

const Feed: React.FC<tabProps> = ({}) => {
  const { user, setUser } = useContext<any>(UserContext);
  const { audios } = Audios();
  const [ci, setCi] = useState(0);
  const [audio, setAudio] = useState<any>(null);

  type params = {
    id: string;
  };
  const { id } = useParams<params>();
  let history = useHistory();
  const { openToast } = useContext(ShowToast);
  const [li, setLi] = useState(id ? false : true);

  useEffect(() => {
    if (audios?.length > 0 && id) {
      const i = audios.findIndex((a: any) => a.id === id);
      if (i >= 0) setCi(i);
      setLi(true);
    }
  }, [audios]);

  useEffect(() => {
    if (li) {
      if (audios?.length > 0 && ci < audios.length && ci >= 0) {
        setAudio(audios[ci]);
      } else if (audios?.length === ci) setCi(0);
      else if (ci < 0) setCi(audios.length - 1);
    }
  }, [ci, audios, li]);

  return (
    <IonPage>
      <IonContent fullscreen>
        <div className="App">
          <Nav block={() => {}} />
          <div
            className="ion-text-center ion-margin-top full-width"
            style={{ marginBottom: "auto" }}
          >
            <h3>{`Hear what people say.`}</h3>
            {audio?.id && (
              <HostUrli
                id={audio.id}
                copyId={() => {
                  copyToClipboard(audio.id, (message: string, type: Number) =>
                    openToast(message, type)
                  );
                }}
                flagged={
                  user?.audioFlaged?.find((a: string) => a === audio.id)
                    ? true
                    : false
                }
                liked={
                  user?.audioLikes?.find((a: string) => a === audio.id)
                    ? true
                    : false
                }
                disliked={
                  user?.audioDislikes?.find((a: string) => a === audio.id)
                    ? true
                    : false
                }
                flagFn={async () => {
                  const f = user?.audioFlaged?.find(
                    (a: string) => a === audio.id
                  )
                    ? true
                    : false;
                  await flagAudio(user.id, audio.id, !f);
                  const r = await getUser(user.id);
                  setUser(r?.data);
                  openToast(!f ? "Flagged" : "Unflagged", 1);
                }}
                likeFn={async () => {
                  if (user?.audioLikes?.find((a: string) => a === audio.id))
                    return;
                  await likeAudio(user.id, audio.id);
                  const r = await getUser(user.id);
                  setUser(r?.data);
                  openToast("Liked", 1);
                }}
                dislikeFn={async () => {
                  if (user?.audioDislikes?.find((a: string) => a === audio.id))
                    return;
                  await dislikeAudio(user.id, audio.id);
                  const r = await getUser(user.id);
                  setUser(r?.data);
                  openToast("Disliked", 1);
                }}
              />
            )}
          </div>
          {audio && ci >= 0 && (
            <Wave
              audio={audio.audioUrl}
              isBlob={true}
              ida={audio.id + "feed"}
            />
          )}

          {audio && (
            <ReplyButton
              onClick={() => {
                audio && history.push(`/talk/${audio.id}?to=${audio.userId}`);
              }}
              name={"Reply"}
              next={() => setCi(ci + 1)}
              prev={() => setCi(ci - 1)}
            />
          )}
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Feed;
