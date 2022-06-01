import { useContext, useState, useEffect } from "react";

import { useHistory } from "react-router-dom";
import { IonContent, IonPage } from "@ionic/react";
import Nav from "../components/navbar/Nav";
import { HostUrlVM } from "../components/hostUrl";
import { ReplyButton } from "../components/Buttons/CallButton";
import Wave from "../components/WaveSurface";

import {
  UserContext,
  getUser,
  likeAudio,
  dislikeAudio,
  removeVoicemail,
} from "../hooks/User";
import { Voicemails, copyToClipboard } from "../hooks/Audio";

import { ShowToast } from "../App";
import "./Voicemail.css";

interface tabProps {}

const Voicemail: React.FC<tabProps> = ({}) => {
  const { openToast } = useContext(ShowToast);
  let history = useHistory();
  const [ci, setCi] = useState(0);
  const { user, setUser } = useContext<any>(UserContext);

  const { audios } = Voicemails(user?.id, user?.voicemail);
  const [audio, setAudio] = useState<any>(null);

  useEffect(() => {
    if (audios?.length > 0 && ci < audios.length && ci >= 0) {
      setAudio(audios[ci]);
      // console.log(audios[ci]);
    } else if (audios?.length === ci) setCi(0);
    else if (ci < 0) setCi(audios.length - 1);
  }, [ci, audios]);

  return (
    <IonPage>
      <IonContent fullscreen>
        <div className="App">
          <Nav block={() => {}} />
          <div
            className="ion-text-center ion-margin-top"
            style={{ marginBottom: "auto" }}
          >
            <h3>{`${
              audios?.length > 0 ? ci + 1 + "/" + audios?.length : 0
            } messages.`}</h3>
            {audio?.id && (
              <HostUrlVM
                id={audio.id}
                copyId={() => {
                  copyToClipboard(audio.id, (message: string, type: Number) =>
                    openToast(message, type)
                  );
                }}
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
                deleteFn={async () => {
                  await removeVoicemail(user.id, audio.id);
                  const r = await getUser(user.id);
                  setUser(r?.data);
                  openToast("Deleted", -1);
                }}
                likeFn={async () => {
                  const l = user?.audioLikes?.find(
                    (a: string) => a === audio.id
                  );
                  await likeAudio(user.id, audio.id, !l);
                  const r = await getUser(user.id);
                  setUser(r?.data);
                  openToast(!l ? "Liked" : "Unliked", 1);
                }}
                dislikeFn={async () => {
                  const d = user?.audioDislikes?.find(
                    (a: string) => a === audio.id
                  );
                  await dislikeAudio(user.id, audio.id, !d);
                  const r = await getUser(user.id);
                  setUser(r?.data);
                  openToast(!d ? "Disliked" : "Undisliked", 1);
                }}
              />
            )}
          </div>
          {audio && ci >= 0 && (
            <Wave
              audio={audio.audioUrl}
              isBlob={true}
              ida={audio.id + "voicemail"}
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

export default Voicemail;
