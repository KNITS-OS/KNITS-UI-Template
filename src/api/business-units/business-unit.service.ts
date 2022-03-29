import { BUSINESS_UNIT_ROUTE, httpCommon, HttpResponseType } from "api";
import { BusinessUnit } from "types";

const findAll = (): HttpResponseType<BusinessUnit[]> => httpCommon.get(`${BUSINESS_UNIT_ROUTE}`);

export const businessUnitService = {
  findAll,
};
