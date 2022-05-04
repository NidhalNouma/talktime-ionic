import React, { useContext, useState, useEffect } from "react";
import { SnapButton } from "../../Buttons/CallButton";
import Url from "./URL/Url";

import { UIEvent, PhotoEditorSDKUI, CanvasAction } from "photoeditorsdk";

import { photoLicense } from "../../../constant";

import { copyToClipboard } from "../../../hooks/Host";
import { ShowToast } from "../../../App";

import "./index.css";

interface sProps {
  setImg: Function;
  remove: Function;
  url: string;
}

const Screenf: React.FC<sProps> = ({ setImg, remove, url }) => {
  const { openToast } = useContext(ShowToast);
  const id = url;

  const [rImg, setRImg] = useState(null);

  const initEditor = async () => {
    const editor = await PhotoEditorSDKUI.init({
      container: "#editor",
      image: rImg!,
      layout: "basic",
      license: JSON.stringify(photoLicense),
      mainCanvasActions: [
        CanvasAction.UNDO,
        CanvasAction.REDO,
        CanvasAction.CLOSE,
        CanvasAction.EXPORT,
      ],
    });
    console.log("PhotoEditorSDK for Web is ready!");
    editor.on(UIEvent.EXPORT, (imageSrc) => {
      console.log("EXPORTED ...");
      console.log("Exported ", imageSrc.src);
      setImg(imageSrc.src);
    });

    editor.on(UIEvent.CLOSE, (imageSrc) => {
      console.log("CLOSED ...");
      setRImg(null);
    });
  };

  useEffect(() => {
    if (rImg) initEditor();
  }, [rImg]);

  return (
    <React.Fragment>
      {rImg ? (
        <div
          id="editor"
          style={{
            width: "100%",
            height: "100%",
            position: "relative",
            marginTop: "1rem",
          }}
        />
      ) : (
        <React.Fragment>
          <div className="ion-text-center ion-margin-top full-width">
            <h3>Send photos to the future.</h3>
            <Url
              id={id}
              removeId={() => {
                remove();
              }}
              copyId={() => {
                copyToClipboard(
                  id,
                  (message: string, type: Number) => openToast(message, type),
                  true
                );
              }}
            />
          </div>

          <SnapButton
            onSelect={(img: any) => {
              console.log(img);
              encodeImageFileAsURL(img, setRImg);
            }}
            name="Snap"
          />
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export default Screenf;

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
