/* eslint-disable no-case-declarations */
import { AnyAction } from "redux";

import { ActionType, StateType } from "redux/app";

import { WorldOverviewCachedReports } from "types";
import {
  REPORT_KEY_NEW_MEMBERS,
  REPORT_KEY_CURRENT_MAP,
  REPORT_KEY_SELF_RESIGNED_MEMBERS,
  REPORT_KEY_AUTO_OFFBOARDED_MEMBERS,
  NO_REPORT_CACHED,
  REPORT_KEY_ACTIVE_MEMBERS,
} from "variables/app.consts";

const NO_ACTION_FOUND = "NO_ACTION_FOUND";

const initialState: StateType<WorldOverviewCachedReports> = {
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

const toCacheKey = (actionType: string): string => {
  switch (actionType) {
    case ActionType.FETCH_ACTIVE_MEMBERS_REPORT_COMPLETE:
      return REPORT_KEY_ACTIVE_MEMBERS;
    case ActionType.FETCH_NEW_MEMBERS_REPORT_COMPLETE:
      return REPORT_KEY_NEW_MEMBERS;
    case ActionType.FETCH_AUTO_OFFBOARDED_MEMBERS_REPORT_COMPLETE:
      return REPORT_KEY_AUTO_OFFBOARDED_MEMBERS;
    case ActionType.FETCH_SELF_RESIGNED_MEMBERS_REPORT_COMPLETE:
      return REPORT_KEY_SELF_RESIGNED_MEMBERS;
    default:
      return NO_ACTION_FOUND;
  }
};

export const worldOverviewReducer = (
  worldOverviewState = initialState,
  action: AnyAction
): StateType<WorldOverviewCachedReports> => {
  const { type, payload } = action;
  const { entities, entity } = worldOverviewState;
  switch (type) {
    case ActionType.FETCH_ACTIVE_MEMBERS_REPORT_LOADING:
    case ActionType.FETCH_NEW_MEMBERS_REPORT_LOADING:
    case ActionType.FETCH_AUTO_OFFBOARDED_MEMBERS_REPORT_LOADING:
    case ActionType.FETCH_SELF_RESIGNED_MEMBERS_REPORT_LOADING:
      return {
        entities,
        entity,
        isLoading: true,
        isSuccess: false,
        error: {},
      };

    case ActionType.FETCH_ACTIVE_MEMBERS_REPORT_ERROR:
    case ActionType.FETCH_NEW_MEMBERS_REPORT_ERROR:
    case ActionType.FETCH_AUTO_OFFBOARDED_MEMBERS_REPORT_ERROR:
    case ActionType.FETCH_SELF_RESIGNED_MEMBERS_REPORT_ERROR:
      return {
        entities,
        entity,
        isLoading: false,
        isSuccess: false,
        error: payload,
      };

    case ActionType.FETCH_ACTIVE_MEMBERS_REPORT_COMPLETE:
    case ActionType.FETCH_NEW_MEMBERS_REPORT_COMPLETE:
    case ActionType.FETCH_AUTO_OFFBOARDED_MEMBERS_REPORT_COMPLETE:
    case ActionType.FETCH_SELF_RESIGNED_MEMBERS_REPORT_COMPLETE:
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
