import { useContext, useEffect, useState, Fragment } from "react";
// import { useParams, useHistory, useLocation } from "react-router-dom";

import { RecordButton } from "../Buttons/CallButton";
import SingleWave from "../waveAndLoader/SingleWave";
import { IonSpinner } from "@ionic/react";

// import { CRecord } from "../../hooks/Record";
// import { upload, deleteAudio, copyToClipboard } from "../../hooks/Audio";
// import { UserContext, getUser } from "../../hooks/User";

// import { ShowToast } from "../../App";
import "./index.css";

interface tabProps {
  time: string;
  stream: MediaStream;
  record: number;
  setRecord: Function;
  pauseRecording: boolean;
  setPauseRecording: Function;
}

const Record: React.FC<tabProps> = ({
  time,
  stream,
  record,
  setRecord,
  pauseRecording,
  setPauseRecording,
}) => {
  //   type params = {
  //     id: string;
  //   };
  //   const { id } = useParams<params>();
  //   const history = useHistory();
  //   let { search } = useLocation();
  //   const query = new URLSearchParams(search);
  //   const toUser = query.get("to");
  //   const { openToast } = useContext(ShowToast);
  //   const { user, setUser } = useContext<any>(UserContext);
  // console.log(user);

  //   const {
  //     time,
  //     stream,
  //     audio,
  //     audioUrl,
  //     record,
  //     setRecord,
  //     pauseRecording,
  //     setPauseRecording,
  //   } = CRecord(id);

  //   useEffect(() => {
  //     if (audioUrl && user) {
  //       upload(audio, user.id, id, toUser).then((r) => {
  //         getUser(user.id).then((r) => {
  //           setUser(r?.data);
  //           openToast(id ? "Sent" : "Posted", 1);
  //           if (id) history.goBack();
  //           else {
  //             setRecording(false);
  //             history.push("/share-audio");
  //           }
  //         });
  //       });
  //     }
  //   }, [audioUrl]);

  const [recording, setRecording] = useState(false);

  useEffect(() => {
    if (record === 1) setRecording(true);
  }, [record]);

  return (
    <Fragment>
      <div
        className="ion-text-center ion-margin-top full-width"
        style={{ marginBottom: "auto" }}
      >
        {
          <h3>
            {record === 1 ? time : "Record a message to start an audio survey."}
          </h3>
        }
      </div>
      {record === 1 && stream && <SingleWave lstream={stream} />}

      {recording && record !== 1 ? (
        <IonSpinner
          className="spinner"
          style={{ margin: "auto" }}
          name="dots"
        />
      ) : (
        <Fragment>
          <RecordButton
            onClick={() => setRecord(record === 1 ? 0 : 1)}
            name={record === 1 ? "End" : "Record"}
            muted={pauseRecording}
            mute={() => setPauseRecording(!pauseRecording)}
          />
        </Fragment>
      )}
    </Fragment>
  );
};

export default Record;
