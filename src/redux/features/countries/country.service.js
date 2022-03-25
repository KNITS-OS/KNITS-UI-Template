import { COUNTRY_ROUTE, httpCommon } from "redux/app";

const findAll = () => httpCommon.get(`${COUNTRY_ROUTE}`);

export const countryService = {
  findAll,
};
