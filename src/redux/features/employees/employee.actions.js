import { AppActionType, typedAction } from "redux/app";

import { employeeService } from ".";

const searchEmployeeLoading = () =>
  typedAction(AppActionType.SEARCH_EMPLOYEE_LOADING, AppActionType.SEARCH_EMPLOYEE_LOADING);
const searchEmployeesLoading = () =>
  typedAction(AppActionType.SEARCH_EMPLOYEES_LOADING, AppActionType.SEARCH_EMPLOYEES_LOADING);
const updateEmployeeLoading = () =>
  typedAction(AppActionType.UPDATE_EMPLOYEE_LOADING, AppActionType.UPDATE_EMPLOYEE_LOADING);
const deleteEmployeeLoading = () =>
  typedAction(AppActionType.DELETE_EMPLOYEE_LOADING, AppActionType.DELETE_EMPLOYEE_LOADING);

const searchEmployeeComplete = data => typedAction(AppActionType.SEARCH_EMPLOYEE_COMPLETE, data);
const searchEmployeesComplete = data => typedAction(AppActionType.SEARCH_EMPLOYEES_COMPLETE, data);
const updateEmployeeComplete = data => typedAction(AppActionType.UPDATE_EMPLOYEE_COMPLETE, data);
const deleteEmployeeComplete = data => typedAction(AppActionType.DELETE_EMPLOYEE_COMPLETE, data);

const searchEmployeeError = err => typedAction(AppActionType.SEARCH_EMPLOYEE_ERROR, err);

const searchEmployeesError = err => typedAction(AppActionType.SEARCH_EMPLOYEES_ERROR, err);

const updateEmployeeError = err => typedAction(AppActionType.UPDATE_EMPLOYEE_ERROR, err);

const deleteEmployeeError = err => typedAction(AppActionType.DELETE_EMPLOYEE_ERROR, err);

export const searchEmployee = id => async dispatch => {
  try {
    dispatch(searchEmployeeLoading());

    const { data } = await employeeService.getEmployeeById(id);
    dispatch(searchEmployeeComplete(data));
  } catch (err) {
    dispatch(searchEmployeeError(err));
  }
};

export const searchEmployees = filters => async dispatch => {
  try {
    const queryParams = new URLSearchParams(filters);

    dispatch(searchEmployeesLoading());

    const { data } = await employeeService.searchEmployees(queryParams);
    dispatch(searchEmployeesComplete(data));
  } catch (err) {
    dispatch(searchEmployeesError(err));
  }
};

export const updateEmployee = updatedEmployee => async dispatch => {
  try {
    dispatch(updateEmployeeLoading());

    const { data } = await employeeService.updateEmployee(updatedEmployee);
    dispatch(updateEmployeeComplete(data));
  } catch (err) {
    dispatch(updateEmployeeError(err));
  }
};

export const deleteEmployee = id => async dispatch => {
  try {
    dispatch(deleteEmployeeLoading());

    await employeeService.deleteEmployee(id);
    dispatch(deleteEmployeeComplete(id));
  } catch (err) {
    dispatch(deleteEmployeeError(err));
  }
};
