import React, { useState, useEffect } from "react";
import { IonDatetime } from "@ionic/react";
import { IonModal } from "@ionic/react";

import "./index.css";

interface sProps {
  setDate: Function;
  back: Function;
}

const Screen2: React.FC<sProps> = ({ setDate, back }) => {
  const period = [
    { name: "Now", v: new Date() },
    { name: "1 hour", v: new Date().setHours(new Date().getHours() + 1) },
    { name: "3 hour", v: new Date().setHours(new Date().getHours() + 3) },
  ];

  const [custom, setCustom] = useState(false);
  const [done, setDone] = useState(false);
  const [cdate, setCDate] = useState<string>("");

  useEffect(() => {
    let interval: any = null;
    if (done && cdate && custom) {
      // console.log("done");
      setCustom(false);
    } else if (done && cdate && !custom) {
      console.log("done 11");
      // setCustom(false);
      // setDate(cdate ? new Date(cdate) : new Date());
      // setDate((v: any) => {
      //   if (done) return cdate ? new Date(cdate) : new Date();
      //   return null;
      // });
      interval = setInterval(() => {
        setDate(cdate ? new Date(cdate) : new Date());
      }, 200);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [done, custom]);

  return (
    <React.Fragment>
      <div className="ion-text-center ion-margin-top mb-auto">
        <h3>Set appear date.</h3>
      </div>
      <div className="div-date">
        <React.Fragment>
          {period.map((v, i) => (
            <button key={i} className="btn" onClick={() => setDate(v.v)}>
              {v.name}
            </button>
          ))}
          <button className="btn" onClick={() => setCustom(true)}>
            Custom
          </button>
        </React.Fragment>
        <button
          className="btn"
          onClick={() => (custom ? setCustom(false) : back())}
        >
          Back
        </button>
      </div>
      <IonModal
        className="modal"
        mode={undefined}
        animated={false}
        isOpen={custom}
        onDidDismiss={() => setCustom(false)}
      >
        <React.Fragment>
          <div className="model-date">
            <IonDatetime
              className="date-picker"
              onIonChange={(e: any) => setCDate(e.detail.value!)}
            ></IonDatetime>
            <div className="mid-btn">
              <button className="btn" onClick={() => setCustom(false)}>
                Back
              </button>
              <button
                className="btn"
                onClick={() => {
                  setDone(true);
                  setCustom(false);
                }}
              >
                Next
              </button>
            </div>
          </div>
        </React.Fragment>
      </IonModal>
    </React.Fragment>
  );
};

export default Screen2;
