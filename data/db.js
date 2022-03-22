/* eslint-disable @typescript-eslint/no-var-requires */
const documentsData = require("./documents");
const employeesData = require("./employees");

module.exports = () => ({
  employee: employeesData,
  document: documentsData,
});
