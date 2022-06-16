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
import {
  call,
  people,
  micOutline,
  arrowRedoOutline,
  volumeMediumOutline,
  mailOutline,
  mailUnreadOutline,
} from "ionicons/icons";
import { IonReactRouter } from "@ionic/react-router";
import Live from "./pages/Live";
import Host from "./pages/Host";
import Record from "./pages/Record";
import ShareAudio from "./pages/ShareAudio";
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

  // const { user, setUser } = User();
  const avm = localStorage.getItem("user.voicemail");

  return (
    <IonApp>
      <IonReactRouter>
        {/* <UserComponent value={{ user, setUser }}> */}
        <ShowToast.Provider value={{ openToast }}>
          <IonTabs>
            <IonRouterOutlet>
              <Route exact path="/talk">
                <Live incall={incall} setIncall={setIncall} />
              </Route>
              <Route exact path="/talk/:id">
                <Live incall={incall} setIncall={setIncall} />
              </Route>
              <Route exact path="/host">
                <Host incall={incall} setIncall={setIncall} />
              </Route>
              <Route exact path="/record">
                <Record />
              </Route>
              <Route exact path="/share">
                <ShareAudio />
              </Route>
              <Route exact path="/record/:id">
                <Record />
              </Route>
              <Route exact path="/listen">
                <Feed />
              </Route>
              <Route exact path="/s/:id">
                <Feed uniqueId={true} />
              </Route>
              <Route exact path="/inbox">
                <Voicemail />
              </Route>
              <Route exact path="/">
                <Redirect to="/talk" />
              </Route>
            </IonRouterOutlet>
            <IonTabBar
              slot="bottom"
              style={{ display: `${incall ? "none" : "flex"}` }}
            >
              <IonTabButton tab="Talk" href="/talk">
                <IonIcon icon={call} />
                <IonLabel>Talk</IonLabel>
              </IonTabButton>
              <IonTabButton tab="Host" href="/host">
                <IonIcon icon={people} />
                <IonLabel>Host</IonLabel>
              </IonTabButton>
              {/* <IonTabButton tab="Record" href="/record">
                  <IonIcon icon={micOutline} />
                  <IonLabel>Record</IonLabel>
                </IonTabButton>
                <IonTabButton
                  tab="Share-audio"
                  href="/share"
                  style={{ display: `${!user?.audio ? "none" : "flex"}` }}
                >
                  <IonIcon icon={arrowRedoOutline} />
                  <IonLabel>Share</IonLabel>
                </IonTabButton>
                <IonTabButton tab="Listen" href="/listen">
                  <IonIcon icon={volumeMediumOutline} />
                  <IonLabel>Listen</IonLabel>
                </IonTabButton>
                <IonTabButton tab="Voicemail" href="/inbox">
                  <IonIcon
                    icon={
                      avm && user?.voicemail?.length > avm
                        ? mailUnreadOutline
                        : mailOutline
                    }
                  />
                  <IonLabel>Inbox</IonLabel>
                </IonTabButton> */}
            </IonTabBar>
          </IonTabs>
          <Toast
            open={open}
            close={() => setOpen(false)}
            message={message}
            type={toastType}
          />
        </ShowToast.Provider>
        {/* </UserComponent> */}
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
