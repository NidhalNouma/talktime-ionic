import React, { useState, useEffect, useContext } from "react";
import Screen1 from "./screen1";
import Screen2 from "./screen2";
import Screenf from "./screenf";
import { IonSpinner } from "@ionic/react";

import { postPhoto, uid } from "../../hooks/Photos";
import { ShowToast } from "../../App";

interface sProps {}

const PhotosScreens: React.FC<sProps> = ({}) => {
  const { openToast } = useContext(ShowToast);
  const { getId, setIdToStorqge, resetId } = uid("photo");

  const [url, setUrl] = useState<any>(null);
  const [img, setImg] = useState(null);
  const [date, setDate] = useState(null);

  useEffect(() => {
    getId(setUrl);
  }, []);

  useEffect(() => {
    if (url) setIdToStorqge(url.id);
  }, [url]);

  useEffect(() => {
    if (img) setUrl(null);
    if (img && date)
      postPhoto(img, date, (u: any) => {
        if (u) setUrl(u);
        else openToast("Image too big!", -1);
        setImg(null);
        setDate(null);
      });
  }, [img, date]);

  return (
    <React.Fragment>
      {!img && !url ? (
        <Screen1 setImg={setImg} />
      ) : !date && !url ? (
        <Screen2 setDate={setDate} back={() => setImg(null)} />
      ) : url ? (
        <Screenf
          setImg={setImg}
          url={url.id}
          remove={() => {
            resetId(url.id);
            setUrl(null);
            setImg(null);
            setDate(null);
          }}
        />
      ) : (
        <IonSpinner
          className="spinner"
          style={{ margin: "auto" }}
          name="dots"
        />
      )}
    </React.Fragment>
  );
};

export default PhotosScreens;
