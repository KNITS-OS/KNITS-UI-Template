import { AnyAction } from "redux";

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
  StateType,
} from "redux/app";

import { Group } from "types";

const initialState: StateType<Group> = {
  entities: [],
  entity: null,
  isLoading: false,
  isSuccess: false,
  error: {},
};

export const groupReducer = (groupState = initialState, action: AnyAction): StateType<Group> => {
  const { type, payload } = action;
  const { entities, entity } = groupState;

  let updatedGroups = [];
  let groupsToKeep = [];

  switch (type) {
    case SEARCH_GROUP_LOADING:
    case SEARCH_GROUPS_LOADING:
    case CREATE_GROUP_LOADING:
    case UPDATE_GROUP_LOADING:
    case DELETE_GROUP_LOADING:
      return {
        isLoading: true,
        isSuccess: false,
        error: {},
        entities,
        entity,
      };

    case SEARCH_GROUP_ERROR:
    case SEARCH_GROUPS_ERROR:
    case CREATE_GROUP_ERROR:
    case UPDATE_GROUP_ERROR:
    case DELETE_GROUP_ERROR:
      return {
        isLoading: false,
        isSuccess: false,
        error: payload,
        entities,
        entity,
      };

    case CREATE_GROUP_COMPLETE:
      return {
        isLoading: false,
        isSuccess: true,
        error: {},
        entities: [...groupState.entities, payload],
        entity: payload,
      };

    case SEARCH_GROUP_COMPLETE:
      return {
        isLoading: false,
        isSuccess: true,
        error: {},
        entities: [],
        entity: payload,
      };

    case SEARCH_GROUPS_COMPLETE:
      return {
        isLoading: false,
        isSuccess: true,
        error: {},
        entities: payload,
        entity: null,
      };

    case UPDATE_GROUP_COMPLETE:
      updatedGroups = groupState.entities.map(group => {
        if (group.id === payload.id) {
          return {
            ...group,
            ...payload.data,
          };
        }
        return group;
      });

      return {
        isLoading: false,
        isSuccess: true,
        error: {},
        entities: updatedGroups,
        entity: null,
      };

    case DELETE_GROUP_COMPLETE:
      groupsToKeep = groupState.entities.filter(({ id }) => id !== parseInt(payload.id));

      return {
        isLoading: false,
        isSuccess: true,
        error: {},
        entities: groupsToKeep,
        entity: null,
      };

    default:
      return groupState;
  }
};
