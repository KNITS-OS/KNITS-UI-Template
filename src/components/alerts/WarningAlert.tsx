import SweetAlert from "react-bootstrap-sweetalert";

import { AlertType } from "types";

interface Props {
  children: string;
  setAlert: React.Dispatch<React.SetStateAction<AlertType>>;
}

export const WarningAlert = ({ children, setAlert }: Props) => {
  return (
    <SweetAlert warning title="Attention" onConfirm={() => setAlert(null)}>
      {children}
    </SweetAlert>
  );
};
