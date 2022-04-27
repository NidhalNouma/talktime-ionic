import React from "react";
import { SnapButton } from "../../Buttons/CallButton";
import "./index.css";

interface sProps {
  setImg: Function;
}

const Screen1: React.FC<sProps> = ({ setImg }) => {
  return (
    <React.Fragment>
      <div className="ion-text-center ion-margin-top">
        <h3>Send photos to the future.</h3>
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

export default Screen1;

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
