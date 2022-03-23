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
