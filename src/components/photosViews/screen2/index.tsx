import React, { useState } from "react";
import { IonDatetime } from "@ionic/react";

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
  const [cdate, setCDate] = useState<string>("");

  return (
    <React.Fragment>
      <div className="ion-text-center ion-margin-top mb-auto">
        <h3>Set appear date.</h3>
      </div>
      <div className="div-date">
        {!custom ? (
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
        ) : (
          <React.Fragment>
            <IonDatetime
              className="date-picker"
              onIonChange={(e: any) => setCDate(e.detail.value!)}
            ></IonDatetime>
            <button
              className="btn"
              onClick={() => setDate(cdate ? new Date(cdate) : new Date())}
            >
              Next
            </button>
          </React.Fragment>
        )}

        <button
          className="btn"
          onClick={() => (custom ? setCustom(false) : back())}
        >
          Back
        </button>
      </div>
    </React.Fragment>
  );
};

export default Screen2;
