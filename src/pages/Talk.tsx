import { useContext } from "react";
import { useParams } from "react-router-dom";

import { IonContent, IonPage } from "@ionic/react";
import Nav from "../components/navbar/Nav";
import { RecordButton } from "../components/Buttons/CallButton";
import WaveAndLoader from "../components/waveAndLoader";
import Wave from "../components/WaveSurface";

import { CRecord } from "../hooks/Record";

import { ShowToast } from "../App";
import "./Talk.css";

interface tabProps {}

const Talk: React.FC<tabProps> = ({}) => {
  type params = {
    id: string;
  };
  const { id } = useParams<params>();
  const { openToast } = useContext(ShowToast);

  const { audioUrl, record, setRecord, pauseRecording, setPauseRecording } =
    CRecord();

  return (
    <IonPage>
      <IonContent fullscreen>
        <div className="App">
          <Nav block={() => {}} />
          <div className="ion-text-center ion-margin-top">
            <h3>{"See who response back."}</h3>
          </div>
          {/* <WaveAndLoader type={state} lstream={lstream} rstream={rstream} /> */}

          {audioUrl && <Wave audio={audioUrl} />}

          <RecordButton
            onClick={() => setRecord(record === 1 ? 0 : 1)}
            name={record === 1 ? "End" : "Record"}
            muted={pauseRecording}
            mute={() => setPauseRecording(!pauseRecording)}
          />
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Talk;
