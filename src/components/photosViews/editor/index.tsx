import React, { useEffect, useState } from "react";
import { UIEvent, PhotoEditorSDKUI, CanvasAction } from "photoeditorsdk";
import { IonModal } from "@ionic/react";

import { photoLicense } from "../../../constant";
import "./index.css";

interface sProps {
  img: any;
  setImg: Function;
  open: boolean;
  setOpen: Function;
}

const Editor: React.FC<sProps> = ({ img, setImg, open, setOpen }) => {
  const [rImg, setRImg] = useState(null);
  const initEditor = async () => {
    const editor = await PhotoEditorSDKUI.init({
      container: "#editor",
      image: img!,
      layout: "basic",
      license: JSON.stringify(photoLicense),
      mainCanvasActions: [
        CanvasAction.UNDO,
        CanvasAction.REDO,
        CanvasAction.CLOSE,
        CanvasAction.EXPORT,
      ],

      export: {
        image: {
          enableDownload: false,
        },
      },
    });
    console.log("PhotoEditorSDK for Web is ready!");
    editor.on(UIEvent.EXPORT, (imageSrc) => {
      console.log("EXPORTED ...");
      console.log("Exported ", imageSrc.src);
      setRImg(imageSrc.src);
      setOpen(false);
    });

    editor.on(UIEvent.CLOSE, (imageSrc) => {
      console.log("CLOSED ...");
      setImg(null);
      setOpen(false);
    });
  };

  //   useEffect(() => {
  // if (open) initEditor();
  //   }, []);

  return (
    <React.Fragment>
      <IonModal
        className="modal"
        mode={undefined}
        animated={false}
        isOpen={open}
        // onWillDismiss={() => setOpen(false)}
        onDidDismiss={() => setImg(rImg)}
        onDidPresent={() => initEditor()}
      >
        <React.Fragment>
          <div id="editor" />
        </React.Fragment>
      </IonModal>
    </React.Fragment>
  );
};

export default Editor;
