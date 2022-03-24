import { IonToast } from "@ionic/react";
import { informationCircle } from "ionicons/icons";

interface toastProps {
  open: any;
  close: any;
  message: string;
  type: Number;
}

const Toast: React.FC<toastProps> = ({ open, close, message, type = 1 }) => {
  const color =
    type === 1
      ? "success"
      : type === -1
      ? "danger"
      : type === 2
      ? "warning"
      : "medium";

  return (
    <IonToast
      isOpen={open}
      onDidDismiss={close}
      message={message}
      duration={500}
      icon={informationCircle}
      position="top"
      color={color}
      //   buttons={[
      //     {
      //       text: "Ok",
      //       role: "cancel",
      //       handler: () => {
      //         //   console.log("Cancel clicked");
      //       },
      //     },
      //   ]}
    />
  );
};

export default Toast;
