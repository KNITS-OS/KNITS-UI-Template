import { GROUP_ROUTE, httpCommon, HttpResponseType, IUpdated } from "redux/app";

import { Group, GroupSaveRequest } from "types";

const findAll = (): HttpResponseType<Group[]> => httpCommon.get(`${GROUP_ROUTE}`);

const getGroupById = (id: number): HttpResponseType<Group> =>
  httpCommon.get(`${GROUP_ROUTE}/${id}`);

const createGroup = (group: GroupSaveRequest): HttpResponseType<Group> =>
  httpCommon.post(`${GROUP_ROUTE}`, group);

const updateGroup = (updatedGroup: IUpdated<Group>): HttpResponseType<Group> => {
  const { id, body } = updatedGroup;
  return httpCommon.put(`${GROUP_ROUTE}/${id}`, body);
};

const deleteGroup = (id: number): HttpResponseType<Group> =>
  httpCommon.delete(`${GROUP_ROUTE}/${id}`);

export const groupService = {
  findAll,
  getGroupById,
  createGroup,
  updateGroup,
  deleteGroup,
};
