import { EMPLOYEE_ROUTE, httpCommon } from "redux/app";

const searchEmployees = queryParams => {
  // otherwise json-server or something else changes params to unreadable format
  // members=id_ne%3D1%26id_ne%3D2%26id_ne%3D3%26id_ne%3D4%26
  const members = queryParams.get("members");
  queryParams.set("members", "");

  return httpCommon.get(`${EMPLOYEE_ROUTE}?${members}&${queryParams}`);
};

const getEmployeeById = id => httpCommon.get(`${EMPLOYEE_ROUTE}/${id}`);

const updateEmployee = (id, body) => httpCommon.put(`${EMPLOYEE_ROUTE}/${id}`, body);

const deleteEmployee = id => httpCommon.delete(`${EMPLOYEE_ROUTE}/${id}`);

export const employeeService = {
  searchEmployees,
  getEmployeeById,
  updateEmployee,
  deleteEmployee,
};
