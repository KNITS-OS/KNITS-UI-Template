import { types } from "mobx-state-tree";

export const SerializedErrorModel = types.model({
  name: types.optional(types.string, ""),
  message: types.optional(types.string, ""),
  stack: types.optional(types.string, ""),
  code: types.optional(types.string, ""),
});

export const OfficeModel = types.model({
  countryiso3: types.optional(types.string, ""),
  city: types.optional(types.string, ""),
  street: types.optional(types.string, ""),
  country: types.optional(types.string, ""),
  postalCode: types.optional(types.string, ""),
});

export const GroupModel = types.model({
  id: types.optional(types.number, -1),
  name: types.optional(types.string, ""),
  active: types.optional(types.boolean, true),
  members: types.optional(types.array(types.number), []),
  description: types.optional(types.string, ""),
});

export const EmployeeModel = types.model({
  id: types.optional(types.number, -1),
  pdmId: types.optional(types.number, -1),
  firstName: types.optional(types.string, ""),
  lastName: types.optional(types.string, ""),
  internationalName: types.optional(types.string, ""),
  title: types.optional(types.string, ""),
  email: types.optional(types.string, ""),
  businessUnit: types.optional(types.string, ""),
  managementGroup: types.optional(types.string, ""),
  companyCode: types.optional(types.string, ""),
  costCenter: types.optional(types.string, ""),
  birthDate: types.optional(types.string, ""),
  companyPhone: types.optional(types.string, ""),
  companyMobilePhone: types.optional(types.string, ""),
  gender: types.optional(types.string, ""),
  startDate: types.optional(types.string, ""),
  endDate: types.maybeNull(types.string),
  dateOfLeave: types.maybeNull(types.string),
  nationality: types.optional(types.string, ""),
  office: types.optional(OfficeModel, {
    city: "",
    country: "",
    countryiso3: "",
    postalCode: "",
    street: "",
  }),
  onboardingDate: types.optional(types.string, ""),
  offboardingDate: types.optional(types.string, ""),
  groups: types.optional(types.array(types.number), []),
});
