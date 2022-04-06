import { useState, useEffect, useRef, useContext } from "react";
import { useParams } from "react-router-dom";

import { IonContent, IonPage } from "@ionic/react";
import Nav from "../components/navbar/Nav";
import CallButton from "../components/Buttons/CallButton";
import WaveAndLoader from "../components/waveAndLoader";

import Call, { Mute, stopAudioOnly } from "../hooks/Call";
import Main from "../hooks/Main";

import { ShowToast } from "../App";
import "./Tab1.css";

interface tabProps {
  incall: Boolean;
  setIncall: Function;
}

const Tab1: React.FC<tabProps> = ({ incall, setIncall }) => {
  const [lstream, setLStream] = useState(null);
  const [rstream, setRStream] = useState(null);

  const audio = useRef<any>(null);
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
  const { muted, unmute, mute } = Mute(lstream);

  useEffect(() => {
    if (state === 0) {
      if (incall) {
        stopAudioOnly(rstream);
        openToast("Disconnected", -1);
      }

      stopAudioOnly(lstream);
      setIncall(false);
      unmute();
    }
  }, [state]);

  useEffect(() => {
    if (startCall) {
      answer();
      openToast("Connected");
      setIncall(true);
    }

    if (rstream) {
      if (audio.current) audio.current.srcObject = rstream;
    }
  }, [startCall, rstream]);

  return (
    <IonPage>
      <IonContent fullscreen>
        <div className="App">
          <Nav />
          <div className="ion-text-center ion-margin-top">
            <h3>
              {!id ? "Find someone to talk to." : "Join the private room."}
            </h3>
          </div>
          <WaveAndLoader type={state} lstream={lstream} rstream={rstream} />
          <CallButton
            onClick={click}
            name={btnText}
            muted={muted}
            mute={mute}
          />
        </div>

        <audio
          ref={audio}
          style={{ display: "none" }}
          autoPlay
          // muted={muted}
        ></audio>
      </IonContent>
    </IonPage>
  );
};

export default Tab1;
