import {
  httpCommon,
  REPORT_MEMBERS_BY_AGE_ROUTE,
  REPORT_MEMBERS_BY_BUSINESS_UNITS_ROUTE,
  REPORT_MEMBERS_BY_GENDER_ROUTE,
  REPORT_MEMBERS_BY_ROLE_ROUTE,
  REPORT_MEMBERS_BY_SENIORITY_ROUTE,
  REPORT_MEMBERS_TURNOVER_ROUTE,
  REPORT_MEMBERS_WORKFORCE_ROUTE,
} from "redux/app";

export const getTurnoverReport = () => {
  return httpCommon.get(`${REPORT_MEMBERS_TURNOVER_ROUTE}`);
};

const getWorkforceReport = () => {
  return httpCommon.get(`${REPORT_MEMBERS_WORKFORCE_ROUTE}`);
};

const getDistributionByGenderReport = () => {
  return httpCommon.get(`${REPORT_MEMBERS_BY_GENDER_ROUTE}`);
};

const getDistributionByRoleReport = () => {
  return httpCommon.get(`${REPORT_MEMBERS_BY_ROLE_ROUTE}`);
};

const getDistributionByBusinessUnitReport = () => {
  return httpCommon.get(`${REPORT_MEMBERS_BY_BUSINESS_UNITS_ROUTE}`);
};

const getDistributionByAgeReport = () => {
  return httpCommon.get(`${REPORT_MEMBERS_BY_AGE_ROUTE}`);
};

const getDistributionBySeniorityReport = () => {
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
