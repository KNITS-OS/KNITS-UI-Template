import moment from "moment";

import { DATE_FILTER_FORMAT } from "variables/app.consts";

export const autoOffboardingDate = () => {
  const oneYearFromNowAsDate = moment().add(365, "days");

  const defaultOffBoardingDate = moment(oneYearFromNowAsDate).format(DATE_FILTER_FORMAT);

  return { defaultOffBoardingDate };
};
export const createOnboardingDate = () => {
  const nowAsDate = moment.now();
  const onboardingDate = moment(nowAsDate).format(DATE_FILTER_FORMAT);

  return { onboardingDate };
};
