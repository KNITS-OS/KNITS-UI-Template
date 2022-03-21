import SweetAlert from "react-bootstrap-sweetalert";

import { AlertType } from "types";

interface Props {
  children: string;
  setAlert: React.Dispatch<React.SetStateAction<AlertType>>;
}

export const SuccessAlert = ({ children, setAlert }: Props) => {
  return (
    <SweetAlert success title="Success" onConfirm={() => setAlert(null)}>
      {children}
    </SweetAlert>
  );
};
