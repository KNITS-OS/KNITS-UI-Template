import { createSelector } from "reselect";

import { SELECT_ALL } from "variables/app.consts";

export const selectCountryState = rootState => rootState.country;

export const selectAllCountryData = createSelector([selectCountryState], countryState => {
  return countryState.entities;
});

export const selectAllCountriesDataAsSelectOptions = createSelector(
  [selectAllCountryData],
  countries => {
    const countriesOptions = countries.map(country => ({
      value: country.code3,
      label: country.name,
    }));

    return [SELECT_ALL, ...countriesOptions];
  }
);
