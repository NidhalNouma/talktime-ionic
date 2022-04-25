import "./index.css";
import { IonIcon } from "@ionic/react";
import { copy, refresh } from "ionicons/icons";

interface propsCallButton {
  id: String;
  setId: React.MouseEventHandler;
  copyId: React.MouseEventHandler;
}

const HostUrl: React.FC<propsCallButton> = ({ id, setId, copyId }) => {
  // console.log("rst ", rstream, lstream);

  return (
    <div className="hostLink">
      <button className="buttoni" onClick={setId}>
        <IonIcon icon={refresh} color="medium" className="iconi" />
      </button>
      <h3>{id}</h3>
      <button className="buttoni" onClick={copyId}>
        <IonIcon icon={copy} color="medium" className="iconi" />
      </button>
    </div>
  );
};

export default HostUrl;
