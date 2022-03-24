import { AnyAction } from "redux";

import { ActionType, StateType } from "redux/app";

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
    case ActionType.SEARCH_GROUP_LOADING:
    case ActionType.SEARCH_GROUPS_LOADING:
    case ActionType.CREATE_GROUP_LOADING:
    case ActionType.UPDATE_GROUP_LOADING:
    case ActionType.DELETE_GROUP_LOADING:
      return {
        isLoading: true,
        isSuccess: false,
        error: {},
        entities,
        entity,
      };

    case ActionType.SEARCH_GROUP_ERROR:
    case ActionType.SEARCH_GROUPS_ERROR:
    case ActionType.CREATE_GROUP_ERROR:
    case ActionType.UPDATE_GROUP_ERROR:
    case ActionType.DELETE_GROUP_ERROR:
      return {
        isLoading: false,
        isSuccess: false,
        error: payload,
        entities,
        entity,
      };

    case ActionType.CREATE_GROUP_COMPLETE:
      return {
        isLoading: false,
        isSuccess: true,
        error: {},
        entities: [...groupState.entities, payload],
        entity: payload,
      };

    case ActionType.SEARCH_GROUP_COMPLETE:
      return {
        isLoading: false,
        isSuccess: true,
        error: {},
        entities: [],
        entity: payload,
      };

    case ActionType.SEARCH_GROUPS_COMPLETE:
      return {
        isLoading: false,
        isSuccess: true,
        error: {},
        entities: payload,
        entity: null,
      };

    case ActionType.UPDATE_GROUP_COMPLETE:
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

    case ActionType.DELETE_GROUP_COMPLETE:
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
