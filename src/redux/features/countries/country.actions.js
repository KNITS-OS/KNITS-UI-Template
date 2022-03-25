import { AppActionType, typedAction } from "redux/app";

import { countryService } from ".";

const findAllCountriesLoading = () =>
  typedAction(AppActionType.LIST_COUNTRIES_LOADING, AppActionType.LIST_COUNTRIES_LOADING);

const findAllCountriesComplete = data => typedAction(AppActionType.LIST_COUNTRIES_COMPLETE, data);

const findAllCountriesError = err => typedAction(AppActionType.LIST_COUNTRIES_ERROR, err);

export const findAllCountries = () => async dispatch => {
  try {
    dispatch(findAllCountriesLoading());

    const { data } = await countryService.findAll();

    dispatch(findAllCountriesComplete(data));
  } catch (err) {
    dispatch(findAllCountriesError(err));
  }
};
