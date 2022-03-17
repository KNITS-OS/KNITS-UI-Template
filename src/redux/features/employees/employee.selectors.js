import { createSelector } from "reselect";

import { SELECT_ALL } from "variables/app.consts";

export const selectEmployeesState = rootState => rootState.employee;

export const selectAllEmployeesData = createSelector(
  [selectEmployeesState],
  employeeState => employeeState.entities
);

export const selectEmployeeById = id =>
  createSelector([selectAllEmployeesData], employeesData =>
    employeesData.find(employee => employee.id === parseInt(id))
  );

export const selectEmployeesAsList = createSelector([selectAllEmployeesData], employeesData =>
  employeesData.map(employee => ({ value: employee.id, label: employee.internationalName }))
);

export const selectAllEmployeeDataAsSelectOptions = createSelector(
  [selectAllEmployeesData],
  employees => {
    const employeesOptions = employees.map(employee => {
      return { value: `${employee.id}`, label: `${employee.firstName} ${employee.lastName}` };
    });
    return [SELECT_ALL, ...employeesOptions];
  }
);
