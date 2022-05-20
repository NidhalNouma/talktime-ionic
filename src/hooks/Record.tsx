import { useState, useEffect, useRef } from "react";
const RecordRTC = require("recordrtc");

const st = "dialing";
const ss = sessionStorage.getItem(st);
const ist = ss ? parseInt(ss) : 0;

function Record() {
  const [audio, setAudio] = useState(null);
  const recorder = useRef<any>(null);

  const start = async () => {
    let stream = await navigator.mediaDevices.getUserMedia({
      audio: true,
    });

    recorder.current = new RecordRTC(stream, {
      type: "video",
    });

    recorder.current.startRecording();
  };

  const pause = () => {
    if (recorder.current) {
      recorder.current.pauseRecording();
    }
  };

  const stop = () => {
    if (recorder.current) {
      recorder.current.stopRecording(() => {
        setAudio(recorder.current.getBlob());
      });
    }
  };

  const resume = () => {
    if (recorder.current) {
      recorder.current.resumeRecording();
    }
  };

  const audioUrl = () => (audio ? URL.createObjectURL(audio) : null);

  return { audio, start, resume, pause, stop, audioUrl };
}

export default Record;

export function CRecord() {
  const { audio, start, pause, resume, stop, audioUrl } = Record();
  const [record, setRecord] = useState(-1);
  const [pauseRecording, setPauseRecording] = useState(false);

  useEffect(() => {
    if (record === 1) {
      start();
    } else if (record === 0) {
      stop();
    }
  }, [record]);

  useEffect(() => {
    console.log("record", audio, audioUrl());
  }, [audio]);

  useEffect(() => {
    if (pauseRecording) pause();
    else if (record === 1 && !pauseRecording) resume();
  }, [pauseRecording]);

  return { audio, record, setRecord, pauseRecording, setPauseRecording };
}
