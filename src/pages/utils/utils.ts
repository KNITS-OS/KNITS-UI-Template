import { businessUnitsData, countriesData, employeesData, groupsData } from "data";
import { SelectOption } from "types";
import { SELECT_ALL } from "variables/app.consts";

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
