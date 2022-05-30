import "./index.css";
import { IonIcon } from "@ionic/react";
import {
  trash,
  copy,
  refresh,
  flag,
  flagOutline,
  thumbsDownOutline,
  thumbsUpOutline,
  thumbsDown,
  thumbsUp,
} from "ionicons/icons";

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

interface propsHUi {
  id: String;
  liked: boolean;
  disliked: boolean;
  flagged: boolean;
  likeFn: React.MouseEventHandler;
  dislikeFn: React.MouseEventHandler;
  flagFn: React.MouseEventHandler;
  copyId: React.MouseEventHandler;
}

export const HostUrli: React.FC<propsHUi> = ({
  id,
  liked,
  disliked,
  flagged,
  likeFn,
  dislikeFn,
  flagFn,
  copyId,
}) => {
  return (
    <div className="hostLink">
      <div className="sep">
        <button className="buttonil" onClick={dislikeFn}>
          <IonIcon
            icon={disliked ? thumbsDown : thumbsDownOutline}
            color="medium"
            className="iconi"
          />
        </button>
        <button className="buttoni" onClick={flagFn}>
          <IonIcon
            icon={flagged ? flag : flagOutline}
            color="medium"
            className="iconi"
          />
        </button>
      </div>
      <h3>{id}</h3>
      <div className="sep">
        <button className="buttoni" onClick={copyId}>
          <IonIcon icon={copy} color="medium" className="iconi" />
        </button>
        <button className="buttonir" onClick={likeFn}>
          <IonIcon
            icon={liked ? thumbsUp : thumbsUpOutline}
            color="medium"
            className="iconi"
          />
        </button>
      </div>
    </div>
  );
};

export const HostUrlAudio: React.FC<propsCallButton> = ({
  id,
  setId,
  copyId,
}) => {
  // console.log("rst ", rstream, lstream);

  return (
    <div className="hostLink">
      <button className="buttoni" onClick={setId}>
        <IonIcon icon={trash} color="medium" className="iconi" />
      </button>
      <h3>{id}</h3>
      <button className="buttoni" onClick={copyId}>
        <IonIcon icon={copy} color="medium" className="iconi" />
      </button>
    </div>
  );
};

interface propsHUVM {
  id: String;
  liked: boolean;
  disliked: boolean;
  deleted?: boolean;
  likeFn: React.MouseEventHandler;
  dislikeFn: React.MouseEventHandler;
  deleteFn: React.MouseEventHandler;
  copyId: React.MouseEventHandler;
}

export const HostUrlVM: React.FC<propsHUVM> = ({
  id,
  liked,
  disliked,
  deleted,
  likeFn,
  dislikeFn,
  deleteFn,
  copyId,
}) => {
  return (
    <div className="hostLink">
      <div className="sep">
        <button className="buttonil" onClick={dislikeFn}>
          <IonIcon
            icon={disliked ? thumbsDown : thumbsDownOutline}
            color="medium"
            className="iconi"
          />
        </button>
        <button className="buttoni" onClick={deleteFn}>
          <IonIcon icon={trash} color="medium" className="iconi" />
        </button>
      </div>
      <h3>{id}</h3>
      <div className="sep">
        <button className="buttoni" onClick={copyId}>
          <IonIcon icon={copy} color="medium" className="iconi" />
        </button>
        <button className="buttonir" onClick={likeFn}>
          <IonIcon
            icon={liked ? thumbsUp : thumbsUpOutline}
            color="medium"
            className="iconi"
          />
        </button>
      </div>
    </div>
  );
};
