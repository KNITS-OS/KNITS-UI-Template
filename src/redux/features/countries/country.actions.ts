import { AnyAction, Dispatch } from "redux";

import { ActionType, typedAction, SerializedError } from "redux/app";

import { Country } from "types";

import { countryService } from ".";

const findAllCountriesLoading = () =>
  typedAction(ActionType.LIST_COUNTRIES_LOADING, ActionType.LIST_COUNTRIES_LOADING);

const findAllCountriesComplete = (data: Country[]) =>
  typedAction(ActionType.LIST_COUNTRIES_COMPLETE, data);

const findAllCountriesError = (err: SerializedError) =>
  typedAction(ActionType.LIST_COUNTRIES_ERROR, err.message);

export const findAllCountries = () => async (dispatch: Dispatch<AnyAction>) => {
  try {
    dispatch(findAllCountriesLoading());

    const { data } = await countryService.findAll();

    dispatch(findAllCountriesComplete(data));
  } catch (err) {
    dispatch(findAllCountriesError(err as SerializedError));
  }
};
