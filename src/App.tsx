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

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonTabs>
        <IonRouterOutlet>
          <Route exact path="/talk">
            <Tab1 />
          </Route>
          <Route exact path="/host">
            <Tab2 />
          </Route>
          <Route exact path="/">
            <Redirect to="/talk" />
          </Route>
        </IonRouterOutlet>
        <IonTabBar slot="bottom">
          <IonTabButton tab="Talk" href="/talk">
            <IonIcon icon={call} />
            <IonLabel>Talk</IonLabel>
          </IonTabButton>
          <IonTabButton tab="Host" href="/host">
            <IonIcon icon={people} />
            <IonLabel>Host</IonLabel>
          </IonTabButton>
        </IonTabBar>
      </IonTabs>
    </IonReactRouter>
  </IonApp>
);

export default App;
