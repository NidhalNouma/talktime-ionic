import React, { useRef, useEffect } from "react";
import WaveSurfer from "wavesurfer.js";

import "./index.css";

interface propsWave {
  audio: string;
}

const Wave: React.FC<propsWave> = ({ audio }) => {
  const wave = useRef<any>(null);

  useEffect(() => {
    if (wave.current) {
      wave.current = WaveSurfer.create({
        container: "#waveform",
        waveColor: "#383a3e",
        progressColor: "#5da1fa",
      });

      wave.current.on("ready", () => {
        wave.current.play();
      });
    }
  }, [wave]);

  useEffect(() => {
    if (audio && wave.current) wave.current.load(audio);
  }, [audio]);

  return (
    <React.Fragment>
      <div onClick={() => wave.current.play()} id="waveform" ref={wave}></div>
    </React.Fragment>
  );
};

export default Wave;
