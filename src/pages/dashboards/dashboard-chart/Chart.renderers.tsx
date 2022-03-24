import { AxiosResponse } from "axios";

import { Alert } from "reactstrap";

export const renderChartErrorAlert = (response: AxiosResponse) => {
  return (
    <Alert className="danger">
      <strong>Error</strong> {response.data.message}
    </Alert>
  );
};
