import { useState } from "react";

import { IonContent, IonPage } from "@ionic/react";
import Nav from "../components/navbar/Nav";
import PhotosScreens from "../components/photosViews";

import { useParams, useHistory } from "react-router-dom";
import FlipClockCountdown from "@leenguyen/react-flip-clock-countdown";
import "@leenguyen/react-flip-clock-countdown/dist/index.css";

import "./Tab3.css";

interface tabProps {}

const Tab3: React.FC<tabProps> = ({}) => {
  const [url, setUrl] = useState<any>(null);
  const [reveal, setReveal] = useState(false);

  return (
    <IonPage>
      <IonContent fullscreen>
        <div className={`App ${url ? "AppP" : "AppD"}`}>
          {!url && <Nav block={() => {}} />}

          {url && (
            <div className="rev-div">
              <h5>{!reveal ? "Photo appears in" : "Photo disapears in"}</h5>
              <FlipClockCountdown
                to={reveal ? url.expire : url.reveal}
                className="flip-clock"
                onComplete={() => {
                  if (!reveal) setReveal(true);
                  // else history.push("/photos");
                }}
              />
            </div>
          )}

          <div className="div-img">
            {url && (
              <img
                src={url.url}
                alt="img"
                className={`${!reveal ? "blur" : ""} img`}
              />
            )}
            <div className="contain-d">
              {/* <PhotosScreens url={curl} setUrl={setCUrl} /> */}
              <PhotosScreens url={url} setUrl={setUrl} />
            </div>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Tab3;
