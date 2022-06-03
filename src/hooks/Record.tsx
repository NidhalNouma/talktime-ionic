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
  const [sec, setSec] = useState(0);
  const [time, setTime] = useState("00:00");

  useEffect(() => {
    let intr: any = null;
    if (record === 1) {
      if (sec > 0) setSec(0);
      start();

      intr = setInterval(() => setSec((t) => t + 1), 1000);
    } else if (record === 0) {
      stop();
    }

    return () => {
      if (intr) clearInterval(intr);
    };
  }, [record]);

  useEffect(() => {
    if (sec >= 600) {
      setRecord(0);
      setSec(0);
    }

    const min = Math.floor(sec / 60);
    const secs = sec % 60;
    setTime(`${min < 10 ? "0" + min : min}:${secs < 10 ? "0" + secs : secs}`);
  }, [sec]);

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
    time,
  };
}
