import { Employee } from "types";

import { httpCommon, EMPLOYEE_ROUTE, HttpResponseType, IUpdated } from "..";

const searchEmployees = (queryParams: URLSearchParams): HttpResponseType =>
  httpCommon.get(`${EMPLOYEE_ROUTE}?${queryParams}`);

const getEmployeeById = (id: number): HttpResponseType => httpCommon.get(`${EMPLOYEE_ROUTE}/${id}`);

const updateEmployee = (updatedEmployee: IUpdated<Employee>): HttpResponseType => {
  const { id, body } = updatedEmployee;
  return httpCommon.put(`${EMPLOYEE_ROUTE}/${id}`, body);
};

const deleteEmployee = (id: number): HttpResponseType =>
  httpCommon.delete(`${EMPLOYEE_ROUTE}/${id}`);

export const employeeService = {
  searchEmployees,
  getEmployeeById,
  updateEmployee,
  deleteEmployee,
};
