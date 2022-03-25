import { Dispatch } from "redux";
import { ActionType } from "typesafe-actions";

import { AppActionType, typedAction, SerializedError, IUpdated } from "redux/app";

import { Group, GroupSaveRequest } from "types";

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

const createGroupComplete = (data: Group) => typedAction(AppActionType.CREATE_GROUP_COMPLETE, data);
const searchGroupComplete = (data: Group) => typedAction(AppActionType.SEARCH_GROUP_COMPLETE, data);
const searchGroupsComplete = (data: Group[]) =>
  typedAction(AppActionType.SEARCH_GROUPS_COMPLETE, data);
const updateGroupComplete = (data: Group) => typedAction(AppActionType.UPDATE_GROUP_COMPLETE, data);
const deleteGroupComplete = (data: number) =>
  typedAction(AppActionType.DELETE_GROUP_COMPLETE, data);

const createGroupError = (err: SerializedError) =>
  typedAction(AppActionType.CREATE_GROUP_ERROR, err);

const searchGroupError = (err: SerializedError) =>
  typedAction(AppActionType.SEARCH_GROUP_ERROR, err);

const searchGroupsError = (err: SerializedError) =>
  typedAction(AppActionType.SEARCH_GROUPS_ERROR, err);

const updateGroupError = (err: SerializedError) =>
  typedAction(AppActionType.UPDATE_GROUP_ERROR, err);

const deleteGroupError = (err: SerializedError) =>
  typedAction(AppActionType.DELETE_GROUP_ERROR, err);

export type GroupActionType = ActionType<
  | typeof createGroupLoading
  | typeof searchGroupLoading
  | typeof searchGroupsLoading
  | typeof updateGroupLoading
  | typeof deleteGroupLoading
  | typeof createGroupComplete
  | typeof searchGroupComplete
  | typeof searchGroupsComplete
  | typeof updateGroupComplete
  | typeof deleteGroupComplete
  | typeof createGroupError
  | typeof searchGroupError
  | typeof searchGroupsError
  | typeof updateGroupError
  | typeof deleteGroupError
>;

export const createGroup =
  (group: GroupSaveRequest) => async (dispatch: Dispatch<GroupActionType>) => {
    try {
      dispatch(createGroupLoading());
      const { data } = await groupService.createGroup(group);

      dispatch(createGroupComplete(data));
    } catch (err) {
      dispatch(createGroupError(err as SerializedError));
    }
  };

export const searchGroup = (id: number) => async (dispatch: Dispatch<GroupActionType>) => {
  try {
    dispatch(searchGroupLoading());

    const { data } = await groupService.getGroupById(id);

    dispatch(searchGroupComplete(data));
  } catch (err) {
    dispatch(searchGroupError(err as SerializedError));
  }
};

export const searchGroups = () => async (dispatch: Dispatch<GroupActionType>) => {
  try {
    dispatch(searchGroupsLoading());

    const { data } = await groupService.findAll();

    dispatch(searchGroupsComplete(data));
  } catch (err) {
    dispatch(searchGroupsError(err as SerializedError));
  }
};

export const updateGroup =
  (updatedGroup: IUpdated<Group>) => async (dispatch: Dispatch<GroupActionType>) => {
    try {
      dispatch(updateGroupLoading());
      const { data } = await groupService.updateGroup(updatedGroup);

      dispatch(updateGroupComplete(data));
    } catch (err) {
      dispatch(updateGroupError(err as SerializedError));
    }
  };

export const deleteGroup = (id: number) => async (dispatch: Dispatch<GroupActionType>) => {
  try {
    dispatch(deleteGroupLoading());

    await groupService.deleteGroup(id);

    dispatch(deleteGroupComplete(id));
  } catch (err) {
    dispatch(deleteGroupError(err as SerializedError));
  }
};
