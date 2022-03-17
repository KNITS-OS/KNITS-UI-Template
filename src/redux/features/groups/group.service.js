import { GROUP_ROUTE, httpCommon } from "redux/app";

const findAll = () => httpCommon.get(`${GROUP_ROUTE}`);

const getGroupById = id => httpCommon.get(`${GROUP_ROUTE}/${id}`);

const createGroup = body => httpCommon.post(`${GROUP_ROUTE}`, body);

const updateGroup = (id, body) => httpCommon.put(`${GROUP_ROUTE}/${id}`, body);

const deleteGroup = id => httpCommon.delete(`${GROUP_ROUTE}/${id}`);

export const groupService = {
  findAll,
  getGroupById,
  createGroup,
  updateGroup,
  deleteGroup,
};
