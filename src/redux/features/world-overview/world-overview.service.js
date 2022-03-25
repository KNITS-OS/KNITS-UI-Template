import {
  httpCommon,
  REPORT_ACTIVE_MEMBERS_ROUTE,
  REPORT_AUTO_OFFBOARDED_MEMBERS_ROUTE,
  REPORT_NEW_MEMBERS_ROUTE,
  REPORT_SELF_RESIGNED_MEMBERS_ROUTE,
} from "redux/app";

const getNewMembersMapData = () => {
  return httpCommon.get(`${REPORT_NEW_MEMBERS_ROUTE}`);
};
const getAutoOffboardedMembersMapData = () => {
  return httpCommon.get(`${REPORT_AUTO_OFFBOARDED_MEMBERS_ROUTE}`);
};
const getActiveMembersMapData = () => {
  return httpCommon.get(`${REPORT_ACTIVE_MEMBERS_ROUTE}`);
};

const getSelfResignedMembersMapData = () => {
  return httpCommon.get(`${REPORT_SELF_RESIGNED_MEMBERS_ROUTE}`);
};
export const worldOverviewService = {
  getNewMembersMapData,
  getAutoOffboardedMembersMapData,
  getActiveMembersMapData,
  getSelfResignedMembersMapData,
};
