import { createSelector as createOrmSelector } from "redux-orm";
import { createSelector as createReselectSelector } from "reselect";

import { orm } from "redux/app";

import { Group, SelectOption } from "types";
import { SELECT_ALL_IDS } from "variables/app.consts";

import { Employee } from "../../models";

export const selectGroupState = createOrmSelector(orm, session => session.Group.all());

export const selectAllGroupData = createReselectSelector(
  [selectGroupState],
  groupState => groupState.all().toModelArray() as Group[]
);

export const selectGroupById = (id: number) =>
  createReselectSelector(
    [selectAllGroupData], //array of input selectors
    groups => groups.find(group => group.id === id) //arg
  );

export const selectGroupsByIds = (ids: number[]) =>
  createReselectSelector(
    [selectAllGroupData], //array of input selectors
    groups => groups.filter(group => ids.includes(group.id))
  );

export const selectGroupsByIdsAsSelectValues = (ids: number[]) =>
  createReselectSelector([selectGroupsByIds(ids)], groupsByIds => {
    const groupOptions: SelectOption[] = groupsByIds.map(group => {
      return { value: `${group.id}`, label: group.name };
    });
    return groupOptions;
  });

export const selectGroupMembers = createOrmSelector(orm, session => {
  return session.Group.all()
    .toModelArray()
    .map(group => {
      const { ref } = group;
      return {
        ...ref,
        members: group.members.toRefArray().map((employee: Employee) => employee),
      };
    });
});

export const selectAllGroupsDataAsSelectOptions = createOrmSelector(orm, session => {
  const groupOptions = session.Group.all()
    .toModelArray()
    .map(group => {
      return { value: `${group.id}`, label: group.name };
    });
  return [
    SELECT_ALL_IDS(
      session.Group.all()
        .toModelArray()
        .map(group => group.id)
    ),
    ...groupOptions,
  ];
});
