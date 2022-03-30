import { makeAutoObservable, runInAction } from "mobx";

import { employeeService, IUpdated, SerializedError } from "api";
import { AdvancedEmployeeQueryFilters, Employee, EmployeeQueryFilters } from "types";
import { initialEmployeeState } from "variables/app.consts";

export interface IUpdateEmployeeState {
  name: keyof typeof initialEmployeeState;
  value: any;
}
export class EmployeeStore {
  entities: Employee[] = [];
  entity: Employee = initialEmployeeState;
  isLoading = false;
  isSuccess = false;
  error: SerializedError = {};

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
  }

  async findEmployeeById(id: number) {
    this.entity = initialEmployeeState;
    this.isLoading = true;
    try {
      const { data } = await employeeService.getEmployeeById(id);

      runInAction(() => {
        this.entity = data;
        this.isSuccess = true;
        this.isLoading = false;
      });
    } catch (e) {
      runInAction(() => {
        this.error = e as SerializedError;
        this.isLoading = false;
      });
    }
  }

  async searchEmployees(filters: EmployeeQueryFilters | AdvancedEmployeeQueryFilters) {
    this.isLoading = true;
    try {
      const queryParams = new URLSearchParams(filters as any);
      const { data } = await employeeService.searchEmployees(queryParams);
      runInAction(() => {
        this.entities = data;
        this.isSuccess = true;
        this.isLoading = false;
      });
    } catch (e) {
      runInAction(() => {
        this.error = e as SerializedError;
        this.isLoading = false;
      });
    }
  }

  async updateEmployee(updatedEmployee: IUpdated<Employee>) {
    this.isLoading = true;
    try {
      const { data } = await employeeService.updateEmployee(updatedEmployee);
      runInAction(() => {
        this.entities = this.entities.map(item => (item.id === data.id ? data : item));
        this.isSuccess = true;
        this.isLoading = false;
      });
    } catch (e) {
      runInAction(() => {
        this.error = e as SerializedError;
        this.isLoading = false;
      });
    }
  }

  async deleteEmployee(id: number) {
    this.isLoading = true;
    try {
      await employeeService.deleteEmployee(id);
      runInAction(() => {
        this.entities = this.entities.filter(item => item.id !== id);
        this.isSuccess = true;
        this.isLoading = false;
      });
    } catch (e) {
      runInAction(() => {
        this.error = e as SerializedError;
        this.isLoading = false;
      });
    }
  }

  updateEmployeeState({ name, value }: IUpdateEmployeeState) {
    this.entity = { ...this.entity, [name]: value };
  }
}
