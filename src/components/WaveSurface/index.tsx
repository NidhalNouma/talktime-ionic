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

const Wavei = require("wave-visualizer");

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
  // const audioRef = useRef<any>(null);

  // useEffect(() => {
  //   if (plays && audioRef.current) audioRef.current.play();
  //   else if (!plays && audioRef.current) audioRef.current.pause();
  // }, [plays, audioRef]);

  useEffect(() => {
    return () => {
      w.current?.destroy();
      w.current?.unAll();
    };
  }, []);

  useEffect(() => {
    if (w.current) {
      if (plays && !w.current.isPlaying()) {
        w.current.play();
      } else if (!plays && w.current.isPlaying()) w.current.pause();
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
        // container: wave.current,
        waveColor: "#383a3e",
        progressColor: "#5da1fa",
        responsive: true,
        // partialRender: true,
        height: 120,
        // mediaControls: true,
        xhr: {
          cache: "default",
          mode: "no-cors",
          method: "GET",
          credentials: "include",
        },
      });
    }

    return () => w?.current?.destroy();
  }, [wave, audio]);

  useEffect(() => {
    if (w) {
      w.current.on("ready", () => {
        // w.current.playPause();
        w.current.setVolume(1);
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
            <button className="w-button" onClick={() => setPlays(!plays)}>
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
