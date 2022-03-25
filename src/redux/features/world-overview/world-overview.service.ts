import {
  REPORT_ACTIVE_MEMBERS_ROUTE,
  REPORT_AUTO_OFFBOARDED_MEMBERS_ROUTE,
  REPORT_NEW_MEMBERS_ROUTE,
  REPORT_SELF_RESIGNED_MEMBERS_ROUTE,
  httpCommon,
  HttpResponseType,
} from "redux/app";

import { MapValues } from "types";

const getNewMembersMapData = (): HttpResponseType<MapValues> => {
  return httpCommon.get(`${REPORT_NEW_MEMBERS_ROUTE}`);
};
const getAutoOffboardedMembersMapData = (): HttpResponseType<MapValues> => {
  return httpCommon.get(`${REPORT_AUTO_OFFBOARDED_MEMBERS_ROUTE}`);
};
const getActiveMembersMapData = (): HttpResponseType<MapValues> => {
  return httpCommon.get(`${REPORT_ACTIVE_MEMBERS_ROUTE}`);
};

const getSelfResignedMembersMapData = (): HttpResponseType<MapValues> => {
  return httpCommon.get(`${REPORT_SELF_RESIGNED_MEMBERS_ROUTE}`);
};
export const worldOverviewService = {
  getNewMembersMapData,
  getAutoOffboardedMembersMapData,
  getActiveMembersMapData,
  getSelfResignedMembersMapData,
};
