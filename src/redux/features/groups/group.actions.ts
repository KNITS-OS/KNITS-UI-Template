import { AnyAction, Dispatch } from "redux";

import { ActionType, typedAction, SerializedError, IUpdated } from "redux/app";

import { Group } from "types";

import { groupService } from ".";

const createGroupLoading = () =>
  typedAction(ActionType.CREATE_GROUP_LOADING, ActionType.CREATE_GROUP_LOADING);
const searchGroupLoading = () =>
  typedAction(ActionType.SEARCH_GROUP_LOADING, ActionType.SEARCH_GROUP_LOADING);
const searchGroupsLoading = () =>
  typedAction(ActionType.SEARCH_GROUPS_LOADING, ActionType.SEARCH_GROUPS_LOADING);
const updateGroupLoading = () =>
  typedAction(ActionType.UPDATE_GROUP_LOADING, ActionType.UPDATE_GROUP_LOADING);
const deleteGroupLoading = () =>
  typedAction(ActionType.DELETE_GROUP_LOADING, ActionType.DELETE_GROUP_LOADING);

const createGroupComplete = (data: Group) => typedAction(ActionType.CREATE_GROUP_COMPLETE, data);
const searchGroupComplete = (data: Group) => typedAction(ActionType.SEARCH_GROUP_COMPLETE, data);
const searchGroupsComplete = (data: Group[]) =>
  typedAction(ActionType.SEARCH_GROUPS_COMPLETE, data);
const updateGroupComplete = (data: Group) => typedAction(ActionType.UPDATE_GROUP_COMPLETE, data);
const deleteGroupComplete = (data: number) => typedAction(ActionType.DELETE_GROUP_COMPLETE, data);

const createGroupError = (err: SerializedError) =>
  typedAction(ActionType.CREATE_GROUP_ERROR, err.message);

const searchGroupError = (err: SerializedError) =>
  typedAction(ActionType.SEARCH_GROUP_ERROR, err.message);

const searchGroupsError = (err: SerializedError) =>
  typedAction(ActionType.SEARCH_GROUPS_ERROR, err.message);

const updateGroupError = (err: SerializedError) =>
  typedAction(ActionType.UPDATE_GROUP_ERROR, err.message);

const deleteGroupError = (err: SerializedError) =>
  typedAction(ActionType.DELETE_GROUP_ERROR, err.message);

export const createGroup = (group: Group) => async (dispatch: Dispatch<AnyAction>) => {
  try {
    dispatch(createGroupLoading());

    const { data } = await groupService.createGroup(group);

    dispatch(createGroupComplete(data));
  } catch (err) {
    dispatch(createGroupError(err as SerializedError));
  }
};

export const searchGroup = (id: number) => async (dispatch: Dispatch<AnyAction>) => {
  try {
    dispatch(searchGroupLoading());

    const { data } = await groupService.getGroupById(id);

    dispatch(searchGroupComplete(data));
  } catch (err) {
    dispatch(searchGroupError(err as SerializedError));
  }
};

export const searchGroups = () => async (dispatch: Dispatch<AnyAction>) => {
  try {
    dispatch(searchGroupsLoading());

    const { data } = await groupService.findAll();

    dispatch(searchGroupsComplete(data));
  } catch (err) {
    dispatch(searchGroupsError(err as SerializedError));
  }
};

export const updateGroup =
  (updatedGroup: IUpdated<Group>) => async (dispatch: Dispatch<AnyAction>) => {
    try {
      dispatch(updateGroupLoading());
      const { data } = await groupService.updateGroup(updatedGroup);

      dispatch(updateGroupComplete(data));
    } catch (err) {
      dispatch(updateGroupError(err as SerializedError));
    }
  };

export const deleteGroup = (id: number) => async (dispatch: Dispatch<AnyAction>) => {
  try {
    dispatch(deleteGroupLoading());

    await groupService.deleteGroup(id);

    dispatch(deleteGroupComplete(id));
  } catch (err) {
    dispatch(deleteGroupError(err as SerializedError));
  }
};
