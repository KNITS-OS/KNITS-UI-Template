/* eslint-disable no-case-declarations */
import { AppActionType } from "redux/app";

import {
  NO_REPORT_CACHED,
  REPORT_KEY_ACTIVE_MEMBERS,
  REPORT_KEY_AUTO_OFFBOARDED_MEMBERS,
  REPORT_KEY_CURRENT_MAP,
  REPORT_KEY_NEW_MEMBERS,
  REPORT_KEY_SELF_RESIGNED_MEMBERS,
} from "variables/app.consts";

const NO_ACTION_FOUND = "NO_ACTION_FOUND";

const initialState = {
  entities: [
    {
      reportName: REPORT_KEY_ACTIVE_MEMBERS,
      data: NO_REPORT_CACHED,
    },
    {
      reportName: REPORT_KEY_AUTO_OFFBOARDED_MEMBERS,
      data: NO_REPORT_CACHED,
    },
    {
      reportName: REPORT_KEY_NEW_MEMBERS,
      data: NO_REPORT_CACHED,
    },
    {
      reportName: REPORT_KEY_SELF_RESIGNED_MEMBERS,
      data: NO_REPORT_CACHED,
    },
    {
      reportName: REPORT_KEY_CURRENT_MAP,
      data: NO_REPORT_CACHED,
    },
  ],
  entity: null,
  isLoading: false,
  isSuccess: false,
  error: {},
};

const toCacheKey = actionType => {
  switch (actionType) {
    case AppActionType.FETCH_ACTIVE_MEMBERS_REPORT_COMPLETE:
      return REPORT_KEY_ACTIVE_MEMBERS;
    case AppActionType.FETCH_NEW_MEMBERS_REPORT_COMPLETE:
      return REPORT_KEY_NEW_MEMBERS;
    case AppActionType.FETCH_AUTO_OFFBOARDED_MEMBERS_REPORT_COMPLETE:
      return REPORT_KEY_AUTO_OFFBOARDED_MEMBERS;
    case AppActionType.FETCH_SELF_RESIGNED_MEMBERS_REPORT_COMPLETE:
      return REPORT_KEY_SELF_RESIGNED_MEMBERS;
    default:
      return NO_ACTION_FOUND;
  }
};

export const worldOverviewReducer = (worldOverviewState = initialState, action) => {
  const { type, payload } = action;
  const { entities, entity } = worldOverviewState;
  switch (type) {
    case AppActionType.FETCH_ACTIVE_MEMBERS_REPORT_LOADING:
    case AppActionType.FETCH_NEW_MEMBERS_REPORT_LOADING:
    case AppActionType.FETCH_AUTO_OFFBOARDED_MEMBERS_REPORT_LOADING:
    case AppActionType.FETCH_SELF_RESIGNED_MEMBERS_REPORT_LOADING:
      return {
        entities,
        entity,
        isLoading: true,
        isSuccess: false,
        error: {},
      };

    case AppActionType.FETCH_ACTIVE_MEMBERS_REPORT_ERROR:
    case AppActionType.FETCH_NEW_MEMBERS_REPORT_ERROR:
    case AppActionType.FETCH_AUTO_OFFBOARDED_MEMBERS_REPORT_ERROR:
    case AppActionType.FETCH_SELF_RESIGNED_MEMBERS_REPORT_ERROR:
      return {
        entities,
        entity,
        isLoading: false,
        isSuccess: false,
        error: payload,
      };

    case AppActionType.FETCH_ACTIVE_MEMBERS_REPORT_COMPLETE:
    case AppActionType.FETCH_NEW_MEMBERS_REPORT_COMPLETE:
    case AppActionType.FETCH_AUTO_OFFBOARDED_MEMBERS_REPORT_COMPLETE:
    case AppActionType.FETCH_SELF_RESIGNED_MEMBERS_REPORT_COMPLETE:
      const updatedReports = worldOverviewState.entities.map(report => {
        if (
          report.reportName === toCacheKey(action.type) ||
          report.reportName === REPORT_KEY_CURRENT_MAP
        ) {
          report.data = action.payload;
        }
        return report;
      });
      return {
        entities: updatedReports,
        entity,
        isLoading: false,
        isSuccess: true,
        error: {},
      };

    default:
      return worldOverviewState;
  }
};
