import { AnyAction, Dispatch } from "redux";

import {
  FETCH_ACTIVE_MEMBERS_REPORT_LOADING,
  FETCH_AUTO_OFFBOARDED_MEMBERS_REPORT_LOADING,
  FETCH_ACTIVE_MEMBERS_REPORT_ERROR,
  FETCH_AUTO_OFFBOARDED_MEMBERS_REPORT_ERROR,
  FETCH_SELF_RESIGNED_MEMBERS_REPORT_ERROR,
  FETCH_NEW_MEMBERS_REPORT_ERROR,
  FETCH_SELF_RESIGNED_MEMBERS_REPORT_LOADING,
  FETCH_NEW_MEMBERS_REPORT_LOADING,
  FETCH_ACTIVE_MEMBERS_REPORT_COMPLETE,
  FETCH_AUTO_OFFBOARDED_MEMBERS_REPORT_COMPLETE,
  FETCH_SELF_RESIGNED_MEMBERS_REPORT_COMPLETE,
  FETCH_NEW_MEMBERS_REPORT_COMPLETE,
  typedAction,
  SerializedError,
} from "redux/app";

import { MapValues } from "types";

import { worldOverviewService } from ".";

// Loading
const fetchActiveMembersReportLoading = () =>
  typedAction(FETCH_ACTIVE_MEMBERS_REPORT_LOADING, FETCH_ACTIVE_MEMBERS_REPORT_LOADING);
const fetchNewMembersReportLoading = () =>
  typedAction(FETCH_NEW_MEMBERS_REPORT_LOADING, FETCH_NEW_MEMBERS_REPORT_LOADING);
const fetchAutoOffboardedMembersReportLoading = () =>
  typedAction(
    FETCH_AUTO_OFFBOARDED_MEMBERS_REPORT_LOADING,
    FETCH_AUTO_OFFBOARDED_MEMBERS_REPORT_LOADING
  );
const fetchSelfResignedMembersReportLoading = () =>
  typedAction(
    FETCH_SELF_RESIGNED_MEMBERS_REPORT_LOADING,
    FETCH_SELF_RESIGNED_MEMBERS_REPORT_LOADING
  );

// Complete
const fetchActiveMembersReportComplete = (data: MapValues) =>
  typedAction(FETCH_ACTIVE_MEMBERS_REPORT_COMPLETE, data);

const fetchNewMembersReportComplete = (data: MapValues) =>
  typedAction(FETCH_NEW_MEMBERS_REPORT_COMPLETE, data);

const fetchAutoOffboardedReportComplete = (data: MapValues) =>
  typedAction(FETCH_AUTO_OFFBOARDED_MEMBERS_REPORT_COMPLETE, data);

const fetchSelfResignedMembersReportComplete = (data: MapValues) =>
  typedAction(FETCH_SELF_RESIGNED_MEMBERS_REPORT_COMPLETE, data);

// Error
const fetchActiveMembersReportError = (err: SerializedError) =>
  typedAction(FETCH_ACTIVE_MEMBERS_REPORT_ERROR, err.message);

const fetchNewMembersReportError = (err: SerializedError) =>
  typedAction(FETCH_NEW_MEMBERS_REPORT_ERROR, err.message);

const fetchAutoOffboardedMembersReportError = (err: SerializedError) =>
  typedAction(FETCH_AUTO_OFFBOARDED_MEMBERS_REPORT_ERROR, err.message);

const fetchSelfResignedMembersReportError = (err: SerializedError) =>
  typedAction(FETCH_SELF_RESIGNED_MEMBERS_REPORT_ERROR, err.message);

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
