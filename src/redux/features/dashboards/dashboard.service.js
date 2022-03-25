import {
  httpCommon,
  HttpResponseType,
  REPORT_MEMBERS_BY_AGE_ROUTE,
  REPORT_MEMBERS_BY_BUSINESS_UNITS_ROUTE,
  REPORT_MEMBERS_BY_GENDER_ROUTE,
  REPORT_MEMBERS_BY_ROLE_ROUTE,
  REPORT_MEMBERS_BY_SENIORITY_ROUTE,
  REPORT_MEMBERS_TURNOVER_ROUTE,
  REPORT_MEMBERS_WORKFORCE_ROUTE,
} from "redux/app";

import { Chart, TurnoverChart } from "types";

export const getTurnoverReport = (): HttpResponseType<TurnoverChart[]> => {
  return httpCommon.get(`${REPORT_MEMBERS_TURNOVER_ROUTE}`);
};

const getWorkforceReport = (): HttpResponseType<Chart[]> => {
  return httpCommon.get(`${REPORT_MEMBERS_WORKFORCE_ROUTE}`);
};

const getDistributionByGenderReport = (): HttpResponseType<Chart[]> => {
  return httpCommon.get(`${REPORT_MEMBERS_BY_GENDER_ROUTE}`);
};

const getDistributionByRoleReport = (): HttpResponseType<Chart[]> => {
  return httpCommon.get(`${REPORT_MEMBERS_BY_ROLE_ROUTE}`);
};

const getDistributionByBusinessUnitReport = (): HttpResponseType<Chart[]> => {
  return httpCommon.get(`${REPORT_MEMBERS_BY_BUSINESS_UNITS_ROUTE}`);
};

const getDistributionByAgeReport = (): HttpResponseType<Chart[]> => {
  return httpCommon.get(`${REPORT_MEMBERS_BY_AGE_ROUTE}`);
};

const getDistributionBySeniorityReport = (): HttpResponseType<Chart[]> => {
  return httpCommon.get(`${REPORT_MEMBERS_BY_SENIORITY_ROUTE}`);
};

export const dashboardService = {
  getTurnoverReport,
  getWorkforceReport,
  getDistributionByAgeReport,
  getDistributionByBusinessUnitReport,
  getDistributionByGenderReport,
  getDistributionByRoleReport,
  getDistributionBySeniorityReport,
};
