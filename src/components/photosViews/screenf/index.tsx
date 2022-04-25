import React, { useContext } from "react";
import { SnapButton } from "../../Buttons/CallButton";
import Url from "./URL/Url";
import { URL } from "../../../constant";

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
  const id = URL + "/p/" + url;

  return (
    <React.Fragment>
      <div className="ion-text-center ion-margin-top">
        <h3>Send photo to the future.</h3>
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
          setImg(img);
        }}
        name="Snap"
      />
    </React.Fragment>
  );
};

export default Screenf;
