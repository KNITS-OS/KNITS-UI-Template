import { LIST_COUNTRIES_COMPLETE, LIST_COUNTRIES_LOADING, LIST_COUNTRIES_ERROR } from "redux/app";

import { countryService } from ".";

export const findAllCountries = () => async (dispatch: Dispatch<AnyAction>) => {
  try {
    dispatch({
      type: LIST_COUNTRIES_LOADING,
      payload: LIST_COUNTRIES_LOADING,
    });

    const { data } = await countryService.findAll();

    dispatch({
      type: LIST_COUNTRIES_COMPLETE,
      payload: data,
    });
  } catch (err) {
    dispatch({
      type: LIST_COUNTRIES_ERROR,
      payload: err.message,
    });
  }
};
