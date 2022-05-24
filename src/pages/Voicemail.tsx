import { useContext } from "react";
import { useParams } from "react-router-dom";

import { IonContent, IonPage } from "@ionic/react";
import Nav from "../components/navbar/Nav";

import { ShowToast } from "../App";
import "./Voicemail.css";

interface tabProps {}

const Voicemail: React.FC<tabProps> = ({}) => {
  type params = {
    id: string;
  };
  const { id } = useParams<params>();
  const { openToast } = useContext(ShowToast);

  return (
    <IonPage>
      <IonContent fullscreen>
        <div className="App">
          <Nav block={() => {}} />
          <div className="ion-text-center ion-margin-top">
            <h3>{`You have ${13} messages.`}</h3>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Voicemail;
