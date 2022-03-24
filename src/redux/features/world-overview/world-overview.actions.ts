import { Dispatch } from "redux";
import { ActionType } from "typesafe-actions";

import { AppActionType, typedAction, SerializedError } from "redux/app";

import { MapValues } from "types";

import { worldOverviewService } from ".";

// Loading
const fetchActiveMembersReportLoading = () =>
  typedAction(
    AppActionType.FETCH_ACTIVE_MEMBERS_REPORT_LOADING,
    AppActionType.FETCH_ACTIVE_MEMBERS_REPORT_LOADING
  );
const fetchNewMembersReportLoading = () =>
  typedAction(
    AppActionType.FETCH_NEW_MEMBERS_REPORT_LOADING,
    AppActionType.FETCH_NEW_MEMBERS_REPORT_LOADING
  );
const fetchAutoOffboardedMembersReportLoading = () =>
  typedAction(
    AppActionType.FETCH_AUTO_OFFBOARDED_MEMBERS_REPORT_LOADING,
    AppActionType.FETCH_AUTO_OFFBOARDED_MEMBERS_REPORT_LOADING
  );
const fetchSelfResignedMembersReportLoading = () =>
  typedAction(
    AppActionType.FETCH_SELF_RESIGNED_MEMBERS_REPORT_LOADING,
    AppActionType.FETCH_SELF_RESIGNED_MEMBERS_REPORT_LOADING
  );

// Complete
const fetchActiveMembersReportComplete = (data: MapValues) =>
  typedAction(AppActionType.FETCH_ACTIVE_MEMBERS_REPORT_COMPLETE, data);

const fetchNewMembersReportComplete = (data: MapValues) =>
  typedAction(AppActionType.FETCH_NEW_MEMBERS_REPORT_COMPLETE, data);

const fetchAutoOffboardedReportComplete = (data: MapValues) =>
  typedAction(AppActionType.FETCH_AUTO_OFFBOARDED_MEMBERS_REPORT_COMPLETE, data);

const fetchSelfResignedMembersReportComplete = (data: MapValues) =>
  typedAction(AppActionType.FETCH_SELF_RESIGNED_MEMBERS_REPORT_COMPLETE, data);

// Error
const fetchActiveMembersReportError = (err: SerializedError) =>
  typedAction(AppActionType.FETCH_ACTIVE_MEMBERS_REPORT_ERROR, err);

const fetchNewMembersReportError = (err: SerializedError) =>
  typedAction(AppActionType.FETCH_NEW_MEMBERS_REPORT_ERROR, err);

const fetchAutoOffboardedMembersReportError = (err: SerializedError) =>
  typedAction(AppActionType.FETCH_AUTO_OFFBOARDED_MEMBERS_REPORT_ERROR, err);

const fetchSelfResignedMembersReportError = (err: SerializedError) =>
  typedAction(AppActionType.FETCH_SELF_RESIGNED_MEMBERS_REPORT_ERROR, err);

export type WorldOverviewActionType = ActionType<
  | typeof fetchActiveMembersReportLoading
  | typeof fetchNewMembersReportLoading
  | typeof fetchAutoOffboardedMembersReportLoading
  | typeof fetchSelfResignedMembersReportLoading
  | typeof fetchActiveMembersReportComplete
  | typeof fetchNewMembersReportComplete
  | typeof fetchAutoOffboardedReportComplete
  | typeof fetchSelfResignedMembersReportComplete
  | typeof fetchActiveMembersReportError
  | typeof fetchNewMembersReportError
  | typeof fetchAutoOffboardedMembersReportError
  | typeof fetchSelfResignedMembersReportError
>;

export const fetchActiveMembersReport =
  () => async (dispatch: Dispatch<WorldOverviewActionType>) => {
    try {
      dispatch(fetchActiveMembersReportLoading());

      const { data } = await worldOverviewService.getActiveMembersMapData();

      dispatch(fetchActiveMembersReportComplete(data));
    } catch (err) {
      dispatch(fetchActiveMembersReportError(err as SerializedError));
    }
  };

export const fetchNewMembersReport = () => async (dispatch: Dispatch<WorldOverviewActionType>) => {
  try {
    dispatch(fetchNewMembersReportLoading());

    const { data } = await worldOverviewService.getNewMembersMapData();

    dispatch(fetchNewMembersReportComplete(data));
  } catch (err) {
    dispatch(fetchNewMembersReportError(err as SerializedError));
  }
};

export const fetchAutoOffboardedMembersReport =
  () => async (dispatch: Dispatch<WorldOverviewActionType>) => {
    try {
      dispatch(fetchAutoOffboardedMembersReportLoading());

      const { data } = await worldOverviewService.getAutoOffboardedMembersMapData();

      dispatch(fetchAutoOffboardedReportComplete(data));
    } catch (err) {
      dispatch(fetchAutoOffboardedMembersReportError(err as SerializedError));
    }
  };
export const fetchSelfResignedMembersReport =
  () => async (dispatch: Dispatch<WorldOverviewActionType>) => {
    try {
      dispatch(fetchSelfResignedMembersReportLoading());

      const { data } = await worldOverviewService.getSelfResignedMembersMapData();

      dispatch(fetchSelfResignedMembersReportComplete(data));
    } catch (err) {
      dispatch(fetchSelfResignedMembersReportError(err as SerializedError));
    }
  };
