import { useContext, useEffect, useState, Fragment } from "react";
import { useParams, useHistory, useLocation } from "react-router-dom";

import { IonContent, IonPage } from "@ionic/react";
import Nav from "../components/navbar/Nav";
import { RecordButton } from "../components/Buttons/CallButton";
import SingleWave from "../components/waveAndLoader/SingleWave";
import Wave from "../components/WaveSurface";
import { HostUrlAudio } from "../components/hostUrl";
import { IonSpinner } from "@ionic/react";
import Record from "../components/Record";

import { CRecord } from "../hooks/Record";
import { upload, deleteAudio, copyToClipboard } from "../hooks/Audio";
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
    time,
    stream,
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
          openToast(id ? "Sent" : "Posted", 1);
          if (id) history.goBack();
          else {
            setRecording(false);
            history.push("/share-audio");
          }
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
          {record !== 1 ? (
            <Fragment>
              <div
                className="ion-text-center ion-margin-top full-width"
                style={{ marginBottom: "auto" }}
              >
                {
                  <h3>
                    {record === 1
                      ? time
                      : "Record a message to start an audio survey."}
                  </h3>
                }
              </div>
              {record === 1 && stream && <SingleWave lstream={stream} />}
              {recording && record !== 1 ? (
                <IonSpinner
                  className="spinner"
                  style={{ margin: "auto" }}
                  name="dots"
                />
              ) : (
                <RecordButton
                  onClick={() => setRecord(record === 1 ? 0 : 1)}
                  name={record === 1 ? "End" : "Record"}
                  muted={pauseRecording}
                  mute={() => setPauseRecording(!pauseRecording)}
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

export default Talk;
