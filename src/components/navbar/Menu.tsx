import Footer from "./Fotter";
import { IonIcon } from "@ionic/react";
import { close } from "ionicons/icons";

import "./Menu.css";

interface MenuProps {
  setClose: React.MouseEventHandler;
  block: Function;
}

const Menu: React.FC<MenuProps> = ({ setClose, block }) => {
  return (
    <div className="menu">
      <div className=""></div>
      <a
        className="menuA"
        href="https://calendly.com/talktime"
        target="_blank"
        rel="noreferrer"
      >
        <h1 className="link">Workout</h1>
      </a>
      {/* <button className="link"> */}
      <button
        className="buttonmenu"
        onClick={(e) => {
          block(e);
          setClose(e);
        }}
      >
        <h1>Block</h1>
      </button>
      {/* </button> */}
      <button className="buttonmenu" onClick={setClose}>
        <IonIcon icon={close} className="iconi" />
      </button>
      <Footer />
    </div>
  );
};

export default Menu;
