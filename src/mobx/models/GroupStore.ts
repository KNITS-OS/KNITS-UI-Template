import { flow, types } from "mobx-state-tree";

import { groupService, IUpdated } from "api";
import { Group, GroupSaveRequest } from "types";
import { initialGroupState } from "variables/app.consts";

import { GroupModel } from "./common";

export interface IUpdateGroupState {
  name: keyof typeof initialGroupState;
  value: any;
}

export const GroupStore = types
  .model({
    entities: types.optional(types.array(GroupModel), []),
    entity: types.optional(GroupModel, {}),
    isLoading: types.optional(types.boolean, false),
    error: types.optional(types.string, ""),
    isSuccess: types.optional(types.boolean, false),
  })
  .actions(self => {
    const createGroup = flow(function* (group: GroupSaveRequest) {
      self.isLoading = true;
      try {
        const { data } = yield groupService.createGroup(group);
        self.entities.push(data);
        self.isSuccess = true;
        self.isLoading = false;
      } catch (e) {
        self.error = e as any;
        self.isLoading = false;
      }
    });

    const findGroupById = flow(function* (id: number) {
      self.isLoading = true;
      try {
        const { data } = yield groupService.getGroupById(id);
        self.entity = data;
        self.isSuccess = true;
        self.isLoading = false;
      } catch (e) {
        self.error = e as any;
        self.isLoading = false;
      }
    });

    const findGroups = flow(function* () {
      self.isLoading = true;
      try {
        const { data } = yield groupService.findAll();
        self.entities = data;
        self.isSuccess = true;
        self.isLoading = false;
      } catch (e) {
        self.error = e as any;
        self.isLoading = false;
      }
    });

    const updateGroup = flow(function* (updatedGroup: IUpdated<Group>) {
      self.isLoading = true;
      try {
        const { data } = yield groupService.updateGroup(updatedGroup);

        self.entities = self.entities.map(item => (item.id === data.id ? data : item)) as any;
        self.isSuccess = true;
        self.isLoading = false;
      } catch (e) {
        self.error = e as any;
        self.isLoading = false;
      }
    });

    const deleteGroup = flow(function* (id: number) {
      self.isLoading = true;
      try {
        yield groupService.deleteGroup(id);

        self.entities = self.entities.filter(item => item.id !== id) as any;
        self.isSuccess = true;
        self.isLoading = false;
      } catch (e) {
        self.error = e as any;
        self.isLoading = false;
      }
    });

    const updateGroupState = ({ name, value }: IUpdateGroupState) => {
      self.entity = { ...self.entity, [name]: value };
    };

    return { createGroup, findGroupById, findGroups, updateGroup, deleteGroup, updateGroupState };
  });
