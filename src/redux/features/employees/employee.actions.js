import { Dispatch } from "redux";
import { ActionType } from "typesafe-actions";

import { AppActionType, IUpdated, typedAction, SerializedError } from "redux/app";

import { Employee } from "types";

import { employeeService } from ".";

const searchEmployeeLoading = () =>
  typedAction(AppActionType.SEARCH_EMPLOYEE_LOADING, AppActionType.SEARCH_EMPLOYEE_LOADING);
const searchEmployeesLoading = () =>
  typedAction(AppActionType.SEARCH_EMPLOYEES_LOADING, AppActionType.SEARCH_EMPLOYEES_LOADING);
const updateEmployeeLoading = () =>
  typedAction(AppActionType.UPDATE_EMPLOYEE_LOADING, AppActionType.UPDATE_EMPLOYEE_LOADING);
const deleteEmployeeLoading = () =>
  typedAction(AppActionType.DELETE_EMPLOYEE_LOADING, AppActionType.DELETE_EMPLOYEE_LOADING);

const searchEmployeeComplete = (data: Employee) =>
  typedAction(AppActionType.SEARCH_EMPLOYEE_COMPLETE, data);
const searchEmployeesComplete = (data: Employee[]) =>
  typedAction(AppActionType.SEARCH_EMPLOYEES_COMPLETE, data);
const updateEmployeeComplete = (data: Employee) =>
  typedAction(AppActionType.UPDATE_EMPLOYEE_COMPLETE, data);
const deleteEmployeeComplete = (data: number) =>
  typedAction(AppActionType.DELETE_EMPLOYEE_COMPLETE, data);

const searchEmployeeError = (err: SerializedError) =>
  typedAction(AppActionType.SEARCH_EMPLOYEE_ERROR, err);

const searchEmployeesError = (err: SerializedError) =>
  typedAction(AppActionType.SEARCH_EMPLOYEES_ERROR, err);

const updateEmployeeError = (err: SerializedError) =>
  typedAction(AppActionType.UPDATE_EMPLOYEE_ERROR, err);

const deleteEmployeeError = (err: SerializedError) =>
  typedAction(AppActionType.DELETE_EMPLOYEE_ERROR, err);

export type EmployeeActionType = ActionType<
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
  | typeof deleteEmployeeError
>;

export const searchEmployee = (id: number) => async (dispatch: Dispatch<EmployeeActionType>) => {
  try {
    dispatch(searchEmployeeLoading());

    const { data } = await employeeService.getEmployeeById(id);
    dispatch(searchEmployeeComplete(data));
  } catch (err) {
    dispatch(searchEmployeeError(err as SerializedError));
  }
};

export const searchEmployees = (filters: any) => async (dispatch: Dispatch<EmployeeActionType>) => {
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
  (updatedEmployee: IUpdated<Employee>) => async (dispatch: Dispatch<EmployeeActionType>) => {
    try {
      dispatch(updateEmployeeLoading());

      const { data } = await employeeService.updateEmployee(updatedEmployee);
      dispatch(updateEmployeeComplete(data));
    } catch (err) {
      dispatch(updateEmployeeError(err as SerializedError));
    }
  };

export const deleteEmployee = (id: number) => async (dispatch: Dispatch<EmployeeActionType>) => {
  try {
    dispatch(deleteEmployeeLoading());

    await employeeService.deleteEmployee(id);
    dispatch(deleteEmployeeComplete(id));
  } catch (err) {
    dispatch(deleteEmployeeError(err as SerializedError));
  }
};
