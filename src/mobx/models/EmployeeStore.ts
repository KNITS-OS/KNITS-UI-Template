import { flow, types } from "mobx-state-tree";

import { employeeService, IUpdated } from "api";
import { Employee, AdvancedEmployeeQueryFilters, EmployeeQueryFilters } from "types";
import { initialEmployeeState } from "variables/app.consts";

import { EmployeeModel } from "./common";
export interface IUpdateEmployeeState {
  name: keyof typeof initialEmployeeState;
  value: any;
}

export const EmployeeStore = types
  .model({
    entities: types.optional(types.array(EmployeeModel), []),
    entity: types.optional(EmployeeModel, {}),
    isLoading: types.optional(types.boolean, false),
    error: types.optional(types.string, ""),
    isSuccess: types.optional(types.boolean, false),
  })
  .actions(self => {
    const findEmployeeById = flow(function* (id: number) {
      self.isLoading = true;
      try {
        const { data } = yield employeeService.getEmployeeById(id);
        self.entity = data;
        self.isSuccess = true;
        self.isLoading = false;
      } catch (e) {
        self.error = "error";
        self.isLoading = false;
      }
    });

    const searchEmployees = flow(function* (
      filters: EmployeeQueryFilters | AdvancedEmployeeQueryFilters
    ) {
      self.isLoading = true;
      try {
        const queryParams = new URLSearchParams(filters as any);
        const { data } = yield employeeService.searchEmployees(queryParams);

        self.entities = data;
        self.isSuccess = true;
        self.isLoading = false;
      } catch (e) {
        self.error = "error";
        self.isLoading = false;
      }
    });

    const updateEmployee = flow(function* (updatedEmployee: IUpdated<Employee>) {
      self.isLoading = true;
      try {
        const { data } = yield employeeService.updateEmployee(updatedEmployee);

        self.entities = self.entities.map(item => (item.id === data.id ? data : item)) as any;
        self.isSuccess = true;
        self.isLoading = false;
      } catch (e) {
        self.error = "error";
        self.isLoading = false;
      }
    });

    const deleteEmployee = flow(function* (id: number) {
      self.isLoading = true;
      try {
        yield employeeService.deleteEmployee(id);

        self.entities = self.entities.filter(item => item.id !== id) as any;
        self.isSuccess = true;
        self.isLoading = false;
      } catch (e) {
        self.error = "error";
        self.isLoading = false;
      }
    });

    const updateEmployeeState = ({ name, value }: IUpdateEmployeeState) => {
      self.entity = { ...self.entity, [name]: value };
    };

    return {
      findEmployeeById,
      searchEmployees,
      updateEmployee,
      deleteEmployee,
      updateEmployeeState,
    };
  });
