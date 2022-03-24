import { AnyAction, Dispatch } from "redux";

import {
  CREATE_GROUP_COMPLETE,
  CREATE_GROUP_ERROR,
  CREATE_GROUP_LOADING,
  DELETE_GROUP_COMPLETE,
  DELETE_GROUP_ERROR,
  DELETE_GROUP_LOADING,
  SEARCH_GROUP_COMPLETE,
  SEARCH_GROUP_ERROR,
  SEARCH_GROUP_LOADING,
  SEARCH_GROUPS_COMPLETE,
  SEARCH_GROUPS_ERROR,
  SEARCH_GROUPS_LOADING,
  UPDATE_GROUP_COMPLETE,
  UPDATE_GROUP_ERROR,
  UPDATE_GROUP_LOADING,
  typedAction,
  SerializedError,
  IUpdated,
} from "redux/app";

import { Group } from "types";

import { groupService } from ".";

const createGroupLoading = () => typedAction(CREATE_GROUP_LOADING, CREATE_GROUP_LOADING);
const searchGroupLoading = () => typedAction(SEARCH_GROUP_LOADING, SEARCH_GROUP_LOADING);
const searchGroupsLoading = () => typedAction(SEARCH_GROUPS_LOADING, SEARCH_GROUPS_LOADING);
const updateGroupLoading = () => typedAction(UPDATE_GROUP_LOADING, UPDATE_GROUP_LOADING);
const deleteGroupLoading = () => typedAction(DELETE_GROUP_LOADING, DELETE_GROUP_LOADING);

const createGroupComplete = (data: Group) => typedAction(CREATE_GROUP_COMPLETE, data);
const searchGroupComplete = (data: Group) => typedAction(SEARCH_GROUP_COMPLETE, data);
const searchGroupsComplete = (data: Group[]) => typedAction(SEARCH_GROUPS_COMPLETE, data);
const updateGroupComplete = (data: Group) => typedAction(UPDATE_GROUP_COMPLETE, data);
const deleteGroupComplete = (data: number) => typedAction(DELETE_GROUP_COMPLETE, data);

const createGroupError = (err: SerializedError) => typedAction(CREATE_GROUP_ERROR, err.message);

const searchGroupError = (err: SerializedError) => typedAction(SEARCH_GROUP_ERROR, err.message);

const searchGroupsError = (err: SerializedError) => typedAction(SEARCH_GROUPS_ERROR, err.message);

const updateGroupError = (err: SerializedError) => typedAction(UPDATE_GROUP_ERROR, err.message);

const deleteGroupError = (err: SerializedError) => typedAction(DELETE_GROUP_ERROR, err.message);

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
