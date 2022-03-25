import { createSelector } from "reselect";

import { RootState } from "redux/app";

import { SELECT_ALL_IDS } from "variables/app.consts";

export const selectGroupState = (rootState: RootState) => rootState.group;

export const selectAllGroupData = createSelector(
  [selectGroupState],
  groupState => groupState.entities
);

export const selectGroupById = (id: number) =>
  createSelector(
    [selectAllGroupData], //array of input selectors
    groups => groups.find(group => group.id === id) //arg
  );

export const selectGroupsByIds = (ids: number[]) =>
  createSelector(
    [selectAllGroupData], //array of input selectors
    groups => groups.filter(group => ids.includes(group.id))
  );

export const selectGroupsByIdsAsSelectValues = (ids: number[]) =>
  createSelector([selectGroupsByIds(ids)], groupsByIds => {
    const groupOptions = groupsByIds.map(group => {
      return { value: `${group.id}`, label: group.name };
    });
    return [...groupOptions];
  });

export const selectAllGroupsDataAsSelectOptions = createSelector([selectAllGroupData], groups => {
  const groupOptions = groups.map(group => {
    return { value: `${group.id}`, label: group.name };
  });
  return [SELECT_ALL_IDS(groups.map(group => group.id)), ...groupOptions];
});
