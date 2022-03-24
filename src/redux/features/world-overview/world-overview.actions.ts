import { AnyAction, Dispatch } from "redux";

import { ActionType, typedAction, SerializedError } from "redux/app";

import { MapValues } from "types";

import { worldOverviewService } from ".";

// Loading
const fetchActiveMembersReportLoading = () =>
  typedAction(
    ActionType.FETCH_ACTIVE_MEMBERS_REPORT_LOADING,
    ActionType.FETCH_ACTIVE_MEMBERS_REPORT_LOADING
  );
const fetchNewMembersReportLoading = () =>
  typedAction(
    ActionType.FETCH_NEW_MEMBERS_REPORT_LOADING,
    ActionType.FETCH_NEW_MEMBERS_REPORT_LOADING
  );
const fetchAutoOffboardedMembersReportLoading = () =>
  typedAction(
    ActionType.FETCH_AUTO_OFFBOARDED_MEMBERS_REPORT_LOADING,
    ActionType.FETCH_AUTO_OFFBOARDED_MEMBERS_REPORT_LOADING
  );
const fetchSelfResignedMembersReportLoading = () =>
  typedAction(
    ActionType.FETCH_SELF_RESIGNED_MEMBERS_REPORT_LOADING,
    ActionType.FETCH_SELF_RESIGNED_MEMBERS_REPORT_LOADING
  );

// Complete
const fetchActiveMembersReportComplete = (data: MapValues) =>
  typedAction(ActionType.FETCH_ACTIVE_MEMBERS_REPORT_COMPLETE, data);

const fetchNewMembersReportComplete = (data: MapValues) =>
  typedAction(ActionType.FETCH_NEW_MEMBERS_REPORT_COMPLETE, data);

const fetchAutoOffboardedReportComplete = (data: MapValues) =>
  typedAction(ActionType.FETCH_AUTO_OFFBOARDED_MEMBERS_REPORT_COMPLETE, data);

const fetchSelfResignedMembersReportComplete = (data: MapValues) =>
  typedAction(ActionType.FETCH_SELF_RESIGNED_MEMBERS_REPORT_COMPLETE, data);

// Error
const fetchActiveMembersReportError = (err: SerializedError) =>
  typedAction(ActionType.FETCH_ACTIVE_MEMBERS_REPORT_ERROR, err.message);

const fetchNewMembersReportError = (err: SerializedError) =>
  typedAction(ActionType.FETCH_NEW_MEMBERS_REPORT_ERROR, err.message);

const fetchAutoOffboardedMembersReportError = (err: SerializedError) =>
  typedAction(ActionType.FETCH_AUTO_OFFBOARDED_MEMBERS_REPORT_ERROR, err.message);

const fetchSelfResignedMembersReportError = (err: SerializedError) =>
  typedAction(ActionType.FETCH_SELF_RESIGNED_MEMBERS_REPORT_ERROR, err.message);

export const fetchActiveMembersReport = () => async (dispatch: Dispatch<AnyAction>) => {
  try {
    dispatch(fetchActiveMembersReportLoading());

    const { data } = await worldOverviewService.getActiveMembersMapData();

    dispatch(fetchActiveMembersReportComplete(data));
  } catch (err) {
    dispatch(fetchActiveMembersReportError(err as SerializedError));
  }
};

export const fetchNewMembersReport = () => async (dispatch: Dispatch<AnyAction>) => {
  try {
    dispatch(fetchNewMembersReportLoading());

    const { data } = await worldOverviewService.getNewMembersMapData();

    dispatch(fetchNewMembersReportComplete(data));
  } catch (err) {
    dispatch(fetchNewMembersReportError(err as SerializedError));
  }
};

export const fetchAutoOffboardedMembersReport = () => async (dispatch: Dispatch<AnyAction>) => {
  try {
    dispatch(fetchAutoOffboardedMembersReportLoading());

    const { data } = await worldOverviewService.getAutoOffboardedMembersMapData();

    dispatch(fetchAutoOffboardedReportComplete(data));
  } catch (err) {
    dispatch(fetchAutoOffboardedMembersReportError(err as SerializedError));
  }
};
export const fetchSelfResignedMembersReport = () => async (dispatch: Dispatch<AnyAction>) => {
  try {
    dispatch(fetchSelfResignedMembersReportLoading());

    const { data } = await worldOverviewService.getSelfResignedMembersMapData();

    dispatch(fetchSelfResignedMembersReportComplete(data));
  } catch (err) {
    dispatch(fetchSelfResignedMembersReportError(err as SerializedError));
  }
};
