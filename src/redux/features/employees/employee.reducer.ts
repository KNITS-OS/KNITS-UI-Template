import { ActionType, StateType } from "redux/app";

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
    case ActionType.SEARCH_EMPLOYEE_LOADING:
    case ActionType.SEARCH_EMPLOYEES_LOADING:
    case ActionType.UPDATE_EMPLOYEE_LOADING:
    case ActionType.DELETE_EMPLOYEE_LOADING:
      return {
        isLoading: true,
        isSuccess: false,
        error: {},
        entities,
        entity,
      };

    case ActionType.SEARCH_EMPLOYEE_ERROR:
    case ActionType.SEARCH_EMPLOYEES_ERROR:
    case ActionType.UPDATE_EMPLOYEE_ERROR:
    case ActionType.DELETE_EMPLOYEE_ERROR:
      return {
        isLoading: false,
        isSuccess: false,
        error: payload,
        entities,
        entity,
      };

    case ActionType.SEARCH_EMPLOYEE_COMPLETE:
      return {
        isLoading: false,
        isSuccess: true,
        error: {},
        entities,
        entity: payload,
      };

    case ActionType.SEARCH_EMPLOYEES_COMPLETE:
      return {
        isLoading: false,
        isSuccess: true,
        error: {},
        entities: payload,
        entity,
      };

    case ActionType.UPDATE_EMPLOYEE_COMPLETE:
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

    case ActionType.DELETE_EMPLOYEE_COMPLETE:
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
