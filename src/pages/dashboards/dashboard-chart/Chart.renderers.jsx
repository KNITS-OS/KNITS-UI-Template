import { Alert } from "reactstrap";

export const renderChartErrorAlert = response => {
  return (
    <Alert className="danger">
      <strong>Error</strong> {response.data.message}
    </Alert>
  );
};
