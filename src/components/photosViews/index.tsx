import React, { useState, useEffect, useContext } from "react";
import Screen1 from "./screen1";
import Screen2 from "./screen2";
import Screenf from "./screenf";
import { IonSpinner } from "@ionic/react";
import imageCompression from "browser-image-compression";

import { postPhoto, uid } from "../../hooks/Photos";
import { ShowToast } from "../../App";

interface sProps {
  url: any;
  setUrl: Function;
}

const PhotosScreens: React.FC<sProps> = ({ url, setUrl }) => {
  const { openToast } = useContext(ShowToast);
  const { getId, setIdToStorqge, resetId } = uid("photo");

  // const [url, setUrl] = useState<any>(null);
  const [img, setImg] = useState<any>(null);
  const [date, setDate] = useState(null);

  useEffect(() => {
    getId(setUrl);
  }, []);

  useEffect(() => {
    if (img) {
      var stringLength = img.length - "data:image/png;base64,".length;

      var sizeInBytes = 4 * Math.ceil(stringLength / 3) * 0.5624896334383812;
      var sizeInKb = sizeInBytes / 1000;
      var sizeInMb = sizeInKb / 1024;
      console.log(sizeInMb);
      if (sizeInMb > 6) {
        const options = {
          maxSizeMB: 6,
          // maxWidthOrHeight: 1920,
          useWebWorker: true,
        };
        imageCompression.getFilefromDataUrl(img, "img").then((imgFile) => {
          imageCompression(imgFile, options)
            .then(function (compressedFile) {
              console.log(compressedFile);

              return encodeImageFileAsURL(compressedFile, setImg); // write your own logic
            })
            .catch(function (error) {
              console.log(error.message); // output: I just want to stop
            });
        });
      }
    }
  }, [img]);

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
        <Screen1 setImg={setImg} encodeImageFileAsURL={encodeImageFileAsURL} />
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
          encodeImageFileAsURL={encodeImageFileAsURL}
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

function encodeImageFileAsURL(file: any, setImg: Function) {
  var reader = new FileReader();
  reader.onloadend = function () {
    let nimg = reader?.result?.toString();
    // .replace(/^data:image\/(jpg|gif|png|bmp|heic|jpeg);base64,/, "");
    console.log("RESULT", nimg);
    setImg(nimg);
  };
  reader.readAsDataURL(file);
}
