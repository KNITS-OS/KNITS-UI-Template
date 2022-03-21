import { useState } from "react";

import { WarningAlert } from "components/alerts";

import { AlertType } from "types";

export const useFeatureDisabledWarning = () => {
  const [alert, setAlert] = useState<AlertType>();

  const fireAlert = (message = "Feature under development") => {
    setAlert(() => <WarningAlert setAlert={setAlert}>{message}</WarningAlert>);
  };

  return { alert, fireAlert };
};
