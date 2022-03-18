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

const initialState = {
  entities: [],
  entity: null,
  isLoading: false,
  isSuccess: false,
  error: {},
};

export const groupReducer = (groupState = initialState, action = {}) => {
  const { type, payload } = action;
  const { entities, entity } = groupState;

  let updatedGroups = [];
  let groupsToKeep = [];
  let deactivatedGroups = [];
  let addedEmployeeGroups = [];
  let removedEmployeeGroups = [];

  switch (type) {
    case SEARCH_GROUP_LOADING:
    case SEARCH_GROUPS_LOADING:
    case CREATE_GROUP_LOADING:
    case UPDATE_GROUP_LOADING:
    case DELETE_GROUP_LOADING:
    case DEACTIVATE_GROUP_LOADING:
    case ADD_EMPLOYEE_TO_GROUP_LOADING:
    case REMOVE_EMPLOYEE_FROM_GROUP_LOADING:
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
    case DEACTIVATE_GROUP_ERROR:
    case ADD_EMPLOYEE_TO_GROUP_ERROR:
    case REMOVE_EMPLOYEE_FROM_GROUP_ERROR:
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

    case DELETE_GROUP_COMPLETE:
      groupsToKeep = groupState.entities.filter(({ id }) => id !== parseInt(payload.id));

      return {
        isLoading: false,
        isSuccess: true,
        error: {},
        entities: groupsToKeep,
        entity: null,
      };

    case DEACTIVATE_GROUP_COMPLETE:
      deactivatedGroups = groupState.entities.map(group => {
        if (group.id === payload) {
          return {
            ...group,
            active: !group.active,
          };
        }
        return group;
      });
      return {
        isLoading: false,
        isSuccess: true,
        error: {},
        entities: deactivatedGroups,
        entity: null,
      };

    case ADD_EMPLOYEE_TO_GROUP_COMPLETE:
      addedEmployeeGroups = groupState.entities.map(group => {
        if (group.id === payload.id) {
          return {
            ...group,
            members: { ...payload.members },
          };
        }
        return group;
      });

      return {
        isLoading: false,
        isSuccess: true,
        error: {},
        entities: addedEmployeeGroups,
        entity: null,
      };

    case REMOVE_EMPLOYEE_FROM_GROUP_COMPLETE:
      removedEmployeeGroups = groupState.entities.map(group => {
        if (group.id === payload.id) {
          return {
            ...group,
            members: group.members.filter(({ id }) => !payload.members.includes(id)),
          };
        }
        return group;
      });

      return {
        isLoading: false,
        isSuccess: true,
        error: {},
        entities: removedEmployeeGroups,
        entity: null,
      };

    default:
      return groupState;
  }
};
