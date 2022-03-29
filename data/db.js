/* eslint-disable @typescript-eslint/no-var-requires */
const businessUnitsData = require("./business-units");
const countriesData = require("./countries");
const documentsData = require("./documents");
const employeesData = require("./employees");
const groupsData = require("./groups");

module.exports = () => ({
  employee: employeesData,
  document: documentsData,
  country: countriesData,
  "business-unit": businessUnitsData,
  group: groupsData,
});
