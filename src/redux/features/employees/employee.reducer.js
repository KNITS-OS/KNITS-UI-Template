import {
  DELETE_EMPLOYEE_COMPLETE,
  DELETE_EMPLOYEE_ERROR,
  DELETE_EMPLOYEE_LOADING,
  SEARCH_EMPLOYEES_BY_IDS_COMPLETE,
  SEARCH_EMPLOYEES_BY_IDS_ERROR,
  SEARCH_EMPLOYEES_BY_IDS_LOADING,
  SEARCH_EMPLOYEES_COMPLETE,
  SEARCH_EMPLOYEES_ERROR,
  SEARCH_EMPLOYEES_LOADING,
  SEARCH_EMPLOYEE_COMPLETE,
  SEARCH_EMPLOYEE_ERROR,
  SEARCH_EMPLOYEE_LOADING,
  UPDATE_EMPLOYEE_COMPLETE,
  UPDATE_EMPLOYEE_ERROR,
  UPDATE_EMPLOYEE_LOADING,
} from "redux/app";

const initialState = {
  entities: [],
  entity: null,
  isLoading: false,
  isSuccess: false,
  error: {},
};

export const employeeReducer = (employeeState = initialState, action = {}) => {
  const { type, payload } = action;
  const { entities, entity } = employeeState;

  let updatedEmployees = [];
  let employeesToKeep = [];

  switch (type) {
    case SEARCH_EMPLOYEE_LOADING:
    case SEARCH_EMPLOYEES_LOADING:
    case SEARCH_EMPLOYEES_BY_IDS_LOADING:
    case UPDATE_EMPLOYEE_LOADING:
    case DELETE_EMPLOYEE_LOADING:
      return {
        isLoading: true,
        isSuccess: false,
        error: {},
        entities,
        entity,
      };

    case SEARCH_EMPLOYEE_ERROR:
    case SEARCH_EMPLOYEES_ERROR:
    case SEARCH_EMPLOYEES_BY_IDS_ERROR:
    case UPDATE_EMPLOYEE_ERROR:
    case DELETE_EMPLOYEE_ERROR:
      return {
        isLoading: false,
        isSuccess: false,
        error: payload,
        entities,
        entity,
      };

    case SEARCH_EMPLOYEE_COMPLETE:
      return {
        isLoading: false,
        isSuccess: true,
        error: {},
        entities: [],
        entity: payload,
      };

    case SEARCH_EMPLOYEES_COMPLETE:
      return {
        isLoading: false,
        isSuccess: true,
        error: {},
        entities: payload,
        entity,
      };

    case SEARCH_EMPLOYEES_BY_IDS_COMPLETE:
      return {
        isLoading: false,
        isSuccess: true,
        error: {},
        entities: payload,
        entity,
      };

    case UPDATE_EMPLOYEE_COMPLETE:
      updatedEmployees = employeeState.entities.map(employee => {
        if (employee.id === payload.id) {
          return {
            ...employee,
            ...payload.data,
          };
        }
        return employee;
      });

      return {
        isLoading: false,
        isSuccess: true,
        error: {},
        entities: updatedEmployees,
        entity: payload.data,
      };

    case DELETE_EMPLOYEE_COMPLETE:
      employeesToKeep = employeeState.entities.filter(({ id }) => id !== parseInt(payload.id));

      return {
        isLoading: false,
        isSuccess: true,
        error: {},
        entities: employeesToKeep,
        entity,
      };

    default:
      return employeeState;
  }
};
