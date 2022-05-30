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
import { call, people, mic, globe, recording } from "ionicons/icons";
import { IonReactRouter } from "@ionic/react-router";
import Live from "./pages/Live";
import Host from "./pages/Host";
import Talk from "./pages/Talk";
import Feed from "./pages/Feed";
import Voicemail from "./pages/Voicemail";
import Toast from "./components/Toast";

import { UserComponent, User } from "./hooks/User";
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

  const { user, setUser } = User();

  return (
    <IonApp>
      <IonReactRouter>
        <UserComponent value={{ user, setUser }}>
          <ShowToast.Provider value={{ openToast }}>
            <IonTabs>
              <IonRouterOutlet>
                <Route exact path="/live">
                  <Live incall={incall} setIncall={setIncall} />
                </Route>
                <Route exact path="/live/:id">
                  <Live incall={incall} setIncall={setIncall} />
                </Route>
                <Route exact path="/host">
                  <Host incall={incall} setIncall={setIncall} />
                </Route>
                <Route exact path="/talk">
                  <Talk />
                </Route>
                <Route exact path="/talk/:id">
                  <Talk />
                </Route>
                <Route exact path="/feed">
                  <Feed />
                </Route>
                <Route exact path="/voicemail">
                  <Voicemail />
                </Route>
                <Route exact path="/">
                  <Redirect to="/feed" />
                </Route>
              </IonRouterOutlet>
              <IonTabBar
                slot="bottom"
                style={{ display: `${incall ? "none" : "flex"}` }}
              >
                {/* <IonTabButton tab="Host" href="/host">
                <IonIcon icon={people} />
                <IonLabel>Host</IonLabel>
              </IonTabButton>
              <IonTabButton tab="Live" href="/live">
                <IonIcon icon={call} />
                <IonLabel>Live</IonLabel>
              </IonTabButton> */}
                <IonTabButton tab="Talk" href="/talk">
                  <IonIcon icon={mic} />
                  <IonLabel>Talk</IonLabel>
                </IonTabButton>
                <IonTabButton tab="Feed" href="/feed">
                  <IonIcon icon={globe} />
                  <IonLabel>Feed</IonLabel>
                </IonTabButton>
                <IonTabButton tab="Voicemail" href="/voicemail">
                  <IonIcon icon={recording} />
                  <IonLabel>Voicemail</IonLabel>
                </IonTabButton>
              </IonTabBar>
            </IonTabs>
            <Toast
              open={open}
              close={() => setOpen(false)}
              message={message}
              type={toastType}
            />
          </ShowToast.Provider>
        </UserComponent>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
