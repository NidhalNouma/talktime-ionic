import { useState, useEffect, useRef, useContext } from "react";

import { IonContent, IonPage } from "@ionic/react";
import Nav from "../components/navbar/Nav";
import CallButton from "../components/Buttons/CallButton";
import WaveAndLoader from "../components/waveAndLoader";
import HostUrl from "../components/hostUrl";

import Call, { Mute, stopAudioOnly } from "../hooks/Call";
import Main from "../hooks/Main";
import { uid, copyToClipboard } from "../hooks/Host";

import { ShowToast } from "../App";
import "./Host.css";

interface tabProps {
  incall: Boolean;
  setIncall: Function;
}

const Tab2: React.FC<tabProps> = ({ incall, setIncall }) => {
  const { getId, resetId } = uid("host_ID_1");
  const [id, setID] = useState(getId);

  const [lstream, setLStream] = useState(null);
  const [rstream, setRStream] = useState(null);

  const audio = useRef<any>(null);
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
          <Nav block={close} />
          <div className="ion-text-center ion-margin-top full-width">
            <h3>Host a private room.</h3>
            <HostUrl
              id={id}
              copyId={() => {
                copyToClipboard(id, (message: string, type: Number) =>
                  openToast(message, type)
                );
              }}
              setId={() => {
                setID(resetId(id));
                openToast("Deleted", -1);
              }}
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
          autoPlay
          // muted={muted}
        ></audio>
      </IonContent>
    </IonPage>
  );
};

export default Tab2;
