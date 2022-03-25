import { AppActionType } from "redux/app";

const initialState = {
  entities: [],
  entity: null,
  isLoading: false,
  isSuccess: false,
  error: {},
};

export const groupReducer = (groupState = initialState, action) => {
  const { type, payload } = action;
  const { entities, entity } = groupState;

  let updatedGroups = [];
  let groupsToKeep = [];

  switch (type) {
    case AppActionType.SEARCH_GROUP_LOADING:
    case AppActionType.SEARCH_GROUPS_LOADING:
    case AppActionType.CREATE_GROUP_LOADING:
    case AppActionType.UPDATE_GROUP_LOADING:
    case AppActionType.DELETE_GROUP_LOADING:
      return {
        isLoading: true,
        isSuccess: false,
        error: {},
        entities,
        entity,
      };

    case AppActionType.SEARCH_GROUP_ERROR:
    case AppActionType.SEARCH_GROUPS_ERROR:
    case AppActionType.CREATE_GROUP_ERROR:
    case AppActionType.UPDATE_GROUP_ERROR:
    case AppActionType.DELETE_GROUP_ERROR:
      return {
        isLoading: false,
        isSuccess: false,
        error: payload,
        entities,
        entity,
      };

    case AppActionType.CREATE_GROUP_COMPLETE:
      return {
        isLoading: false,
        isSuccess: true,
        error: {},
        entities: [...groupState.entities, payload],
        entity: payload,
      };

    case AppActionType.SEARCH_GROUP_COMPLETE:
      return {
        isLoading: false,
        isSuccess: true,
        error: {},
        entities: [],
        entity: payload,
      };

    case AppActionType.SEARCH_GROUPS_COMPLETE:
      return {
        isLoading: false,
        isSuccess: true,
        error: {},
        entities: payload,
        entity: null,
      };

    case AppActionType.UPDATE_GROUP_COMPLETE:
      updatedGroups = groupState.entities.map(group => {
        if (group.id === payload.id) {
          return {
            ...group,
            ...payload,
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

    case AppActionType.DELETE_GROUP_COMPLETE:
      groupsToKeep = groupState.entities.filter(({ id }) => id !== payload);

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
