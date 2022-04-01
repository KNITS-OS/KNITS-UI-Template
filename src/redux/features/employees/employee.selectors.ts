import { createSelector as createOrmSelector } from "redux-orm";
import { createSelector as createReselectSelector } from "reselect";

import { orm } from "redux/app";

import { Employee } from "types";
import { SELECT_ALL } from "variables/app.consts";

export const selectEmployeeState = createOrmSelector(orm, session => session.Employee.all());

export const selectAllEmployeeData = createReselectSelector(
  [selectEmployeeState],
  employeeState => employeeState.all().toModelArray() as Employee[]
);

export const selectEmployeeById = (id: number) =>
  createReselectSelector(
    [selectAllEmployeeData], //array of input selectors
    employees => employees.find(employee => employee.id === id) //arg
  );

export const selectEmployeesAsList = () =>
  createReselectSelector([selectAllEmployeeData], employees =>
    employees.map(employee => ({ value: employee.id, label: employee.internationalName }))
  );

export const selectAllEmployeeDataAsSelectOptions = createOrmSelector(orm, session => {
  const employeeOptions = session.Employee.all()
    .toModelArray()
    .map(employee => {
      return { value: `${employee.id}`, label: employee.name };
    });
  return [SELECT_ALL, ...employeeOptions];
});
