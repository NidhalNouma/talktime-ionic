import { useContext, Fragment } from "react";
import { useHistory } from "react-router-dom";

import { IonContent, IonPage } from "@ionic/react";
import Nav from "../components/navbar/Nav";
import { CopyButton } from "../components/Buttons/CallButton";
import Wave from "../components/WaveSurface";
import { deleteAudio, copyToClipboard } from "../hooks/Audio";
import { UserContext, getUser } from "../hooks/User";

import { ShowToast } from "../App";
import "./Talk.css";

interface tabProps {}

const Talk: React.FC<tabProps> = ({}) => {
  const history = useHistory();
  const { openToast } = useContext(ShowToast);
  const { user, setUser } = useContext<any>(UserContext);

  return (
    <IonPage>
      <IonContent fullscreen>
        <div className="App">
          <Nav block={() => {}} />
          <div
            className="ion-text-center ion-margin-top full-width"
            style={{ marginBottom: "auto" }}
          >
            {<h3>{"Tap 'Copy link' then share it to gather feedback."}</h3>}
          </div>

          <Fragment>
            {user?.audio && (
              <Wave
                audio={user?.audioDoc?.audioUrl}
                isBlob={true}
                ida={user.audio}
                deletee={true}
                onDelete={() => {
                  deleteAudio(user.id, user.audio).then((r: any) => {
                    getUser(user.id).then((r) => {
                      setUser(r?.data);
                      openToast("Deleted", 1);
                      history.push("/talk");
                    });
                  });
                }}
              />
            )}

            <CopyButton
              onClick={() =>
                copyToClipboard(user.audio, (message: string, type: Number) =>
                  openToast(message, type)
                )
              }
              name={"Copy link"}
            />
          </Fragment>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Talk;
