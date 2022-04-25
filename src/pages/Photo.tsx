import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { IonContent, IonPage } from "@ionic/react";
import Nav from "../components/navbar/Nav";
import PhotosScreens from "../components/photosViews";
import FlipClockCountdown from "@leenguyen/react-flip-clock-countdown";
import "@leenguyen/react-flip-clock-countdown/dist/index.css";
import { getPhoto } from "../hooks/Photos";
import { IonSpinner } from "@ionic/react";

// import { ShowToast } from "../App";
import "./photo.css";

interface tabProps {}

const Photo: React.FC<tabProps> = ({}) => {
  type params = {
    id: string;
  };
  const { id } = useParams<params>();
  let history = useHistory();
  const [url, setUrl] = useState<any>(null);
  const [reveal, setReveal] = useState(false);

  useEffect(() => {
    getPhoto(id, (u: any) => {
      if (u) setUrl(u);
      else history.push("/photos");
    });
  }, []);

  useEffect(() => {
    if (url) {
      const d = new Date();
      const dr = new Date(url.reveal);
      if (d >= dr) setReveal(true);
    }
  }, [url]);

  return (
    <IonPage>
      <IonContent fullscreen>
        <div className="App">
          <Nav block={() => {}} />
          {/* <PhotosScreens /> */}
          {!url ? (
            <IonSpinner
              className="spinner"
              style={{ margin: "auto" }}
              name="dots"
            />
          ) : (
            <React.Fragment>
              <FlipClockCountdown to={reveal ? url.expire : url.reveal} />
              <img
                src={url.url}
                alt="img"
                className={`${!reveal ? "blur" : ""} img`}
              />
            </React.Fragment>
          )}
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Photo;
