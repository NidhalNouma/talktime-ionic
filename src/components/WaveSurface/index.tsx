import React, { useRef, useEffect, useState } from "react";
import WaveSurfer from "wavesurfer.js";

import { IonIcon } from "@ionic/react";
import {
  play,
  pause,
  trashOutline,
  thumbsUp,
  thumbsDown,
  flag,
  thumbsUpOutline,
  thumbsDownOutline,
  flagOutline,
  arrowRedoOutline,
} from "ionicons/icons";

import "./index.css";

const Wavei = require("wave-visualizer");

interface propsWave {
  audio: string;
  ida: string;
  isBlob: boolean;
  deletee?: boolean | undefined;
  like?: boolean | undefined;
  dislike?: boolean | undefined;
  flaged?: boolean | undefined;
  copy?: boolean | undefined;
  onDelete?: Function;
  onLike?: Function;
  onDislike?: Function;
  onFlag?: Function;
  onCopy?: Function;

  setIsReady?: Function;
}

let init = 0;

const colors = [
  "#383a3e",
  "#f44336",
  "#e91e63",
  "#9c27b0",
  "#673ab7",
  "#3f51b5",
  "#2196f3",
  "#03a9f4",
  "#00bcd4",
  "#009688",
  "#4caf50",
  "#8bc34a",
  "#cddc39",
  "#ffeb3b",
  "#ffc107",
  "#ff9800",
  "#ff5722",
  "#795548",
  "#9e9e9e",
  "#607d8b",
];

const Wave: React.FC<propsWave> = ({
  audio,
  ida,
  isBlob,
  deletee,
  like,
  dislike,
  flaged,
  copy,
  onDelete,
  onLike,
  onDislike,
  onFlag,
  onCopy,
  setIsReady,
}) => {
  const wave = useRef<any>(null);
  const [blob, setBlob] = useState<any>(null);
  const [plays, setPlays] = useState(false);

  const w = useRef<any>(null);

  // useEffect(() => {
  //   return () => {
  //      w.current?.destroy();
  //      w.current?.unAll();
  //   };
  // }, []);

  useEffect(() => {
    console.log("", ida);

    return () => {
      w.current?.empty();
      w.current?.destroy();
      w.current?.unAll();
      setPlays(false);
    };
  }, [ida]);

  useEffect(() => {
    if (isBlob)
      fetch(audio)
        .then((res) => res.blob()) // Gets the response and returns it as a blob
        .then((blob) => {
          let objectURL = URL.createObjectURL(blob);
          setBlob(objectURL);
        });
  }, [audio, isBlob]);

  useEffect(() => {
    if (wave.current) {
      w.current = WaveSurfer.create({
        container: `#waveform-${ida}`,
        // container: wave.current,
        waveColor: colors[Math.floor(Math.random() * colors.length)],
        // waveColor: colors[0],
        progressColor: "#5da1fa",
        responsive: true,
        partialRender: true,
        height: 120,
        barHeight: 2,
        barMinHeight: 1.5,
        // barWidth: 1,
        xhr: {
          cache: "default",
          mode: "no-cors",
          method: "GET",
          credentials: "include",
        },
      });

      w.current.on("ready", () => {
        console.log("ready wave ...");
        setIsReady && setIsReady(true);
        if (init > 0) w.current.play();
      });

      w.current.on("error", (err: any) => console.log("wave err ... ", err));
      w.current.on("destroy", () => {
        console.log("destroy wave ...");
        setIsReady && setIsReady(false);
      });

      w.current.on("finish", () => {
        setPlays(false);
      });

      w.current.on("pause", () => {
        setPlays(false);
      });

      w.current.on("play", () => {
        setPlays(true);
        init++;
      });
    }

    // return () => {
    //   // w.current?.destroy();
    //   setPlays(false);
    // };
  }, [wave, ida]);

  useEffect(() => {
    if (w.current && blob) {
      w.current.load(blob);
    }
  }, [w, blob]);

  return (
    <React.Fragment>
      <div className="wave-div">
        <div className="overlay-div">
          <div
            onClick={() => w.current?.play()}
            id={`waveform-${ida}`}
            className="waveform"
            ref={wave}
          ></div>

          {init === 0 && (
            <div className="overlay-btn">
              <IonIcon
                icon={plays ? pause : play}
                color="medium"
                className="icon-o"
              />
            </div>
          )}
        </div>
        {/* <audio
          id={`audio-${ida}`}
          ref={audioRef}
          src={blob}
          controls
          style={{ display: "none" }}
        ></audio> */}
        {init > 0 && (
          <div className="waveform-buttons">
            {like !== undefined && (
              <button className="w-button" onClick={() => onLike && onLike()}>
                <IonIcon
                  icon={like ? thumbsUp : thumbsUpOutline}
                  color="medium"
                  className="iconi"
                />
              </button>
            )}
            {copy !== undefined && (
              <button className="w-button" onClick={() => onCopy && onCopy()}>
                <IonIcon
                  icon={arrowRedoOutline}
                  color="medium"
                  className="iconi"
                />
              </button>
            )}

            <button
              className="w-button"
              onClick={() => {
                w.current?.playPause();
                setPlays((v) => !v);
              }}
            >
              <IonIcon
                icon={plays ? pause : play}
                color="medium"
                className="iconi"
              />
            </button>
            {deletee !== undefined && (
              <button
                className="w-button"
                onClick={() => onDelete && onDelete()}
              >
                <IonIcon icon={trashOutline} color="medium" className="iconi" />
              </button>
            )}
            {flaged !== undefined && (
              <button className="w-button" onClick={() => onFlag && onFlag()}>
                <IonIcon
                  icon={flaged ? flag : flagOutline}
                  color="medium"
                  className="iconi"
                />
              </button>
            )}
            {dislike !== undefined && (
              <button
                className="w-button"
                onClick={() => onDislike && onDislike()}
              >
                <IonIcon
                  icon={dislike ? thumbsDown : thumbsDownOutline}
                  color="medium"
                  className="iconi"
                />
              </button>
            )}
          </div>
        )}
      </div>
    </React.Fragment>
  );
};

const Wave1: React.FC<propsWave> = ({
  audio,
  ida,
  isBlob,
  deletee,
  like,
  dislike,
  flaged,
  onDelete,
  onLike,
  onDislike,
  onFlag,
}) => {
  const waveRef = useRef<any>(null);
  const audioRef = useRef<any>(null);
  const [blob, setBlob] = useState<any>(null);
  const [plays, setPlays] = useState(false);

  const [lwave, setLwave] = useState<any>(new Wavei());

  useEffect(() => {
    // setLwave(new Wavei());
    if (isBlob)
      fetch(audio)
        .then((res) => res.blob()) // Gets the response and returns it as a blob
        .then((blob) => {
          let objectURL = URL.createObjectURL(blob);
          setBlob(objectURL);
        });

    return () => {
      setPlays(false);
    };
  }, [audio]);

  useEffect(() => {
    if (lwave && audioRef.current && waveRef.current) {
      lwave.fromElement(`audio-${ida}`, `wave-${ida}`, {
        type: "shine",
        colors: ["rgba(45, 134, 233, 1)", "white", "blue"],
      });
    }

    return () => {
      lwave.stopStream();
      // setLwave(null);
    };
  }, [lwave, audioRef, waveRef, audio]);

  useEffect(() => {
    if (plays && audioRef.current) {
      audioRef.current.play();
      init++;
    } else if (!plays && audioRef.current) audioRef.current.pause();
  }, [plays, audioRef]);

  return (
    <React.Fragment>
      <div className="wave-div">
        <audio
          id={`audio-${ida}`}
          ref={audioRef}
          src={blob}
          controls
          style={{ display: "none" }}
        ></audio>
        <canvas
          ref={waveRef}
          style={{ maxHeight: "110px" }}
          id={`wave-${ida}`}
        ></canvas>
        <div className="waveform-buttons">
          {like !== undefined && (
            <button className="w-button" onClick={() => onLike && onLike()}>
              <IonIcon
                icon={like ? thumbsUp : thumbsUpOutline}
                color="medium"
                className="iconi"
              />
            </button>
          )}
          <button className="w-button" onClick={() => setPlays(!plays)}>
            <IonIcon
              icon={plays ? pause : play}
              color="medium"
              className="iconi"
            />
          </button>
          {deletee !== undefined && (
            <button className="w-button" onClick={() => onDelete && onDelete()}>
              <IonIcon icon={trashOutline} color="medium" className="iconi" />
            </button>
          )}
          {flaged !== undefined && (
            <button className="w-button" onClick={() => onFlag && onFlag()}>
              <IonIcon
                icon={flaged ? flag : flagOutline}
                color="medium"
                className="iconi"
              />
            </button>
          )}
          {dislike !== undefined && (
            <button
              className="w-button"
              onClick={() => onDislike && onDislike()}
            >
              <IonIcon
                icon={dislike ? thumbsDown : thumbsDownOutline}
                color="medium"
                className="iconi"
              />
            </button>
          )}
        </div>
      </div>
    </React.Fragment>
  );
};

export default Wave;
