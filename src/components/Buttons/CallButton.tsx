import { useState, useRef } from "react";
import "./callButton.css";

interface propsCallButton {
  onClick: React.MouseEventHandler;
  name: string;
  muted: boolean;
  mute: React.MouseEventHandler;
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
        capture="environment"
        ref={ref}
        onChange={(e) => {
          if (e.target.files) onSelect(e.target.files[0]);
        }}
      />
    </div>
  );
};
