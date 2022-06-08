import { Fragment, useContext, useState, useEffect } from "react";

import { useHistory } from "react-router-dom";
import { IonContent, IonPage } from "@ionic/react";
import Nav from "../components/navbar/Nav";
import { HostUrlVM } from "../components/hostUrl";
import { ReplyButton } from "../components/Buttons/CallButton";
import Wave from "../components/WaveSurface";
import Record from "../components/Record";

import {
  UserContext,
  getUser,
  likeAudio,
  dislikeAudio,
  removeVoicemail,
} from "../hooks/User";
import { upload, Voicemails, copyToClipboard } from "../hooks/Audio";
import { CRecord } from "../hooks/Record";

import { useDrag, useScroll } from "@use-gesture/react";

import { ShowToast } from "../App";
import "./Voicemail.css";

interface tabProps {}

const Voicemail: React.FC<tabProps> = ({}) => {
  const { openToast } = useContext(ShowToast);
  let history = useHistory();
  const [ci, setCi] = useState(0);
  const { user, setUser } = useContext<any>(UserContext);

  useEffect(() => {
    if (user) localStorage.setItem("user.voicemail", user.voicemails?.length);
  }, [user]);

  const { audios } = Voicemails(user?.id, user?.voicemail);
  const [audio, setAudio] = useState<any>(null);

  const [ready, setIsReady] = useState(false);

  const {
    time,
    stream,
    audio: raudio,
    audioUrl,
    record,
    setRecord,
    pauseRecording,
    setPauseRecording,
  } = CRecord(audio?.id);

  useEffect(() => {
    if (audioUrl && user) {
      upload(raudio, user.id, audio?.id, audio?.userId).then((r: any) => {
        getUser(user.id).then((r) => {
          setUser(r?.data);
          openToast("Sent", 1);
        });
      });
    }
  }, [audioUrl]);

  useEffect(() => {
    if (audios?.length > 0 && ci < audios.length && ci >= 0) {
      setAudio(audios[ci]);
      // console.log(audios[ci]);
    } else if (audios?.length === ci) setCi(0);
    else if (ci < 0) setCi(audios.length - 1);

    // console.log(audios);
  }, [ci, audios]);

  useEffect(() => {
    document.addEventListener("keydown", checkKey, false);

    return () => {
      document.removeEventListener("keydown", checkKey, false);
    };
  }, [ready]);

  function checkKey(e: any) {
    e = e || window.event;

    if (!ready) return;

    if (e.keyCode == "38") {
      // up arrow
      setCi((v) => v - 1);
    } else if (e.keyCode == "40") {
      // down arrow
      setCi((v) => v + 1);
    } else if (e.keyCode == "37") {
      // left arrow
      setCi((v) => v - 1);
    } else if (e.keyCode == "39") {
      // right arrow
      setCi((v) => v + 1);
    }
  }

  const bind = useDrag(({ down, movement: [mx, my] }) => {
    if (!ready) return;
    // console.log(mx, my);
    if (!down) {
      if (my > 0) setCi(ci - 1);
      if (my < 0) setCi(ci + 1);
    }
    // api.start({ x: down ? mx : 0, y: down ? my : 0, immediate: down });
  });

  return (
    <IonPage>
      <IonContent fullscreen>
        <div className="App" {...bind()}>
          <Nav block={() => {}} />

          {record !== 1 ? (
            <Fragment>
              <div
                className="ion-text-center ion-margin-top"
                style={{ marginBottom: "auto" }}
              >
                <h3>{`${
                  audios?.length > 0 ? ci + 1 + "/" + audios?.length : 0
                } private messages.`}</h3>
              </div>

              {audio && ci >= 0 && audios.length > 0 && (
                <Wave
                  audio={audio.audioUrl}
                  isBlob={true}
                  ida={audio.id + "inbox"}
                  like={
                    user?.audioLikes?.find((a: string) => a === audio.id)
                      ? true
                      : false
                  }
                  onLike={async () => {
                    const l = user?.audioLikes?.find(
                      (a: string) => a === audio.id
                    );
                    await likeAudio(user.id, audio.id, !l);
                    const r = await getUser(user.id);
                    setUser(r?.data);
                    openToast(!l ? "Liked" : "Unliked", 1);
                  }}
                  deletee={true}
                  onDelete={async () => {
                    await removeVoicemail(user.id, audio.id);
                    const r = await getUser(user.id);
                    setUser(r?.data);
                    openToast("Deleted", -1);
                  }}
                  dislike={
                    user?.audioDislikes?.find((a: string) => a === audio.id)
                      ? true
                      : false
                  }
                  onDislike={async () => {
                    const d = user?.audioDislikes?.find(
                      (a: string) => a === audio.id
                    );
                    await dislikeAudio(user.id, audio.id, !d);
                    const r = await getUser(user.id);
                    setUser(r?.data);
                    openToast(!d ? "Disliked" : "Undisliked", 1);
                  }}
                  copy={true}
                  onCopy={() => {
                    copyToClipboard(audio.id, (message: string, type: Number) =>
                      openToast(message, type)
                    );
                  }}
                  setIsReady={setIsReady}
                />
              )}
              {audio && audios.length > 0 && (
                <ReplyButton
                  onClick={() => {
                    audio && setRecord(1);
                    // history.push(`/talk/${audio.id}?to=${audio.userId}`);
                  }}
                  name={"Reply"}
                  // next={() => setCi(ci + 1)}
                  // prev={() => setCi(ci - 1)}
                />
              )}
            </Fragment>
          ) : (
            <Record
              stream={stream}
              record={record}
              time={time}
              setRecord={setRecord}
              pauseRecording={pauseRecording}
              setPauseRecording={setPauseRecording}
            />
          )}
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Voicemail;
