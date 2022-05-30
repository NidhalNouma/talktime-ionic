import { useState, useRef } from "react";
import "./callButton.css";

interface propsCallButton {
  onClick: React.MouseEventHandler;
  name: string;
  muted?: boolean;
  mute?: React.MouseEventHandler;

  next?: React.MouseEventHandler;
  prev?: React.MouseEventHandler;
}

const CallButton: React.FC<propsCallButton> = ({
  onClick,
  name,
  muted,
  mute,
}) => {
  return (
    <div className="callButton">
      {name === "End" && (
        <button
          onClick={mute}
          className={`button ${!muted ? "mute" : "unmute"}`}
        >
          {!muted ? "Mute" : "Unmute"}
        </button>
      )}
      <button onClick={onClick} className={`button ${name}`}>
        {name}
      </button>
    </div>
  );
};

export default CallButton;

interface propsSnapButton {
  // onClick: React.MouseEventHandler;
  onSelect: Function;
  name: string;
}

export const SnapButton: React.FC<propsSnapButton> = ({
  // onClick,
  onSelect,
  name,
}) => {
  const ref = useRef<any>(null);

  return (
    <div className="callButton">
      <button
        onClick={(e) => {
          if (ref.current) ref.current.click();
          else return;
        }}
        className={`button Call`}
      >
        {name}
      </button>
      <input
        style={{ display: "none" }}
        type="file"
        accept="image/*"
        // capture="environment"
        ref={ref}
        onClick={(e: any) => (e.target.value = null)}
        onChange={(e) => {
          if (e.target.files) onSelect(e.target.files[0]);
        }}
      />
    </div>
  );
};

export const RecordButton: React.FC<propsCallButton> = ({
  onClick,
  name,
  muted,
  mute,
}) => {
  return (
    <div className="callButton">
      {name === "End" && (
        <button
          onClick={mute}
          className={`button ${!muted ? "mute" : "unmute"}`}
        >
          {!muted ? "Pause" : "Play"}
        </button>
      )}
      <button onClick={onClick} className={`button ${name}`}>
        {name}
      </button>
    </div>
  );
};

export const ReplyButton: React.FC<propsCallButton> = ({
  onClick,
  name,
  next,
  prev,
}) => {
  return (
    <div className="callButton">
      <button onClick={prev} className={`button arrl`}>
        {"<<"}
      </button>

      <button onClick={onClick} className={`button ${name}`}>
        {name}
      </button>

      <button onClick={next} className={`button arrr`}>
        {">>"}
      </button>
    </div>
  );
};
