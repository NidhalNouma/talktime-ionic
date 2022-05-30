import { useContext, useEffect, useState, Fragment } from "react";
import { useParams, useHistory, useLocation } from "react-router-dom";

import { IonContent, IonPage } from "@ionic/react";
import Nav from "../components/navbar/Nav";
import { RecordButton } from "../components/Buttons/CallButton";
import WaveAndLoader from "../components/waveAndLoader";
import Wave from "../components/WaveSurface";
import { HostUrlAudio } from "../components/hostUrl";
import { IonSpinner } from "@ionic/react";

import { CRecord } from "../hooks/Record";
import { upload, copyToClipboard } from "../hooks/Audio";
import { UserContext, getUser } from "../hooks/User";

import { ShowToast } from "../App";
import "./Talk.css";

interface tabProps {}

const Talk: React.FC<tabProps> = ({}) => {
  type params = {
    id: string;
  };
  const { id } = useParams<params>();
  const history = useHistory();
  let { search } = useLocation();
  const query = new URLSearchParams(search);
  const toUser = query.get("to");
  const { openToast } = useContext(ShowToast);
  const { user, setUser } = useContext<any>(UserContext);
  // console.log(user);

  const {
    audio,
    audioUrl,
    record,
    setRecord,
    pauseRecording,
    setPauseRecording,
  } = CRecord(id);

  useEffect(() => {
    if (audioUrl && user) {
      upload(audio, user.id, id, toUser).then((r) => {
        getUser(user.id).then((r) => {
          setUser(r?.data);
          openToast("Sent", 1);
          if (id) history.goBack();
          else setRecording(false);
        });
      });
    }
  }, [audioUrl]);

  const [recording, setRecording] = useState(false);

  useEffect(() => {
    if (record === 1) setRecording(true);
  }, [record]);

  return (
    <IonPage>
      <IonContent fullscreen>
        <div className="App">
          <Nav block={() => {}} />
          <div className="ion-text-center ion-margin-top full-width">
            {<h3>{"See who response back."}</h3>}

            {!recording && user && user.audio && (
              <HostUrlAudio
                id={user.audio}
                copyId={() => {
                  copyToClipboard(user.audio, (message: string, type: Number) =>
                    openToast(message, type)
                  );
                }}
                setId={() => {
                  // setID(resetId(id));
                  openToast("Deleted", -1);
                }}
              />
            )}
          </div>
          {/* <WaveAndLoader type={state} lstream={lstream} rstream={rstream} /> */}

          {recording && record !== 1 ? (
            <IonSpinner
              className="spinner"
              style={{ margin: "auto" }}
              name="dots"
            />
          ) : (
            <Fragment>
              {/* {audioUrl && <Wave audio={audioUrl} />} */}
              {!recording && user?.audio && record !== 1 && (
                <Wave
                  audio={user?.audioDoc?.audioUrl}
                  isBlob={true}
                  ida={user.audio}
                />
              )}

              <RecordButton
                onClick={() => setRecord(record === 1 ? 0 : 1)}
                name={record === 1 ? "End" : "Record"}
                muted={pauseRecording}
                mute={() => setPauseRecording(!pauseRecording)}
              />
            </Fragment>
          )}
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Talk;

function blobToBase64(blob: Blob) {
  return new Promise((resolve, _) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result);
    reader.readAsDataURL(blob);
  });
}
