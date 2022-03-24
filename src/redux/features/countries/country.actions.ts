import { Dispatch } from "redux";
import { ActionType } from "typesafe-actions";

import { AppActionType, typedAction, SerializedError } from "redux/app";

import { Country } from "types";

import { countryService } from ".";

const findAllCountriesLoading = () =>
  typedAction(AppActionType.LIST_COUNTRIES_LOADING, AppActionType.LIST_COUNTRIES_LOADING);

const findAllCountriesComplete = (data: Country[]) =>
  typedAction(AppActionType.LIST_COUNTRIES_COMPLETE, data);

const findAllCountriesError = (err: SerializedError) =>
  typedAction(AppActionType.LIST_COUNTRIES_ERROR, err);

export type CountryActionType = ActionType<
  typeof findAllCountriesLoading | typeof findAllCountriesComplete | typeof findAllCountriesError
>;

export const findAllCountries = () => async (dispatch: Dispatch<CountryActionType>) => {
  try {
    dispatch(findAllCountriesLoading());

    const { data } = await countryService.findAll();

    dispatch(findAllCountriesComplete(data));
  } catch (err) {
    dispatch(findAllCountriesError(err as SerializedError));
  }
};
