import { useState, useEffect, useRef } from "react";

import { IonContent, IonPage } from "@ionic/react";
import Nav from "../components/navbar/Nav";
import CallButton from "../components/Buttons/CallButton";
import WaveAndLoader from "../components/waveAndLoader";

import Call, { Mute, stopAudioOnly } from "../hooks/Call";
import Main from "../hooks/Main";

import "./Tab1.css";

const Tab1: React.FC = () => {
  const [lstream, setLStream] = useState(null);
  const [rstream, setRStream] = useState(null);
  const [incall, setIncall] = useState(false);

  const audio = useRef<any>(null);

  const { state, click, btnText, answer, close } = Call(0);
  const { startCall } = Main(state, close, setLStream, setRStream, 0);
  const { muted, unmute, mute } = Mute();

  useEffect(() => {
    if (state === 0) {
      if (incall) {
        stopAudioOnly(lstream);
        stopAudioOnly(rstream);
      }

      // incall && notify("Disconnected", false);
      setIncall(false);
      unmute();
    }
  }, [state]);

  useEffect(() => {
    if (startCall) {
      answer();
      // notify("Connected");
      setIncall(true);

      if (audio.current) audio.current.srcObject = rstream;
    }
  }, [startCall]);

  return (
    <IonPage>
      {/* <IonHeader><Nav /></IonHeader> */}
      <IonContent fullscreen>
        <div className="App">
          <Nav />
          <div className="ion-text-center ion-margin-top">
            <h3>Find someone to talk to.</h3>
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
          // volume="true"
          autoPlay
          muted={muted}
        ></audio>
      </IonContent>
    </IonPage>
  );
};

export default Tab1;
