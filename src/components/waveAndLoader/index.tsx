import "./index.css";

import { IonSpinner } from "@ionic/react";
import Wave from "./Wave";

interface propsCallButton {
  type: Number;
  lstream: any;
  rstream: any;
}

const WaveAndLoader: React.FC<propsCallButton> = ({
  type,
  lstream,
  rstream,
}) => {
  // console.log("rst ", rstream, lstream);

  return (
    <div className="waveAndLoader">
      {type === 1 ? (
        <IonSpinner className="spinner" name="dots" />
      ) : type === 2 && rstream?.active ? (
        <Wave lstream={lstream} stream={rstream} />
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default WaveAndLoader;
