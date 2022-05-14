import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { IonContent, IonPage } from "@ionic/react";
import PhotosScreens from "../components/photosViews";
import FlipClockCountdown from "@leenguyen/react-flip-clock-countdown";
import "@leenguyen/react-flip-clock-countdown/dist/index.css";
import { getPhoto } from "../hooks/Photos";
import { IonSpinner } from "@ionic/react";

import PModel from "../components/pmodel";
import Swip from "../components/photosViews/swiper";

import "./photo.css";

interface tabProps {}

const Photo: React.FC<tabProps> = ({}) => {
  type params = {
    id: string;
  };
  const { id } = useParams<params>();
  let history = useHistory();
  const [url, setUrl] = useState<any>(null);
  const [curl, setCUrl] = useState<any>(null);
  const [reveal, setReveal] = useState(false);

  const [show, setShow] = useState(false);

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

  useEffect(() => {
    // if (curl) setUrl(curl);
  }, [curl]);

  return (
    <IonPage>
      <IonContent fullscreen>
        <div className="App AppP">
          {!url ? (
            <IonSpinner
              className="spinner"
              style={{ margin: "auto" }}
              name="dots"
            />
          ) : (
            <React.Fragment>
              <div className="rev-div">
                <h5>{!reveal ? "Photo appears in" : "Photo disapears in"}</h5>
                <FlipClockCountdown
                  to={reveal ? url.expire : url.reveal}
                  className="flip-clock"
                  onComplete={() => {
                    if (!reveal) setReveal(true);
                    else history.push("/photos");
                  }}
                />
              </div>
              <div
                className="div-img"
                onClick={(e: any) => {
                  console.log(e.target.className);
                  if (
                    e.target.className === "div-img" ||
                    e.target.className === "contain-d"
                  )
                    url && setShow(true);
                }}
              >
                <img
                  src={url.url}
                  alt="img"
                  className={`${!reveal ? "blur" : ""} img`}
                />
                {!reveal && (
                  <div className="contain-d">
                    <PhotosScreens url={curl} setUrl={setCUrl} />
                  </div>
                )}
              </div>
            </React.Fragment>
          )}
        </div>

        {url && reveal && (
          <PModel open={show} setOpen={setShow}>
            <Swip urls={url.url} close={() => setShow(false)} />
          </PModel>
        )}
      </IonContent>
    </IonPage>
  );
};

export default Photo;
