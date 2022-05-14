import React, { useEffect, useState } from "react";
import { IonModal } from "@ionic/react";

import "./index.css";

interface sProps {
  children: React.ReactNode;
  open: boolean;
  setOpen: Function;
}

const PModel: React.FC<sProps> = ({ children, open, setOpen }) => {
  return (
    <React.Fragment>
      <IonModal
        className="modal"
        mode={undefined}
        animated={false}
        isOpen={open}
        // onWillDismiss={() => setOpen(false)}
        onDidDismiss={() => setOpen(false)}
        // onDidPresent={() => initEditor()}
      >
        <React.Fragment>{children}</React.Fragment>
      </IonModal>
    </React.Fragment>
  );
};

export default PModel;
