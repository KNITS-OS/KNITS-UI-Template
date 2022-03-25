import { AppActionType, typedAction } from "redux/app";

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
const fetchActiveMembersReportComplete = data =>
  typedAction(AppActionType.FETCH_ACTIVE_MEMBERS_REPORT_COMPLETE, data);

const fetchNewMembersReportComplete = data =>
  typedAction(AppActionType.FETCH_NEW_MEMBERS_REPORT_COMPLETE, data);

const fetchAutoOffboardedReportComplete = data =>
  typedAction(AppActionType.FETCH_AUTO_OFFBOARDED_MEMBERS_REPORT_COMPLETE, data);

const fetchSelfResignedMembersReportComplete = data =>
  typedAction(AppActionType.FETCH_SELF_RESIGNED_MEMBERS_REPORT_COMPLETE, data);

// Error
const fetchActiveMembersReportError = err =>
  typedAction(AppActionType.FETCH_ACTIVE_MEMBERS_REPORT_ERROR, err);

const fetchNewMembersReportError = err =>
  typedAction(AppActionType.FETCH_NEW_MEMBERS_REPORT_ERROR, err);

const fetchAutoOffboardedMembersReportError = err =>
  typedAction(AppActionType.FETCH_AUTO_OFFBOARDED_MEMBERS_REPORT_ERROR, err);

const fetchSelfResignedMembersReportError = err =>
  typedAction(AppActionType.FETCH_SELF_RESIGNED_MEMBERS_REPORT_ERROR, err);

export const fetchActiveMembersReport = () => async dispatch => {
  try {
    dispatch(fetchActiveMembersReportLoading());

    const { data } = await worldOverviewService.getActiveMembersMapData();

    dispatch(fetchActiveMembersReportComplete(data));
  } catch (err) {
    dispatch(fetchActiveMembersReportError(err));
  }
};

export const fetchNewMembersReport = () => async dispatch => {
  try {
    dispatch(fetchNewMembersReportLoading());

    const { data } = await worldOverviewService.getNewMembersMapData();

    dispatch(fetchNewMembersReportComplete(data));
  } catch (err) {
    dispatch(fetchNewMembersReportError(err));
  }
};

export const fetchAutoOffboardedMembersReport = () => async dispatch => {
  try {
    dispatch(fetchAutoOffboardedMembersReportLoading());

    const { data } = await worldOverviewService.getAutoOffboardedMembersMapData();

    dispatch(fetchAutoOffboardedReportComplete(data));
  } catch (err) {
    dispatch(fetchAutoOffboardedMembersReportError(err));
  }
};
export const fetchSelfResignedMembersReport = () => async dispatch => {
  try {
    dispatch(fetchSelfResignedMembersReportLoading());

    const { data } = await worldOverviewService.getSelfResignedMembersMapData();

    dispatch(fetchSelfResignedMembersReportComplete(data));
  } catch (err) {
    dispatch(fetchSelfResignedMembersReportError(err));
  }
};
