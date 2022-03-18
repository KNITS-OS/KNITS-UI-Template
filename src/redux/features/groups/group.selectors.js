import { createSelector } from "reselect";

import { SELECT_ALL_IDS } from "variables/app.consts";

import { selectAllEmployeeData } from "../employees";

export const selectGroupState = rootState => rootState.group;

export const selectAllGroupData = createSelector(
  [selectGroupState],
  groupState => groupState.entities
);

export const selectGroupById = id =>
  createSelector(
    [selectAllGroupData], //array of input selectors
    groups => groups.find(group => group.id === id) //arg
  );

export const selectGroupsByIds = ids =>
  createSelector(
    [selectAllGroupData], //array of input selectors
    groups => groups.filter(group => ids.includes(group.id))
  );

export const selectGroupsByIdsAsSelectValues = ids =>
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

export const selectGroupMembers = groupId =>
  createSelector(
    [
      selectGroupById(groupId), // select the current group
      state => selectAllEmployeeData(state),
    ],
    (group, employees) => {
      return Object.keys(employees)
        .map(key => employees[parseInt(key)])
        .filter(employee => group?.members.includes(employee.id));
    }
  );
