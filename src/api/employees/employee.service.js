import { httpCommon, EMPLOYEE_ROUTE } from "..";

const searchEmployees = queryParams => httpCommon.get(`${EMPLOYEE_ROUTE}?${queryParams}`);

const findAllEmployees = () => httpCommon.get(`${EMPLOYEE_ROUTE}`);

const getEmployeeById = id => httpCommon.get(`${EMPLOYEE_ROUTE}/${id}`);

const updateEmployee = updatedEmployee => {
  const { id, body } = updatedEmployee;
  return httpCommon.put(`${EMPLOYEE_ROUTE}/${id}`, body);
};

const deleteEmployee = id => httpCommon.delete(`${EMPLOYEE_ROUTE}/${id}`);

export const employeeService = {
  searchEmployees,
  findAllEmployees,
  getEmployeeById,
  updateEmployee,
  deleteEmployee,
};
