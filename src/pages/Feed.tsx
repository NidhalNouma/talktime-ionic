import { useContext, useState, Fragment, useEffect, useCallback } from "react";
import { useParams, useHistory } from "react-router-dom";

import { IonContent, IonPage } from "@ionic/react";
import Nav from "../components/navbar/Nav";

import Wave from "../components/WaveSurface";
import { ReplyButton } from "../components/Buttons/CallButton";
import Record from "../components/Record";

import { upload, Audios, copyToClipboard } from "../hooks/Audio";
import { CRecord } from "../hooks/Record";

import { useDrag } from "@use-gesture/react";

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
          // if (id) history.goBack();
          // else {
          //   setRecording(false);
          //   history.push("/share-audio");
          // }
        });
      });
    }
  }, [audioUrl]);

  useEffect(() => {}, []);

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

  const bind = useDrag(({ down, movement: [mx, my] }) => {
    // console.log(mx, my);
    if (!down) {
      if (my > 0) setCi(ci + 1);
      if (my < 0) setCi(ci - 1);
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
                className="ion-text-center ion-margin-top full-width"
                style={{ marginBottom: "auto" }}
              >
                <h3>{`Scroll up. Listen & reply to talk to someone new.`}</h3>
              </div>

              {audio && ci >= 0 && (
                <Wave
                  audio={audio.audioUrl}
                  isBlob={true}
                  ida={audio.id + "feed"}
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
                  flaged={
                    user?.audioFlaged?.find((a: string) => a === audio.id)
                      ? true
                      : false
                  }
                  onFlag={async () => {
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
                />
              )}

              {audio && (
                <ReplyButton
                  onClick={() => {
                    audio && setRecord(1);
                    // history.push(`/talk/${audio.id}?to=${audio.userId}`);
                  }}
                  name={"Reply"}
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

export default Feed;
