import { useState, useEffect } from "react";

const st = "dialling";
const ss = sessionStorage.getItem(st);
const ist = ss ? parseInt(ss) : 0;

function Call(start: any) {
  const [state, setState] = useState<Number | any>(start !== 0 ? start : ist);
  const [btnText, setBtnText] = useState(
    ist === 1 || start !== 0 ? "Dialling" : "Call"
  );

  useEffect(() => {
    if (state === 1 && start !== 0) {
      sessionStorage.setItem(st, state);
    } else sessionStorage.setItem(st, "0");
  }, [state, start]);

  const click = function () {
    switch (state) {
      case 0: {
        setState(1);
        setBtnText("Dialling");
        break;
      }
      case 2: {
        setState(0);
        setBtnText("Call");
        break;
      }
      case 3: {
        setState(0);
        setBtnText("Call");
        break;
      }
      default: {
        setState(0);
        setBtnText("Call");
      }
    }
  };

  const answer = function () {
    console.log("answer call ...");
    setState(2);
    setBtnText("End");
  };

  const close = function () {
    console.log("call closed ...");
    setState(0);
    setBtnText("Call");
  };

  return { state, click, btnText, answer, close };
}

export default Call;

export function Mute(stream: any) {
  const [muted, setMuted] = useState<boolean>(false);

  function unmute() {
    muteMic(stream, true);
    setMuted(false);
  }

  function mute() {
    setMuted(!muted);
  }

  useEffect(() => {
    if (stream) muteMic(stream, !muted);
  }, [muted, stream]);

  return { muted, unmute, mute };
}

export function stopAudioOnly(stream: any) {
  if (stream) {
    stream.getTracks().forEach(function (track: any) {
      track.stop();
      console.log("st", stream);
    });
  }
}

export function muteMic(stream: any, mute: boolean) {
  stream?.getAudioTracks()?.forEach((track: any) => (track.enabled = mute));
}
