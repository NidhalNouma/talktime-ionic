import React, { useContext, useState, useEffect } from "react";
import { SnapButton } from "../../Buttons/CallButton";
import Editor from "../editor";
import Url from "./URL/Url";

import { copyToClipboard } from "../../../hooks/Host";
import { ShowToast } from "../../../App";

import "./index.css";

interface sProps {
  encodeImageFileAsURL: Function;
  setImg: Function;
  remove: Function;
  url: string;
}

const Screenf: React.FC<sProps> = ({
  encodeImageFileAsURL,
  setImg,
  remove,
  url,
}) => {
  const { openToast } = useContext(ShowToast);
  const id = url;

  const [rImg, setRImg] = useState(null);
  const [fImg, setFImg] = useState(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (rImg) setOpen(true);
  }, [rImg]);

  useEffect(() => {
    let interval: any = null;
    if (fImg) {
      if (open) setOpen(false);
      interval = setInterval(() => {
        setImg(fImg);
      }, 200);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [fImg]);

  return (
    <React.Fragment>
      <div className="ion-text-center ion-margin-top full-width">
        <h3>Collect photo feedback.</h3>
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
      <Editor img={rImg} setImg={setFImg} open={open} setOpen={setOpen} />
    </React.Fragment>
  );
};

export default Screenf;
