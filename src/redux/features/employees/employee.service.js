import { EMPLOYEE_ROUTE, httpCommon } from "redux/app";

const searchEmployees = queryParams => httpCommon.get(`${EMPLOYEE_ROUTE}?${queryParams}`);

const getEmployeeById = id => httpCommon.get(`${EMPLOYEE_ROUTE}/${id}`);

const updateEmployee = (id, body) => httpCommon.put(`${EMPLOYEE_ROUTE}/${id}`, body);

const deleteEmployee = id => httpCommon.delete(`${EMPLOYEE_ROUTE}/${id}`);

export const employeeService = {
  searchEmployees,
  getEmployeeById,
  updateEmployee,
  deleteEmployee,
};
