import { AppActionType, StateType } from "redux/app";

import { Employee } from "types";

import { EmployeeActionType } from "./employee.actions";

const initialState: StateType<Employee> = {
  entities: [],
  entity: null,
  isLoading: false,
  isSuccess: false,
  error: {},
};

export const employeeReducer = (
  employeeState = initialState,
  action: EmployeeActionType
): StateType<Employee> => {
  const { type, payload } = action;
  const { entities, entity } = employeeState;

  let updatedEmployees = [];
  let employeesToKeep = [];

  switch (type) {
    case AppActionType.SEARCH_EMPLOYEE_LOADING:
    case AppActionType.SEARCH_EMPLOYEES_LOADING:
    case AppActionType.UPDATE_EMPLOYEE_LOADING:
    case AppActionType.DELETE_EMPLOYEE_LOADING:
      return {
        isLoading: true,
        isSuccess: false,
        error: {},
        entities,
        entity,
      };

    case AppActionType.SEARCH_EMPLOYEE_ERROR:
    case AppActionType.SEARCH_EMPLOYEES_ERROR:
    case AppActionType.UPDATE_EMPLOYEE_ERROR:
    case AppActionType.DELETE_EMPLOYEE_ERROR:
      return {
        isLoading: false,
        isSuccess: false,
        error: payload,
        entities,
        entity,
      };

    case AppActionType.SEARCH_EMPLOYEE_COMPLETE:
      return {
        isLoading: false,
        isSuccess: true,
        error: {},
        entities,
        entity: payload,
      };

    case AppActionType.SEARCH_EMPLOYEES_COMPLETE:
      return {
        isLoading: false,
        isSuccess: true,
        error: {},
        entities: payload,
        entity,
      };

    case AppActionType.UPDATE_EMPLOYEE_COMPLETE:
      updatedEmployees = employeeState.entities.map(employee => {
        if (employee.id === payload.id) {
          return {
            ...employee,
            ...payload,
          };
        }
        return employee;
      });

      return {
        isLoading: false,
        isSuccess: true,
        error: {},
        entities: updatedEmployees,
        entity: payload,
      };

    case AppActionType.DELETE_EMPLOYEE_COMPLETE:
      employeesToKeep = employeeState.entities.filter(({ id }) => id !== payload);

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
