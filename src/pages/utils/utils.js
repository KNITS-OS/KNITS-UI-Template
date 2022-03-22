import { employeeService } from "api";
import { businessUnitsData, countriesData, groupsData } from "data";
import { SELECT_ALL_IDS, SELECT_ALL } from "variables/app.consts";

export const toFileArray = filelist => {
  if (!filelist || filelist.length === 0) {
    return [];
  }
  const files = [];
  for (let i = 0; i < filelist.length; i++) {
    const fileOrNull = filelist.item(i);
    if (fileOrNull) {
      files.push(fileOrNull);
    }
  }
  return files;
};

export const formDataCsvToArray = commaSeparatedValues => {
  if (!commaSeparatedValues) {
    return [];
  }
  return commaSeparatedValues.split(",");
};

export const toFormData = object => {
  const formData = new FormData();

  for (const key in object) {
    // eslint-disable-next-line no-prototype-builtins
    if (!object.hasOwnProperty(key) || typeof object[key] == "function") continue;
    formData.append(key, object[key]);
  }
  return formData;
};

export const toBoolean = value => {
  if (value == null || value == undefined) {
    return false;
  }
  return [true, "true", "True", "TRUE", "1", 1].includes(value);
};

export const selectAllBusinessUnitsDataAsSelectOptions = () => {
  const businessUnitOptions = businessUnitsData.map(businessUnit => {
    return { value: `${businessUnit.id}`, label: businessUnit.name };
  });
  return [SELECT_ALL, ...businessUnitOptions];
};

export const selectAllCountriesDataAsSelectOptions = () => {
  const countryOptions = countriesData.map(country => {
    return { value: `${country.code3}`, label: country.name };
  });
  return [SELECT_ALL, ...countryOptions];
};

export const selectLoggedUserDefaultCountryAsSelection = userCountry => {
  const countriesAsSelections = selectAllCountriesDataAsSelectOptions();
  const countrySelectOption = countriesAsSelections.find(
    countryOption => countryOption.value === userCountry
  );
  return countrySelectOption;
};

export const selectCountryByIsoCodeAsSelectOption = code => {
  const country = countriesData.find(country => country.code3 === code);

  if (country) {
    return [{ value: `${country.code3}`, label: country.name }];
  }
  return [];
};

export const selectGroupsByIdsAsSelectValues = ids => {
  const groups = groupsData.filter(group => ids.includes(group.id));
  const groupsOptions = groups.map(group => {
    return { value: `${group.id}`, label: group.name };
  });
  return [...groupsOptions];
};

export const selectAllGroupsDataAsSelectOptions = () => {
  const groupsOptions = groupsData.map(group => {
    return { value: `${group.id}`, label: group.name };
  });
  return [SELECT_ALL_IDS(groupsData.map(group => group.id)), ...groupsOptions];
};

export const selectGroupMembers = async groupId => {
  const group = groupsData.find(group => group.id === groupId);

  const { data: allEmployees } = await employeeService.findAllEmployees();

  const groupMembers = Object.keys(allEmployees)
    .map(key => allEmployees[parseInt(key)])
    .filter(employee => group?.members.includes(employee.id));

  return groupMembers;
};
