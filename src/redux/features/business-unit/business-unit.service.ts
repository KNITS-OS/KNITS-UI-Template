import { httpCommon, BUSINESS_UNIT_ROUTE } from "redux/app";

const findAll = () => httpCommon.get(`${BUSINESS_UNIT_ROUTE}`);

export const businessUnitService = {
  findAll,
};
