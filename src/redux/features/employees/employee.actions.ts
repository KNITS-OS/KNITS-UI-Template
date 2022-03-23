import { AnyAction, Dispatch } from "redux";

import {
  SEARCH_EMPLOYEE_LOADING,
  SEARCH_EMPLOYEE_ERROR,
  SEARCH_EMPLOYEE_COMPLETE,
  DELETE_EMPLOYEE_COMPLETE,
  DELETE_EMPLOYEE_ERROR,
  DELETE_EMPLOYEE_LOADING,
  SEARCH_EMPLOYEES_COMPLETE,
  SEARCH_EMPLOYEES_ERROR,
  SEARCH_EMPLOYEES_LOADING,
  UPDATE_EMPLOYEE_COMPLETE,
  UPDATE_EMPLOYEE_ERROR,
  UPDATE_EMPLOYEE_LOADING,
  IUpdated,
  typedAction,
  SerializedError,
} from "redux/app";

import { Employee } from "types";

import { employeeService } from ".";

const searchEmployeeLoading = () => typedAction(SEARCH_EMPLOYEE_LOADING, SEARCH_EMPLOYEE_LOADING);
const searchEmployeesLoading = () =>
  typedAction(SEARCH_EMPLOYEES_LOADING, SEARCH_EMPLOYEES_LOADING);
const updateEmployeeLoading = () => typedAction(UPDATE_EMPLOYEE_LOADING, UPDATE_EMPLOYEE_LOADING);
const deleteEmployeeLoading = () => typedAction(DELETE_EMPLOYEE_LOADING, DELETE_EMPLOYEE_LOADING);

const searchEmployeeComplete = (data: Employee) => typedAction(SEARCH_EMPLOYEE_COMPLETE, data);
const searchEmployeesComplete = (data: Employee) => typedAction(SEARCH_EMPLOYEES_COMPLETE, data);
const updateEmployeeComplete = (data: Employee) => typedAction(UPDATE_EMPLOYEE_COMPLETE, data);
const deleteEmployeeComplete = (data: number) => typedAction(DELETE_EMPLOYEE_COMPLETE, data);

const searchEmployeeError = (err: SerializedError) =>
  typedAction(SEARCH_EMPLOYEE_ERROR, err.message);

const searchEmployeesError = (err: SerializedError) =>
  typedAction(SEARCH_EMPLOYEES_ERROR, err.message);

const updateEmployeeError = (err: SerializedError) =>
  typedAction(UPDATE_EMPLOYEE_ERROR, err.message);

const deleteEmployeeError = (err: SerializedError) =>
  typedAction(DELETE_EMPLOYEE_ERROR, err.message);

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
