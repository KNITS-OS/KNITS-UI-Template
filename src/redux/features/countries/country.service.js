import { httpCommon, COUNTRY_ROUTE } from "redux/app";

const findAll = () => httpCommon.get(`${COUNTRY_ROUTE}`);

export const countryService = {
  findAll,
};
