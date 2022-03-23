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
} from "redux/app";

import { worldOverviewService } from ".";

export const fetchActiveMembersReport = () => async (dispatch: Dispatch<AnyAction>) => {
  try {
    dispatch({
      type: FETCH_ACTIVE_MEMBERS_REPORT_LOADING,
      payload: FETCH_ACTIVE_MEMBERS_REPORT_LOADING,
    });

    const { data } = await worldOverviewService.getActiveMembersMapData();

    dispatch({
      type: FETCH_ACTIVE_MEMBERS_REPORT_COMPLETE,
      payload: data,
    });
  } catch (err) {
    dispatch({
      type: FETCH_ACTIVE_MEMBERS_REPORT_ERROR,
      payload: err.message,
    });
  }
};
export const fetchNewMembersReport = () => async (dispatch: Dispatch<AnyAction>) => {
  try {
    dispatch({
      type: FETCH_NEW_MEMBERS_REPORT_LOADING,
      payload: FETCH_NEW_MEMBERS_REPORT_LOADING,
    });

    const { data } = await worldOverviewService.getNewMembersMapData();

    dispatch({
      type: FETCH_NEW_MEMBERS_REPORT_COMPLETE,
      payload: data,
    });
  } catch (err) {
    dispatch({
      type: FETCH_NEW_MEMBERS_REPORT_ERROR,
      payload: err.message,
    });
  }
};
export const fetchAutoOffboardedMembersReport = () => async (dispatch: Dispatch<AnyAction>) => {
  try {
    dispatch({
      type: FETCH_AUTO_OFFBOARDED_MEMBERS_REPORT_LOADING,
      payload: FETCH_AUTO_OFFBOARDED_MEMBERS_REPORT_LOADING,
    });

    const { data } = await worldOverviewService.getAutoOffboardedMembersMapData();

    dispatch({
      type: FETCH_AUTO_OFFBOARDED_MEMBERS_REPORT_COMPLETE,
      payload: data,
    });
  } catch (err) {
    dispatch({
      type: FETCH_AUTO_OFFBOARDED_MEMBERS_REPORT_ERROR,
      payload: err.message,
    });
  }
};
export const fetchSelfResignedMembersReport = () => async (dispatch: Dispatch<AnyAction>) => {
  try {
    dispatch({
      type: FETCH_SELF_RESIGNED_MEMBERS_REPORT_LOADING,
      payload: FETCH_SELF_RESIGNED_MEMBERS_REPORT_LOADING,
    });

    const { data } = await worldOverviewService.getSelfResignedMembersMapData();

    dispatch({
      type: FETCH_SELF_RESIGNED_MEMBERS_REPORT_COMPLETE,
      payload: data,
    });
  } catch (err) {
    dispatch({
      type: FETCH_SELF_RESIGNED_MEMBERS_REPORT_ERROR,
      payload: err.message,
    });
  }
};
