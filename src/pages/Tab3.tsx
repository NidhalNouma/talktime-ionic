// import { useParams } from "react-router-dom";

import { IonContent, IonPage } from "@ionic/react";
import Nav from "../components/navbar/Nav";
import PhotosScreens from "../components/photosViews";

// import { ShowToast } from "../App";
import "./Tab3.css";

interface tabProps {}

const Tab3: React.FC<tabProps> = ({}) => {
  return (
    <IonPage>
      <IonContent fullscreen>
        <div className="App">
          <Nav block={() => {}} />
          <PhotosScreens />
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Tab3;
