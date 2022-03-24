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
} from "redux/app";

import { employeeService } from ".";

export const searchEmployee = id => async dispatch => {
  try {
    dispatch({
      type: SEARCH_EMPLOYEE_LOADING,
      payload: SEARCH_EMPLOYEE_LOADING,
    });

    const { data } = await employeeService.getEmployeeById(id);
    dispatch({
      type: SEARCH_EMPLOYEE_COMPLETE,
      payload: data,
    });
  } catch (err) {
    dispatch({
      type: SEARCH_EMPLOYEE_ERROR,
      payload: err.message,
    });
  }
};

export const searchEmployees = filters => async dispatch => {
  try {
    const queryParams = new URLSearchParams(filters);

    dispatch({
      type: SEARCH_EMPLOYEES_LOADING,
      payload: SEARCH_EMPLOYEES_LOADING,
    });

    const { data } = await employeeService.searchEmployees(queryParams);

    dispatch({
      type: SEARCH_EMPLOYEES_COMPLETE,
      payload: data,
    });
  } catch (err) {
    dispatch({
      type: SEARCH_EMPLOYEES_ERROR,
      payload: err.message,
    });
  }
};

export const updateEmployee = updatedEmployee => async dispatch => {
  try {
    dispatch({
      type: UPDATE_EMPLOYEE_LOADING,
      payload: UPDATE_EMPLOYEE_LOADING,
    });

    const { data } = await employeeService.updateEmployee(updatedEmployee);

    dispatch({
      type: UPDATE_EMPLOYEE_COMPLETE,
      payload: data,
    });
  } catch (err) {
    dispatch({ type: UPDATE_EMPLOYEE_ERROR, payload: err.message });
  }
};

export const deleteEmployee = id => async dispatch => {
  try {
    dispatch({
      type: DELETE_EMPLOYEE_LOADING,
      payload: DELETE_EMPLOYEE_LOADING,
    });

    await employeeService.deleteEmployee(id);

    dispatch({
      type: DELETE_EMPLOYEE_COMPLETE,
      payload: { id },
    });
  } catch (err) {
    dispatch({ type: DELETE_EMPLOYEE_ERROR, payload: err.message });
  }
};
