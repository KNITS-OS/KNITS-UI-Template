import { makeAutoObservable, runInAction } from "mobx";

import { groupService, IUpdated, SerializedError } from "api";
import { Group, GroupSaveRequest } from "types";
import { initialGroupState } from "variables/app.consts";

export interface IUpdateGroupState {
  name: keyof typeof initialGroupState;
  value: any;
}

export class GroupStore {
  entities: Group[] = [];
  entity: Group = initialGroupState;
  isLoading = false;
  isSuccess = false;
  error: SerializedError = {};

  constructor() {
    makeAutoObservable(this);
  }

  async createGroup(group: GroupSaveRequest) {
    this.isLoading = true;
    try {
      const { data } = await groupService.createGroup(group);
      runInAction(() => {
        this.entities.push(data);
        this.isSuccess = true;
        this.isLoading = false;
      });
    } catch (e) {
      runInAction(() => {
        this.error = e as SerializedError;
        this.isLoading = false;
      });
    }
  }

  async findGroupById(id: number) {
    this.entity = initialGroupState;
    this.isLoading = true;
    try {
      const { data } = await groupService.getGroupById(id);
      runInAction(() => {
        this.entity = data;
        this.isSuccess = true;
        this.isLoading = false;
      });
    } catch (e) {
      runInAction(() => {
        this.error = e as SerializedError;
        this.isLoading = false;
      });
    }
  }

  async findGroups() {
    this.isLoading = true;
    try {
      const { data } = await groupService.findAll();
      runInAction(() => {
        this.entities = data;
        this.isSuccess = true;
        this.isLoading = false;
      });
    } catch (e) {
      runInAction(() => {
        this.error = e as SerializedError;
        this.isLoading = false;
      });
    }
  }

  async updateGroup(updatedGroup: IUpdated<Group>) {
    this.isLoading = true;
    try {
      const { data } = await groupService.updateGroup(updatedGroup);
      runInAction(() => {
        this.entities = this.entities.map(item => (item.id === data.id ? data : item));
        this.isSuccess = true;
        this.isLoading = false;
      });
    } catch (e) {
      runInAction(() => {
        this.error = e as SerializedError;
        this.isLoading = false;
      });
    }
  }

  async deleteGroup(id: number) {
    this.isLoading = true;
    try {
      await groupService.deleteGroup(id);
      runInAction(() => {
        this.entities = this.entities.filter(item => item.id !== id);
        this.isSuccess = true;
        this.isLoading = false;
      });
    } catch (e) {
      runInAction(() => {
        this.error = e as SerializedError;
        this.isLoading = false;
      });
    }
  }

  updateGroupState({ name, value }: IUpdateGroupState) {
    this.entity = { ...this.entity, [name]: value };
  }
}
