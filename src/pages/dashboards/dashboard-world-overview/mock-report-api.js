const { countriesData } = require("data");

const randomMembersFromBase = (base, deltaGen) => {
  const delta = Math.round(deltaGen * Math.random());
  return base + delta;
};

export const getNewMembersMapData = () => {
  return getRandomMapData(countriesData, 20, 10);
};

export const getActiveMembersMapData = () => {
  return getRandomMapData(countriesData, 50, 20);
};

export const getSelfResignedMembersMapData = () => {
  return getRandomMapData(countriesData, 0, 5);
};

export const getAutoOffboardedMembersMapData = () => {
  return getRandomMapData(countriesData, 10, 10);
};

const getRandomMapData = (countryListAllIsoData, base, deltaGen) => {
  const generatedData = {};
  countryListAllIsoData.map(country => {
    generatedData[country.code] = randomMembersFromBase(base, deltaGen);
  });
  return generatedData;
};
