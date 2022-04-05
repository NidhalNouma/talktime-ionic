import { useState } from "react";
import { IonIcon, IonModal } from "@ionic/react";
import { menu } from "ionicons/icons";
import { isPlatform } from "@ionic/react";
import Menu from "./Menu";

import "./Nav.css";

const Nav: React.FC = () => {
  const [openMenu, setOpenMenu] = useState(false);

  return (
    <div className="nav">
      {(isPlatform("ios") || isPlatform("android")) && (
        <button className="buttoni" onClick={() => setOpenMenu(true)}>
          <IonIcon icon={menu} className="iconi" />
        </button>
      )}

      <div className="logo">
        <h4>Talktime</h4>
      </div>
      <IonModal
        className="modal"
        mode={undefined}
        animated={false}
        isOpen={openMenu}
        onDidDismiss={() => setOpenMenu(false)}
      >
        <Menu setClose={() => setOpenMenu(false)} />
      </IonModal>
      {/* {openMenu && <Menu setClose={() => setOpenMenu(false)} />} */}
    </div>
  );
};

export default Nav;
