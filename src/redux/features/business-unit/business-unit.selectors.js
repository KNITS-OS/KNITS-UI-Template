import { createSelector } from "reselect";

import { SELECT_ALL } from "variables/app.consts";

export const selectBusinessUnitState = rootState => rootState.businessUnit;

export const selectAllBusinessUnitData = createSelector(
  [selectBusinessUnitState],
  businessUnitState => businessUnitState.entities
);

export const selectBusinessUnitById = id =>
  createSelector(
    [selectAllBusinessUnitData], //array of input selectors
    businessUnits => businessUnits.find(businessUnit => businessUnit.id === id) //arg
  );

export const selectAllBusinessUnitsDataAsSelectOptions = createSelector(
  [selectAllBusinessUnitData],
  businessUnits => {
    const businessUnitOptions = businessUnits.map(businessUnit => {
      return { value: `${businessUnit.id}`, label: businessUnit.name };
    });
    return [SELECT_ALL, ...businessUnitOptions];
  }
);
