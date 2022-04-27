import React, { useContext } from "react";
import { SnapButton } from "../../Buttons/CallButton";
import Url from "./URL/Url";

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

  return (
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
          encodeImageFileAsURL(img, setImg);
        }}
        name="Snap"
      />
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
