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

export const getTurnoverReport = async () => {
  return await httpCommon.get(`${REPORT_MEMBERS_TURNOVER_ROUTE}`);
};

const getWorkforceReport = async () => {
  return await httpCommon.get(`${REPORT_MEMBERS_WORKFORCE_ROUTE}`);
};

const getDistributionByGenderReport = async () => {
  return await httpCommon.get(`${REPORT_MEMBERS_BY_GENDER_ROUTE}`);
};

const getDistributionByRoleReport = async () => {
  return await httpCommon.get(`${REPORT_MEMBERS_BY_ROLE_ROUTE}`);
};

const getDistributionByBusinessUnitReport = async () => {
  return await httpCommon.get(`${REPORT_MEMBERS_BY_BUSINESS_UNITS_ROUTE}`);
};

const getDistributionByAgeReport = async () => {
  return await httpCommon.get(`${REPORT_MEMBERS_BY_AGE_ROUTE}`);
};

const getDistributionBySeniorityReport = async () => {
  return await httpCommon.get(`${REPORT_MEMBERS_BY_SENIORITY_ROUTE}`);
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
