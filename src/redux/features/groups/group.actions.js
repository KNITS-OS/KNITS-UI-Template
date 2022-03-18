import {
  ADD_EMPLOYEE_TO_GROUP_COMPLETE,
  ADD_EMPLOYEE_TO_GROUP_ERROR,
  ADD_EMPLOYEE_TO_GROUP_LOADING,
  CREATE_GROUP_COMPLETE,
  CREATE_GROUP_ERROR,
  CREATE_GROUP_LOADING,
  DEACTIVATE_GROUP_COMPLETE,
  DEACTIVATE_GROUP_ERROR,
  DEACTIVATE_GROUP_LOADING,
  DELETE_GROUP_COMPLETE,
  DELETE_GROUP_ERROR,
  DELETE_GROUP_LOADING,
  REMOVE_EMPLOYEE_FROM_GROUP_COMPLETE,
  REMOVE_EMPLOYEE_FROM_GROUP_ERROR,
  REMOVE_EMPLOYEE_FROM_GROUP_LOADING,
  SEARCH_GROUP_COMPLETE,
  SEARCH_GROUP_ERROR,
  SEARCH_GROUP_LOADING,
  SEARCH_GROUPS_COMPLETE,
  SEARCH_GROUPS_ERROR,
  SEARCH_GROUPS_LOADING,
  UPDATE_GROUP_COMPLETE,
  UPDATE_GROUP_ERROR,
  UPDATE_GROUP_LOADING,
} from "redux/app";

import { groupService } from ".";

export const createGroup = body => async dispatch => {
  try {
    dispatch({
      type: CREATE_GROUP_LOADING,
      payload: CREATE_GROUP_LOADING,
    });

    const { data } = await groupService.createGroup(body);

    dispatch({
      type: CREATE_GROUP_COMPLETE,
      payload: data,
    });
  } catch (err) {
    dispatch({ type: CREATE_GROUP_ERROR, payload: err.message });
  }
};

export const searchGroup = id => async dispatch => {
  try {
    dispatch({
      type: SEARCH_GROUP_LOADING,
      payload: SEARCH_GROUP_LOADING,
    });

    const { data } = await groupService.getGroupById(id);

    dispatch({
      type: SEARCH_GROUP_COMPLETE,
      payload: data,
    });
  } catch (err) {
    dispatch({
      type: SEARCH_GROUP_ERROR,
      payload: err.message,
    });
  }
};

export const searchGroups = () => async dispatch => {
  try {
    dispatch({
      type: SEARCH_GROUPS_LOADING,
      payload: SEARCH_GROUPS_LOADING,
    });

    const { data } = await groupService.findAll();

    dispatch({
      type: SEARCH_GROUPS_COMPLETE,
      payload: data,
    });
  } catch (err) {
    dispatch({
      type: SEARCH_GROUPS_ERROR,
      payload: err.message,
    });
  }
};

export const updateGroup = (id, body) => async dispatch => {
  try {
    dispatch({
      type: UPDATE_GROUP_LOADING,
      payload: UPDATE_GROUP_LOADING,
    });
    const { data } = await groupService.updateGroup(id, body);

    dispatch({
      type: UPDATE_GROUP_COMPLETE,
      payload: data,
    });
  } catch (err) {
    dispatch({ type: UPDATE_GROUP_ERROR, payload: err.message });
  }
};

export const deleteGroup = id => async dispatch => {
  try {
    dispatch({
      type: DELETE_GROUP_LOADING,
      payload: DELETE_GROUP_LOADING,
    });

    await groupService.deleteGroup(id);

    dispatch({
      type: DELETE_GROUP_COMPLETE,
      payload: { id },
    });
  } catch (err) {
    dispatch({ type: DELETE_GROUP_ERROR, payload: err.message });
  }
};

export const deactivateGroup = id => async dispatch => {
  try {
    dispatch({
      type: DEACTIVATE_GROUP_LOADING,
      payload: DEACTIVATE_GROUP_LOADING,
    });

    await groupService.updateGroup(id, { active: false });

    dispatch({
      type: DEACTIVATE_GROUP_COMPLETE,
      payload: { id },
    });
  } catch (err) {
    dispatch({ type: DEACTIVATE_GROUP_ERROR, payload: err.message });
  }
};

export const addCareMemberToGroup = (id, body) => async dispatch => {
  try {
    dispatch({
      type: ADD_EMPLOYEE_TO_GROUP_LOADING,
      payload: ADD_EMPLOYEE_TO_GROUP_LOADING,
    });

    const { data } = await groupService.updateGroup(id, body);

    dispatch({
      type: ADD_EMPLOYEE_TO_GROUP_COMPLETE,
      payload: { id, data },
    });
  } catch (err) {
    dispatch({
      type: ADD_EMPLOYEE_TO_GROUP_ERROR,
      payload: err.message,
    });
  }
};

export const removeCareMemberFromGroup = (id, body) => async dispatch => {
  try {
    dispatch({
      type: REMOVE_EMPLOYEE_FROM_GROUP_LOADING,
      payload: REMOVE_EMPLOYEE_FROM_GROUP_LOADING,
    });

    const { data } = await groupService.updateGroup(id, body);

    dispatch({
      type: REMOVE_EMPLOYEE_FROM_GROUP_COMPLETE,
      payload: { id, data },
    });
  } catch (err) {
    dispatch({
      type: REMOVE_EMPLOYEE_FROM_GROUP_ERROR,
      payload: err.message,
    });
  }
};
