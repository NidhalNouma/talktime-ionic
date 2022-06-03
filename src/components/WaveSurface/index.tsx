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
} from "ionicons/icons";

import "./index.css";

interface propsWave {
  audio: string;
  ida: string;
  isBlob: boolean;
  deletee?: boolean | undefined;
  like?: boolean | undefined;
  dislike?: boolean | undefined;
  flaged?: boolean | undefined;
  onDelete?: Function;
  onLike?: Function;
  onDislike?: Function;
  onFlag?: Function;
}

let init = 0;

const Wave: React.FC<propsWave> = ({
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
  const wave = useRef<any>(null);
  const [blob, setBlob] = useState<any>(null);
  const [speed, setSpeed] = useState(1);
  const [plays, setPlays] = useState(false);

  const w = useRef<any>(null);

  useEffect(() => {
    return () => {
      w.current?.destroy();
      w.current?.unAll();
    };
  }, []);

  useEffect(() => {
    if (w.current) {
      if (plays && !w.current.isPlaying()) w.current.play();
      else if (!plays && w.current.isPlaying()) w.current.pause();
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
        // w.current.playPause();
        if (init > 0) w.current.play();
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

      w.current.on("pause", () => {
        if (plays) setPlays(false);
      });

      w.current.on("play", () => {
        if (!plays) setPlays(true);
        init++;
      });
    }

    if (w && blob) w.current.load(blob);
  }, [w, blob]);

  return (
    <React.Fragment>
      <div className="wave-div">
        <div
          // onClick={() => w.current?.play()}
          id={`waveform-${ida}`}
          className="waveform"
          ref={wave}
        ></div>
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
