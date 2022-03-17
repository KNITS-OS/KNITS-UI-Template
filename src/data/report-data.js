const countriesData = require("./countries");

const memberTurnoverReport = [
  { month: "January", onboarded: 46, offboarded: 15 },
  { month: "February", onboarded: 28, offboarded: 12 },
  { month: "March", onboarded: 38, offboarded: 10 },
  { month: "April", onboarded: 25, offboarded: 11 },
  { month: "May", onboarded: 26, offboarded: 17 },
  { month: "June", onboarded: 36, offboarded: 12 },
  { month: "July", onboarded: 33, offboarded: 15 },
];

const workforceReport = [
  { label: "January", value: 199 },
  { label: "February", value: 202 },
  { label: "March", value: 185 },
  { label: "April", value: 189 },
  { label: "May", value: 206 },
  { label: "June", value: 217 },
  { label: "July", value: 234 },
];

const distributionByGenderReport = [
  { label: "Male", value: 320 },
  { label: "Female", value: 306 },
];

const distributionByRoleReport = [
  { label: "Regional Transformation Manager", value: 17 },
  { label: "Country Transformation Manager", value: 28 },
  { label: "Advocate", value: 60 },
  { label: "Trainer", value: 75 },
  { label: "Sponsor", value: 45 },
];

const distributionByBusinessUnitReport = [
  { label: "Road Logistics", value: 44 },
  { label: "Air Logistics", value: 26 },
  { label: "Sea Logistics", value: 47 },
  { label: "Sales", value: 23 },
  { label: "Contract Logistics", value: 18 },
  { label: "Human Resources", value: 42 },
  { label: "QSHE", value: 31 },
  { label: "Marketing", value: 25 },
  { label: "Finance", value: 12 },
  { label: "Legal", value: 19 },
  { label: "IT", value: 43 },
  { label: "Administrative", value: 29 },
  { label: "National Management", value: 14 },
];

const distributionBySeniorityReport = [
  { label: "Up to 1", value: 45 },
  { label: "1-2", value: 58 },
  { label: "2-3", value: 33 },
  { label: "3-5", value: 81 },
  { label: "5+", value: 28 },
];

const distributionByAgeReport = [
  { label: "Up to 20", value: 26 },
  { label: "21-25", value: 89 },
  { label: "26-30", value: 56 },
  { label: "31-35", value: 38 },
  { label: "36-40", value: 25 },
  { label: "41+", value: 5 },
];

const randomMembersFromBase = (base, deltaGen) => {
  const delta = Math.round(deltaGen * Math.random());
  return base + delta;
};

const newMembersMapData = () => {
  return getRandomMapData(countriesData, 20, 10);
};

const activeMembersMapData = () => {
  return getRandomMapData(countriesData, 50, 20);
};

const selfResignedMembersMapData = () => {
  return getRandomMapData(countriesData, 0, 5);
};

const autoOffboardedMembersMapData = () => {
  return getRandomMapData(countriesData, 10, 10);
};

const getRandomMapData = (countryListAllIsoData, base, deltaGen) => {
  const generatedData = {};
  countryListAllIsoData.map(country => {
    generatedData[country.code] = randomMembersFromBase(base, deltaGen);
  });
  return generatedData;
};

// const getRandomMapData = (countryListAllIsoData, base, deltaGen) => {
//   const generatedData = [];
//   countryListAllIsoData.map(country => {
//     generatedData.push({
//       [country.code]: randomMembersFromBase(base, deltaGen),
//     });
//   });
//   return generatedData;
// };

module.exports = {
  memberTurnoverReport,
  workforceReport,
  distributionByGenderReport,
  distributionByRoleReport,
  distributionByBusinessUnitReport,
  distributionBySeniorityReport,
  distributionByAgeReport,
  newMembersMapData,
  activeMembersMapData,
  autoOffboardedMembersMapData,
  selfResignedMembersMapData,
};
