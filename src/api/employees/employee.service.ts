import { HttpResponseType, httpCommon, EMPLOYEE_ROUTE, IUpdated } from "api";
import { Employee } from "types";

const searchEmployees = (queryParams: URLSearchParams): HttpResponseType<Employee[]> => {
  // otherwise json-server or something else changes params to unreadable format
  // members=id_ne%3D1%26id_ne%3D2%26id_ne%3D3%26id_ne%3D4%26
  const members = queryParams.get("members");
  queryParams.set("members", "");

  return httpCommon.get(`${EMPLOYEE_ROUTE}?${members}&${queryParams}`);
};

const findAllEmployees = (): HttpResponseType<Employee[]> => httpCommon.get(`${EMPLOYEE_ROUTE}`);

const getEmployeeById = (id: number): HttpResponseType<Employee> =>
  httpCommon.get(`${EMPLOYEE_ROUTE}/${id}`);

const searchEmployeesByIds = (employeeIds: number[]) => {
  const searchString = employeeIds.map(id => `id=${id}`).join("&");
  return httpCommon.get(`${EMPLOYEE_ROUTE}?${searchString}`);
};

const updateEmployee = (updatedEmployee: IUpdated<Employee>): HttpResponseType<Employee> => {
  const { id, body } = updatedEmployee;
  return httpCommon.put(`${EMPLOYEE_ROUTE}/${id}`, body);
};

const deleteEmployee = (id: number): HttpResponseType<Employee> =>
  httpCommon.delete(`${EMPLOYEE_ROUTE}/${id}`);

export const employeeService = {
  searchEmployees,
  findAllEmployees,
  getEmployeeById,
  searchEmployeesByIds,
  updateEmployee,
  deleteEmployee,
};
