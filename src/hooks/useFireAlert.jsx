import { useState } from "react";

import { WarningAlert } from "components/alerts";

export const useFeatureDisabledWarning = () => {
  const [alert, setAlert] = useState(null);

  const fireAlert = (message = "Feature under development") => {
    setAlert(() => <WarningAlert>{message}</WarningAlert>);
  };

  return { alert, fireAlert };
};
