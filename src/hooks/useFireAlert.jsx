import { WarningAlert } from "components/alerts";

import { useAlert } from "context";

export const useFeatureDisabledWarning = () => {
  const { alert, setAlert } = useAlert();

  const fireAlert = (message = "Feature under development") => {
    setAlert(() => <WarningAlert>{message}</WarningAlert>);
  };

  return { alert, fireAlert };
};
