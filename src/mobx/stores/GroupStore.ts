import { makeAutoObservable, observable, runInAction } from "mobx";

import { groupService, SerializedError } from "api";
import { Group } from "types";

export class GroupStore {
  @observable groups: Group[] = [];
  @observable group: Group | null = null;
  @observable isLoading = false;
  @observable isSuccess = false;
  @observable error: SerializedError = {};

  constructor() {
    makeAutoObservable(this);
  }

  async findGroups() {
    this.groups = [];
    this.isLoading = true;
    try {
      const { data } = await groupService.findAll();
      runInAction(() => {
        this.groups = data;
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
}
