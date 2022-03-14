import { AuthorizationPolicies } from "variables/rbac.config";

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

export const toRoleEnum = role => {
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

const getPermissionForRole = role => {
  return AuthorizationPolicies[role];
};

export const checkAuthorized = (role, required) => {
  const permissions = getPermissionForRole(role);
  const foundPermission = permissions.find(permission => permission === required);
  return foundPermission ? true : false;
};

export const toBoolean = value => {
  if (value == null || value == undefined) {
    return false;
  }
  return [true, "true", "True", "TRUE", "1", 1].includes(value);
};
