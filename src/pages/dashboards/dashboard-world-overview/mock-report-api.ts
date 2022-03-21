import { countriesData } from "data";
import { Country } from "types";

declare type Values = {
  [key: string]: string | number;
};

const randomMembersFromBase = (base: number, deltaGen: number) => {
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

const getRandomMapData = (
  countryListAllIsoData: Country[],
  base: number,
  deltaGen: number
): Values => {
  const generatedData: Values = {};
  countryListAllIsoData.map(country => {
    generatedData[country.code] = randomMembersFromBase(base, deltaGen);
  });
  return generatedData;
};
