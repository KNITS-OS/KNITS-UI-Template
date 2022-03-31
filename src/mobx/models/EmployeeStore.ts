import { flow, types } from "mobx-state-tree";

import { employeeService, IUpdated } from "api";
import { Employee, EmployeeQueryFilters, AdvancedEmployeeQueryFilters } from "types";

import { IUpdateEmployeeState } from "../stores";

import { EmployeeModel } from "./common";

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

    const searchMemberlessEmployees = flow(function* (filters: EmployeeQueryFilters) {
      self.isLoading = true;
      console.log("self 1234", self);
      try {
        console.log("filters 1234", filters);

        const { data } = yield employeeService.searchMemberlessEmployees(filters as any);
        console.log("data 1234", data);

        self.entities = data;
        self.isSuccess = true;
        self.isLoading = false;
      } catch (e) {
        self.error = "error";
        self.isLoading = false;
      }
    });
    const searchEmployees = flow(function* (filters: AdvancedEmployeeQueryFilters) {
      self.isLoading = true;
      try {
        const { data } = yield employeeService.searchEmployees(filters as any);

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
      searchMemberlessEmployees,
      updateEmployee,
      deleteEmployee,
      updateEmployeeState,
    };
  });
