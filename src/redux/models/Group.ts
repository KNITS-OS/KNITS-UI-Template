import { attr, FieldSpecMap, many, Model, TableOpts } from "redux-orm";

import { Group as GroupType } from "types";

import { AppActionType } from "../app";
import { GroupActionType } from "../features";

// @ts-ignore
export class Group extends Model<typeof Group, GroupType> {
  static modelName = "Group";

  static fields: FieldSpecMap = {
    id: attr(),
    name: attr(),
    active: attr(),
    members: many({ to: "Employee", relatedName: "employeeGroups" }),
    description: attr(),
  };

  static options: (() => TableOpts) | TableOpts = {
    idAttribute: "id",
  };

  static reducer(action: GroupActionType, GroupModel: typeof Group) {
    console.log("action 1234", action);

    switch (action.type) {
      case AppActionType.CREATE_GROUP_COMPLETE:
        // @ts-ignore
        GroupModel.create(action.payload);
        break;
      case AppActionType.SEARCH_GROUP_COMPLETE:
        GroupModel.withId(action.payload.id);
        break;
      case AppActionType.SEARCH_GROUPS_COMPLETE:
        GroupModel.all();
        break;
      case AppActionType.UPDATE_GROUP_COMPLETE:
        // @ts-ignore
        GroupModel.withId(action.payload.id).update(action.payload);
        break;
      case AppActionType.DELETE_GROUP_COMPLETE:
        // @ts-ignore
        GroupModel.withId(action.payload).delete();
        break;
      default:
        break;
    }
  }
}
