import { observable, runInAction } from "mobx";

import { employeeService } from "api";
import { EmployeeQueryFilters, SerializedError } from "types";

export const EmployeeStore = observable({
  employees: [],
  employee: null,
  isLoading: false,
  isSuccess: false,
  error: {},

  // *findEmployeeById(id: number) {
  //   const { data } = yield employeeService.getEmployeeById(id);
  //   this.employee = data;
  // },

  // https://stackoverflow.com/questions/64770762/mobx-since-strict-mode-is-enabled-changing-observed-observable-values-withou
  async findEmployeeById(id: number) {
    this.employee = null;
    this.isLoading = true;
    try {
      const { data } = await employeeService.getEmployeeById(id);

      runInAction(() => {
        this.employee = data;
        this.isSuccess = true;
        this.isLoading = false;
      });
    } catch (e) {
      runInAction(() => {
        this.error = e as SerializedError;
        this.isLoading = false;
      });
    }
  },

  async searchEmployees(filters: EmployeeQueryFilters) {
    this.employees = [];
    this.isLoading = true;
    try {
      const queryParams = new URLSearchParams(filters as any);
      const { data } = await employeeService.searchEmployees(queryParams);
      runInAction(() => {
        this.employees = data;
        this.isSuccess = true;
        this.isLoading = false;
      });
    } catch (e) {
      runInAction(() => {
        this.error = e as SerializedError;
        this.isLoading = false;
      });
    }
  },
  async deleteEmployee(id: number) {
    this.employees = [];
    this.isLoading = true;
    try {
      const { data } = await employeeService.deleteEmployee(id);
      runInAction(() => {
        this.employees = data;
        this.isSuccess = true;
        this.isLoading = false;
      });
    } catch (e) {
      runInAction(() => {
        this.error = e as SerializedError;
        this.isLoading = false;
      });
    }
  },
});
