import { createSelector } from "reselect";

import {
  NO_REPORT_CACHED,
  REPORT_KEY_ACTIVE_MEMBERS,
  REPORT_KEY_AUTO_OFFBOARDED_MEMBERS,
  REPORT_KEY_CURRENT_MAP,
  REPORT_KEY_NEW_MEMBERS,
  REPORT_KEY_SELF_RESIGNED_MEMBERS,
} from "variables/app.consts";

export const selectWorldOverviewCachedReportsState = rootState => rootState.worldOverview;

const selectAllReportsData = createSelector(
  [selectWorldOverviewCachedReportsState],
  worldOverview => worldOverview.entities
);

const findReportInCache = (allReports, cacheKey) => {
  const reportsData = allReports.find(report => report.reportName === cacheKey);
  return reportsData ? reportsData.data : NO_REPORT_CACHED;
};

export const selectActiveMembersReportsData = createSelector([selectAllReportsData], allReports => {
  return findReportInCache(allReports, REPORT_KEY_ACTIVE_MEMBERS);
});

export const selectNewMembersReportsData = createSelector([selectAllReportsData], allReports => {
  return findReportInCache(allReports, REPORT_KEY_NEW_MEMBERS);
});

export const selectSelfResignedMembersReportsData = createSelector(
  [selectAllReportsData],
  allReports => {
    return findReportInCache(allReports, REPORT_KEY_SELF_RESIGNED_MEMBERS);
  }
);

export const selectAutoOffboardedMembersReportsData = createSelector(
  [selectAllReportsData],
  allReports => {
    return findReportInCache(allReports, REPORT_KEY_AUTO_OFFBOARDED_MEMBERS);
  }
);

export const selectCurrentMapData = createSelector([selectAllReportsData], allReports => {
  return findReportInCache(allReports, REPORT_KEY_CURRENT_MAP);
});
