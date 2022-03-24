import { useState, createContext } from "react";
import { Redirect, Route } from "react-router-dom";
import {
  IonApp,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  setupIonicReact,
  IonIcon,
} from "@ionic/react";
import { call, people } from "ionicons/icons";
import { IonReactRouter } from "@ionic/react-router";
import Tab1 from "./pages/Tab1";
import Tab2 from "./pages/Tab2";
import Toast from "./components/Toast";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
import "./theme/variables.css";
import "./theme/index.css";

setupIonicReact();

export const ShowToast = createContext<any>(null);

const App: React.FC = () => {
  const [incall, setIncall] = useState(false);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState<string>("");
  const [toastType, setToastType] = useState<Number>(0);

  function openToast(message: string, type: Number = 1) {
    setMessage(message);
    setToastType(type);
    setOpen(true);
  }

  return (
    <IonApp>
      <IonReactRouter>
        <ShowToast.Provider value={{ openToast }}>
          <IonTabs>
            <IonRouterOutlet>
              <Route exact path="/talk">
                <Tab1 incall={incall} setIncall={setIncall} />
              </Route>
              <Route exact path="/talk/:id">
                <Tab1 incall={incall} setIncall={setIncall} />
              </Route>
              <Route exact path="/host">
                <Tab2 incall={incall} setIncall={setIncall} />
              </Route>
              <Route exact path="/">
                <Redirect to="/talk" />
              </Route>
            </IonRouterOutlet>
            <IonTabBar slot="bottom">
              {!incall && (
                <IonTabButton tab="Talk" href="/talk">
                  <IonIcon icon={call} />
                  <IonLabel>Talk</IonLabel>
                </IonTabButton>
              )}
              {!incall && (
                <IonTabButton tab="Host" href="/host">
                  <IonIcon icon={people} />
                  <IonLabel>Host</IonLabel>
                </IonTabButton>
              )}
            </IonTabBar>
          </IonTabs>
          <Toast
            open={open}
            close={() => setOpen(false)}
            message={message}
            type={toastType}
          />
        </ShowToast.Provider>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
