import { useEffect, useState } from "react";

import { ErrorAlert, SuccessAlert } from "components/alerts";

export const useAlerts = state => {
  const [alert, setAlert] = useState(null);
  const [saveSent, setSaveSent] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    if (state.isSuccess && saveSent) {
      setAlert(() => <SuccessAlert setAlert={setAlert}>{successMessage}</SuccessAlert>);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.isSuccess]);

  useEffect(() => {
    if (state.error && saveSent) {
      setAlert(() => <ErrorAlert setAlert={setAlert}>{state.error.message || "Error"}</ErrorAlert>);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.error]);

  return { alert, setSaveSent, setSuccessMessage };
};
