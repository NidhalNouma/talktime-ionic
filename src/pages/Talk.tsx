import { useState, useEffect, useRef, useContext } from "react";
import { useParams } from "react-router-dom";

import { IonContent, IonPage } from "@ionic/react";
import Nav from "../components/navbar/Nav";
import { RecordButton } from "../components/Buttons/CallButton";
import WaveAndLoader from "../components/waveAndLoader";

import Call, { Mute, stopAudioOnly } from "../hooks/Call";
import { CRecord } from "../hooks/Record";
import Main from "../hooks/Main";

import { ShowToast } from "../App";
import "./Talk.css";

interface tabProps {}

const Talk: React.FC<tabProps> = ({}) => {
  const [lstream, setLStream] = useState(null);
  const [rstream, setRStream] = useState(null);

  const audioRef = useRef<any>(null);
  type params = {
    id: string;
  };
  const { id } = useParams<params>();
  const { openToast } = useContext(ShowToast);

  const { state, click, btnText, answer, close } = Call(0);
  const { startCall } = Main(
    state,
    close,
    setLStream,
    setRStream,
    id,
    (msg: string, ty: number = 1) => openToast(msg, ty)
  );

  const { audio, record, setRecord, pauseRecording, setPauseRecording } =
    CRecord();

  return (
    <IonPage>
      <IonContent fullscreen>
        <div className="App">
          <Nav block={() => {}} />
          <div className="ion-text-center ion-margin-top">
            <h3>{!id ? "See who response back." : "Join the private room."}</h3>
          </div>
          <WaveAndLoader type={state} lstream={lstream} rstream={rstream} />
          <RecordButton
            onClick={() => setRecord(record === 1 ? 0 : 1)}
            name={record === 1 ? "End" : "Record"}
            muted={pauseRecording}
            mute={() => setPauseRecording(!pauseRecording)}
          />
        </div>

        {audio && (
          <audio
            src={URL.createObjectURL(audio)}
            ref={audioRef}
            style={{ display: "none" }}
            autoPlay
          ></audio>
        )}
      </IonContent>
    </IonPage>
  );
};

export default Talk;
