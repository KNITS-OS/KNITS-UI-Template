import SweetAlert from "react-bootstrap-sweetalert";

export const SuccessAlert = ({ children, setAlert }) => {
  return (
    <SweetAlert success title="Success" onConfirm={() => setAlert(null)}>
      {children}
    </SweetAlert>
  );
};
