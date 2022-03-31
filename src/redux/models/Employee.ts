import { attr, FieldSpecMap, many, Model, TableOpts } from "redux-orm";

import { Employee as EmployeeType } from "types";

import { AppActionType } from "../app";
import { EmployeeActionType } from "../features";

// @ts-ignore
export class Employee extends Model<typeof Employee, EmployeeType> {
  static modelName = "Employee";

  static fields: FieldSpecMap = {
    id: attr(),
    pdmId: attr(),
    firstName: attr(),
    lastName: attr(),
    internationalName: attr(),
    title: attr(),
    email: attr(),
    businessUnit: attr(),
    managementGroup: attr(),
    companyCode: attr(),
    costCenter: attr(),
    birthDate: attr(),
    companyPhone: attr(),
    companyMobilePhone: attr(),
    gender: attr(),
    startDate: attr(),
    endDate: attr(),
    dateOfLeave: attr(),
    nationality: attr(),
    office: attr(),
    // {
    //   countryiso3: attr(),
    //   city: attr(),
    //   street: attr(),
    //   country: attr(),
    //   postalCode: attr(),
    // },
    onboardingDate: attr(),
    offboardingDate: attr(),
    groups: many({ to: "Group", relatedName: "employees" }),
  };

  static options: (() => TableOpts) | TableOpts = {
    idAttribute: "id",
  };

  static reducer(action: EmployeeActionType, employee: typeof Employee) {
    console.log("action 1234", action);

    switch (action.type) {
      case AppActionType.DELETE_EMPLOYEE_COMPLETE:
        employee.filter(employee => employee.id === action.payload).delete();
        break;
      default:
        break;
    }
  }
}
