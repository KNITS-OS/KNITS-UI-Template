import { useEffect, useState } from "react";

import { ErrorAlert, SuccessAlert } from "components/alerts";

import { useAlert } from "context";

export const useAlerts = state => {
  const { alert, setAlert } = useAlert();
  const [saveSent, setSaveSent] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    if (state.isSuccess && saveSent) {
      setAlert(() => <SuccessAlert>{successMessage}</SuccessAlert>);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.isSuccess]);

  useEffect(() => {
    if (state.error && saveSent) {
      setAlert(() => <ErrorAlert>{state.error.message || "Error"}</ErrorAlert>);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.error]);

  return { alert, setSaveSent, setSuccessMessage };
};
