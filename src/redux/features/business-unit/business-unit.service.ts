import { httpCommon, BUSINESS_UNIT_ROUTE, HttpResponseType } from "redux/app";

import { BusinessUnit } from "types";

const findAll = (): HttpResponseType<BusinessUnit[]> => httpCommon.get(`${BUSINESS_UNIT_ROUTE}`);

export const businessUnitService = {
  findAll,
};
