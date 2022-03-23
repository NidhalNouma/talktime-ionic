import { useState, useEffect, useRef } from "react";

import { IonContent, IonPage } from "@ionic/react";
import Nav from "../components/navbar/Nav";
import CallButton from "../components/Buttons/CallButton";
import WaveAndLoader from "../components/waveAndLoader";
import HostUrl from "../components/hostUrl";

import Call, { Mute, stopAudioOnly } from "../hooks/Call";
import Main from "../hooks/Main";
import { uid, copyToClipboard } from "../hooks/Host";

import "./Tab2.css";

const Tab1: React.FC = () => {
  const { getId, resetId } = uid("hostId");
  const [id, setID] = useState(getId);

  const [lstream, setLStream] = useState(null);
  const [rstream, setRStream] = useState(null);
  const [incall, setIncall] = useState(false);

  const audio = useRef<any>(null);

  const { state, click, btnText, answer, close } = Call(0);
  const { startCall } = Main(state, close, setLStream, setRStream, 0);
  const { muted, unmute, mute } = Mute();

  useEffect(() => {
    if (state === 0) {
      stopAudioOnly(lstream);
      stopAudioOnly(rstream);

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

  useEffect(() => {
    return () => {
      stopAudioOnly(lstream);
      stopAudioOnly(rstream);
    };
  }, []);

  return (
    <IonPage>
      {/* <IonHeader><Nav /></IonHeader> */}
      <IonContent fullscreen>
        <div className="App">
          <Nav />
          <div className="ion-text-center ion-margin-top full-width">
            <h3>Host a private room.</h3>
            <HostUrl
              id={id}
              copyId={() => {
                copyToClipboard(id);
              }}
              setId={() => setID(resetId(id))}
            />
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
