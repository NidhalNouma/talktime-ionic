import React, { useEffect, useState } from "react";
import { SnapButton } from "../../Buttons/CallButton";
import Editor from "../editor";

import "./index.css";

interface sProps {
  encodeImageFileAsURL: Function;
  setImg: Function;
}

const Screen1: React.FC<sProps> = ({ encodeImageFileAsURL, setImg }) => {
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
      <React.Fragment>
        <div className="ion-text-center ion-margin-top">
          <h3>Collect photo feedback.</h3>
        </div>
        <SnapButton
          onSelect={(img: any) => {
            console.log(img);
            encodeImageFileAsURL(img, setRImg);
          }}
          name="Snap"
        />
      </React.Fragment>
      <Editor img={rImg} setImg={setFImg} open={open} setOpen={setOpen} />
    </React.Fragment>
  );
};

export default Screen1;
