import { businessUnitsData, countriesData, employeesData, careRolesData, groupsData } from "data";
import { Role, Permission, SelectOption } from "types";
import { SELECT_ALL } from "variables/app.consts";
import { AuthorizationPolicies } from "variables/rbac.config";

export const toFileArray = (filelist: FileList | null): File[] => {
  if (!filelist || filelist.length === 0) {
    return [];
  }
  const files: File[] = [];
  for (let i = 0; i < filelist.length; i++) {
    const fileOrNull = filelist.item(i);
    if (fileOrNull) {
      files.push(fileOrNull);
    }
  }
  return files;
};

export const formDataCsvToArray = (commaSeparatedValues: string): string[] => {
  if (!commaSeparatedValues) {
    return [];
  }
  return commaSeparatedValues.split(",");
};

export const toFormData = (object: any): FormData => {
  const formData = new FormData();

  for (const key in object) {
    // eslint-disable-next-line no-prototype-builtins
    if (!object.hasOwnProperty(key) || typeof object[key] == "function") continue;
    formData.append(key, object[key]);
  }
  return formData;
};

export const toRoleEnum = (role: string): Role => {
  switch (role) {
    case "RegionalTransformationManager":
      return Role.RegionalManager;
    case "CountryTransformationManager":
      return Role.CountryManager;
    case "Advocate":
      return Role.Advocate;
    case "Trainer":
      return Role.Trainer;
    case "Sponsor":
      return Role.Sponsor;

    default:
      throw Error("Illegal value for tole. Found: " + role);
  }
};

const getPermissionForRole = (role: Role): Permission[] => {
  return AuthorizationPolicies[role];
};

export const checkAuthorized = (role: Role, required: Permission): boolean => {
  const permissions = getPermissionForRole(role);
  const foundPermission = permissions.find(permission => permission === required);
  return foundPermission ? true : false;
};

export const toBoolean = (value: string | number | boolean | null | undefined): boolean => {
  if (value == null || value == undefined) {
    return false;
  }
  return [true, "true", "True", "TRUE", "1", 1].includes(value);
};

export const selectAllBusinessUnitsDataAsSelectOptions = (): SelectOption[] => {
  const businessUnitOptions = businessUnitsData.map(businessUnit => {
    return { value: `${businessUnit.id}`, label: businessUnit.name };
  });
  return [SELECT_ALL, ...businessUnitOptions];
};

export const selectAllCountriesDataAsSelectOptions = (): SelectOption[] => {
  const countryOptions = countriesData.map(country => {
    return { value: `${country.code3}`, label: country.name };
  });
  return [SELECT_ALL, ...countryOptions];
};

export const selectLoggedUserDefaultCountryAsSelection = (userCountry: string): SelectOption => {
  const countriesAsSelections = selectAllCountriesDataAsSelectOptions();
  const countrySelectOption = countriesAsSelections.find(
    countryOption => countryOption.value === userCountry
  );
  return countrySelectOption as SelectOption;
};

export const selectCountryByIsoCodeAsSelectOption = (code: string): SelectOption[] => {
  const country = countriesData.find(country => country.code3 === code);

  if (country) {
    return [{ value: `${country.code3}`, label: country.name }];
  }
  return [];
};

export const selectAllEmployeeDataAsSelectOptions = (): SelectOption[] => {
  const employeesOptions = employeesData.map(employee => {
    return { value: `${employee.id}`, label: `${employee.firstName} ${employee.lastName}` };
  });
  return [SELECT_ALL, ...employeesOptions];
};

export const selectRoleByIdAsSelectOption = (id: number): SelectOption[] => {
  const role = careRolesData.find(role => role.id === id);

  if (role) {
    return [{ value: `${role.id}`, label: role.name }];
  }
  return [];
};

export const selectAllRolesDataAsSelectOptions = (): SelectOption[] => {
  const rolesOptions = careRolesData.map(role => {
    return { value: `${role.id}`, label: role.name };
  });
  return [SELECT_ALL, ...rolesOptions];
};

export const selectGroupsByIdsAsSelectValues = (ids: number[]): SelectOption[] => {
  const groups = groupsData.filter(group => ids.includes(group.id));
  const groupsOptions = groups.map(group => {
    return { value: `${group.id}`, label: group.name };
  });
  return [...groupsOptions];
};

export const selectAllGroupsDataAsSelectOptions = (): SelectOption[] => {
  const groupsOptions = groupsData.map(group => {
    return { value: `${group.id}`, label: group.name };
  });
  return [SELECT_ALL, ...groupsOptions];
};

export const selectGroupMembers = (groupId: number) => {
  const group = groupsData.find(group => group.id === groupId);
  const employees = employeesData;

  return Object.keys(employees)
    .map(key => employees[parseInt(key)])
    .filter(employee => group?.members.includes(employee.id));
};
