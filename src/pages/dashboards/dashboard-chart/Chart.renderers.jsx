import { Alert } from "reactstrap";

export const renderAlert = response => {
  return (
    <Alert className="danger">
      <strong>Error</strong> {response.message}
    </Alert>
  );
};
