import SweetAlert from "react-bootstrap-sweetalert";

import { AlertType } from "types";

interface Props {
  children: string;
  setAlert: React.Dispatch<React.SetStateAction<AlertType>>;
}

export const ErrorAlert = ({ children, setAlert }: Props) => {
  return (
    <SweetAlert error title="Error" onConfirm={() => setAlert(null)}>
      {children}
    </SweetAlert>
  );
};
