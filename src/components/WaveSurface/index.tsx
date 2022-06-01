import React, { useRef, useEffect, useState } from "react";
import WaveSurfer from "wavesurfer.js";

import { IonIcon } from "@ionic/react";
import { play, pause } from "ionicons/icons";

import "./index.css";

interface propsWave {
  audio: string;
  ida: string;
  isBlob: boolean;
}

const Wave: React.FC<propsWave> = ({ audio, ida, isBlob }) => {
  const wave = useRef<any>(null);
  const [blob, setBlob] = useState<any>(null);
  const [speed, setSpeed] = useState(1);
  const [plays, setPlays] = useState(false);

  const w = useRef<any>(null);

  useEffect(() => {
    return () => {
      w.current?.destroy();
    };
  }, []);

  useEffect(() => {
    if (w.current) {
      if (plays) w.current.play();
      else w.current.pause();
    }
  }, [plays, w.current]);

  useEffect(() => {
    if (w.current) {
      w.current.setPlaybackRate(speed);
    }
  }, [speed]);

  useEffect(() => {
    if (isBlob)
      fetch(audio)
        .then((res) => res.blob()) // Gets the response and returns it as a blob
        .then((blob) => {
          let objectURL = URL.createObjectURL(blob);
          setBlob(objectURL);
        });
    return () => {
      w?.current?.destroy();
      setPlays(false);
    };
  }, [audio]);

  useEffect(() => {
    if (wave.current) {
      w.current = WaveSurfer.create({
        container: `#waveform-${ida}`,
        waveColor: "#383a3e",
        progressColor: "#5da1fa",
        responsive: true,
        partialRender: true,
        height: 100,
        // mediaControls: true,
        xhr: {
          cache: "default",
          mode: "no-cors",
          method: "GET",
          credentials: "include",
          // headers: [
          //   { key: "cache-control", value: "no-cache" },
          //   { key: "pragma", value: "no-cache" },
          // ],
        },
      });
    }
  }, [wave, audio]);

  // useEffect(() => {
  //   if (!isBlob && audio && wave.current) wave.current.load(audio);
  // }, [audio, wave.current]);

  // useEffect(() => {
  //   console.log("blob", blob, wave.current);
  //   if (blob && audio && wave.current) wave.current.load(blob);
  // }, [blob, wave.current]);

  useEffect(() => {
    if (w) {
      w.current.on("ready", () => {
        // w.current.play();
        // setPlays(true);
      });

      w.current.on("error", (err: any) => console.log("wave err ... ", err));
      w.current.on("destroy", () => {
        w.current = null;
        console.log("destroy wave ...");
      });

      w.current.on("finish", () => {
        setPlays(false);
      });
    }

    if (w && blob) w.current.load(blob);
  }, [w, blob]);

  return (
    <React.Fragment>
      <div className="wave-div">
        <div
          onClick={() => w.current?.play()}
          id={`waveform-${ida}`}
          className="waveform"
          ref={wave}
        ></div>
        <div className="waveform-buttons">
          <button className="w-button" onClick={() => setPlays(!plays)}>
            <IonIcon
              icon={plays ? pause : play}
              color="medium"
              className="iconi"
            />
          </button>
          <button
            className={`w-button ${speed === 1 ? "w-button-c" : ""}`}
            onClick={() => {
              setSpeed(1);
            }}
          >
            1x
          </button>
          <button
            className={`w-button ${speed === 1.5 ? "w-button-c" : ""}`}
            onClick={() => {
              setSpeed(1.5);
            }}
          >
            1.5x
          </button>
          <button
            className={`w-button ${speed === 2 ? "w-button-c" : ""}`}
            onClick={() => {
              setSpeed(2);
            }}
          >
            2x
          </button>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Wave;
