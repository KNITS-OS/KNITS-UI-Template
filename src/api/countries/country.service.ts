import { httpCommon, COUNTRY_ROUTE, HttpResponseType } from "api";
import { Country } from "types";

const findAll = (): HttpResponseType<Country[]> => httpCommon.get(`${COUNTRY_ROUTE}`);

export const countryService = {
  findAll,
};
