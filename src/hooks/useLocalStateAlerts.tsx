import { useEffect, useState } from "react";

import { ErrorAlert, SuccessAlert } from "components/alerts";

import { AlertType } from "types";

export const useLocalStateAlerts = () => {
  const [alert, setAlert] = useState<AlertType>();
  const [isSuccess, setIsSuccess] = useState(false);
  const [saveSent, setSaveSent] = useState(false);
  const [successMessage, setSuccessMessage] = useState("Success");
  const [errorMessage, setErrorMessage] = useState("Error");

  useEffect(() => {
    if (isSuccess && saveSent) {
      setAlert(() => <SuccessAlert>{successMessage}</SuccessAlert>);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess]);

  useEffect(() => {
    if (!isSuccess && saveSent) {
      setAlert(() => <ErrorAlert>{errorMessage}</ErrorAlert>);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess]);

  return { alert, setSaveSent, setSuccessMessage, setErrorMessage, setIsSuccess };
};
