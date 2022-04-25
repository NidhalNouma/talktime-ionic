import "./index.css";
import { IonIcon } from "@ionic/react";
import { copy, trash } from "ionicons/icons";

interface propsUrl {
  id: String;
  removeId: React.MouseEventHandler;
  copyId: React.MouseEventHandler;
}

const Url: React.FC<propsUrl> = ({ id, removeId, copyId }) => {
  return (
    <div className="hostLink">
      <button className="buttoni" onClick={removeId}>
        <IonIcon icon={trash} color="medium" className="iconi" />
      </button>
      <h3>{id}</h3>
      <button className="buttoni" onClick={copyId}>
        <IonIcon icon={copy} color="medium" className="iconi" />
      </button>
    </div>
  );
};

export default Url;
