import { useState, useEffect, useRef } from "react";
const RecordRTC = require("recordrtc");

function Record() {
  const [audio, setAudio] = useState(null);
  const [lstream, setLstream] = useState<any>(null);
  const recorder = useRef<any>(null);

  const start = async () => {
    let stream = await navigator.mediaDevices.getUserMedia({
      audio: true,
    });

    setLstream(stream);
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

  return { audio, start, resume, pause, stop, stream: lstream };
}

export default Record;

export function CRecord(id: string) {
  const { audio, start, pause, resume, stop, stream } = Record();
  const [record, setRecord] = useState(id ? 1 : -1);
  const [pauseRecording, setPauseRecording] = useState(false);
  const [audioUrl, setAudioUrl] = useState<any>(null);

  useEffect(() => {
    if (record === 1) {
      start();
    } else if (record === 0) {
      stop();
    }
  }, [record]);

  useEffect(() => {
    if (audio) setAudioUrl(URL.createObjectURL(audio));
  }, [audio]);

  useEffect(() => {
    if (pauseRecording) pause();
    else if (record === 1 && !pauseRecording) resume();
  }, [pauseRecording]);

  return {
    stream,
    audio,
    audioUrl,
    record,
    setRecord,
    pauseRecording,
    setPauseRecording,
  };
}
