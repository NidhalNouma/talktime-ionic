import React, { useRef, useEffect, useState } from "react";
import WaveSurfer from "wavesurfer.js";

import "./index.css";

interface propsWave {
  audio: string;
  ida: string;
  isBlob: boolean;
}

const Wave: React.FC<propsWave> = ({ audio, ida, isBlob }) => {
  const wave = useRef<any>(null);
  const [blob, setBlob] = useState<any>(null);

  const w = useRef<any>(null);

  useEffect(() => {
    return () => {
      console.log("dd");
      w.current?.destroy();
    };
  }, []);

  useEffect(() => {
    if (isBlob)
      fetch(audio)
        .then((res) => res.blob()) // Gets the response and returns it as a blob
        .then((blob) => {
          let objectURL = URL.createObjectURL(blob);
          setBlob(objectURL);
        });
    return () => {
      console.log("dd", w);
      w?.current?.destroy();
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
        w.current.play();
      });

      w.current.on("error", (err: any) => console.log("wave err ... ", err));
      w.current.on("destroy", () => {
        w.current = null;
        console.log("destroy wave ...");
      });
    }

    if (w && blob) w.current.load(blob);
  }, [w, blob]);

  return (
    <React.Fragment>
      <div
        onClick={() => w.current?.play()}
        id={`waveform-${ida}`}
        className="waveform"
        ref={wave}
      ></div>
    </React.Fragment>
  );
};

export default Wave;
