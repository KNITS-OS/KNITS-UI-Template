import { AppActionType, typedAction } from "redux/app";

import { groupService } from ".";

const createGroupLoading = () =>
  typedAction(AppActionType.CREATE_GROUP_LOADING, AppActionType.CREATE_GROUP_LOADING);
const searchGroupLoading = () =>
  typedAction(AppActionType.SEARCH_GROUP_LOADING, AppActionType.SEARCH_GROUP_LOADING);
const searchGroupsLoading = () =>
  typedAction(AppActionType.SEARCH_GROUPS_LOADING, AppActionType.SEARCH_GROUPS_LOADING);
const updateGroupLoading = () =>
  typedAction(AppActionType.UPDATE_GROUP_LOADING, AppActionType.UPDATE_GROUP_LOADING);
const deleteGroupLoading = () =>
  typedAction(AppActionType.DELETE_GROUP_LOADING, AppActionType.DELETE_GROUP_LOADING);

const createGroupComplete = data => typedAction(AppActionType.CREATE_GROUP_COMPLETE, data);
const searchGroupComplete = data => typedAction(AppActionType.SEARCH_GROUP_COMPLETE, data);
const searchGroupsComplete = data => typedAction(AppActionType.SEARCH_GROUPS_COMPLETE, data);
const updateGroupComplete = data => typedAction(AppActionType.UPDATE_GROUP_COMPLETE, data);
const deleteGroupComplete = data => typedAction(AppActionType.DELETE_GROUP_COMPLETE, data);

const createGroupError = err => typedAction(AppActionType.CREATE_GROUP_ERROR, err);

const searchGroupError = err => typedAction(AppActionType.SEARCH_GROUP_ERROR, err);

const searchGroupsError = err => typedAction(AppActionType.SEARCH_GROUPS_ERROR, err);

const updateGroupError = err => typedAction(AppActionType.UPDATE_GROUP_ERROR, err);

const deleteGroupError = err => typedAction(AppActionType.DELETE_GROUP_ERROR, err);

export const createGroup = group => async dispatch => {
  try {
    dispatch(createGroupLoading());
    const { data } = await groupService.createGroup(group);

    dispatch(createGroupComplete(data));
  } catch (err) {
    dispatch(createGroupError(err));
  }
};

export const searchGroup = id => async dispatch => {
  try {
    dispatch(searchGroupLoading());

    const { data } = await groupService.getGroupById(id);

    dispatch(searchGroupComplete(data));
  } catch (err) {
    dispatch(searchGroupError(err));
  }
};

export const searchGroups = () => async dispatch => {
  try {
    dispatch(searchGroupsLoading());

    const { data } = await groupService.findAll();

    dispatch(searchGroupsComplete(data));
  } catch (err) {
    dispatch(searchGroupsError(err));
  }
};

export const updateGroup = updatedGroup => async dispatch => {
  try {
    dispatch(updateGroupLoading());
    const { data } = await groupService.updateGroup(updatedGroup);

    dispatch(updateGroupComplete(data));
  } catch (err) {
    dispatch(updateGroupError(err));
  }
};

export const deleteGroup = id => async dispatch => {
  try {
    dispatch(deleteGroupLoading());

    await groupService.deleteGroup(id);

    dispatch(deleteGroupComplete(id));
  } catch (err) {
    dispatch(deleteGroupError(err));
  }
};
