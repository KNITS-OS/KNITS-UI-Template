import { AnyAction, Dispatch } from "redux";

import { ActionType, IUpdated, typedAction, SerializedError } from "redux/app";

import { Employee } from "types";

import { employeeService } from ".";

const searchEmployeeLoading = () =>
  typedAction(ActionType.SEARCH_EMPLOYEE_LOADING, ActionType.SEARCH_EMPLOYEE_LOADING);
const searchEmployeesLoading = () =>
  typedAction(ActionType.SEARCH_EMPLOYEES_LOADING, ActionType.SEARCH_EMPLOYEES_LOADING);
const updateEmployeeLoading = () =>
  typedAction(ActionType.UPDATE_EMPLOYEE_LOADING, ActionType.UPDATE_EMPLOYEE_LOADING);
const deleteEmployeeLoading = () =>
  typedAction(ActionType.DELETE_EMPLOYEE_LOADING, ActionType.DELETE_EMPLOYEE_LOADING);

const searchEmployeeComplete = (data: Employee) =>
  typedAction(ActionType.SEARCH_EMPLOYEE_COMPLETE, data);
const searchEmployeesComplete = (data: Employee[]) =>
  typedAction(ActionType.SEARCH_EMPLOYEES_COMPLETE, data);
const updateEmployeeComplete = (data: Employee) =>
  typedAction(ActionType.UPDATE_EMPLOYEE_COMPLETE, data);
const deleteEmployeeComplete = (data: number) =>
  typedAction(ActionType.DELETE_EMPLOYEE_COMPLETE, data);

const searchEmployeeError = (err: SerializedError) =>
  typedAction(ActionType.SEARCH_EMPLOYEE_ERROR, err.message);

const searchEmployeesError = (err: SerializedError) =>
  typedAction(ActionType.SEARCH_EMPLOYEES_ERROR, err.message);

const updateEmployeeError = (err: SerializedError) =>
  typedAction(ActionType.UPDATE_EMPLOYEE_ERROR, err.message);

const deleteEmployeeError = (err: SerializedError) =>
  typedAction(ActionType.DELETE_EMPLOYEE_ERROR, err.message);

export type EmployeeActionType =
  | typeof searchEmployeeLoading
  | typeof searchEmployeesLoading
  | typeof updateEmployeeLoading
  | typeof deleteEmployeeLoading
  | typeof searchEmployeeComplete
  | typeof searchEmployeesComplete
  | typeof updateEmployeeComplete
  | typeof deleteEmployeeComplete
  | typeof searchEmployeeError
  | typeof searchEmployeesError
  | typeof updateEmployeeError
  | typeof deleteEmployeeError;

export const searchEmployee = (id: number) => async (dispatch: Dispatch<AnyAction>) => {
  try {
    dispatch(searchEmployeeLoading());

    const { data } = await employeeService.getEmployeeById(id);
    dispatch(searchEmployeeComplete(data));
  } catch (err) {
    dispatch(searchEmployeeError(err as SerializedError));
  }
};

export const searchEmployees = (filters: any) => async (dispatch: Dispatch<AnyAction>) => {
  try {
    const queryParams = new URLSearchParams(filters);

    dispatch(searchEmployeesLoading());

    const { data } = await employeeService.searchEmployees(queryParams);
    dispatch(searchEmployeesComplete(data));
  } catch (err) {
    dispatch(searchEmployeesError(err as SerializedError));
  }
};

export const updateEmployee =
  (updatedEmployee: IUpdated<Employee>) => async (dispatch: Dispatch<AnyAction>) => {
    try {
      dispatch(updateEmployeeLoading());

      const { data } = await employeeService.updateEmployee(updatedEmployee);
      dispatch(updateEmployeeComplete(data));
    } catch (err) {
      dispatch(updateEmployeeError(err as SerializedError));
    }
  };

export const deleteEmployee = (id: number) => async (dispatch: Dispatch<AnyAction>) => {
  try {
    dispatch(deleteEmployeeLoading());

    await employeeService.deleteEmployee(id);
    dispatch(deleteEmployeeComplete(id));
  } catch (err) {
    dispatch(deleteEmployeeError(err as SerializedError));
  }
};
