import { AppActionType, StateType } from "redux/app";

import { Country } from "types";

import { CountryActionType } from ".";

const initialState: StateType<Country> = {
  entities: [],
  entity: null,
  isLoading: false,
  isSuccess: false,
  error: {},
};

export const countryReducer = (
  countryState = initialState,
  action: CountryActionType
): StateType<Country> => {
  const { type, payload } = action;
  switch (type) {
    case AppActionType.LIST_COUNTRIES_LOADING:
      return {
        isLoading: true,
        isSuccess: false,
        error: {},
        entities: [],
        entity: null,
      };

    case AppActionType.LIST_COUNTRIES_ERROR:
      return {
        isLoading: false,
        isSuccess: false,
        error: payload,
        entities: [],
        entity: null,
      };

    case AppActionType.LIST_COUNTRIES_COMPLETE:
      return {
        isLoading: false,
        isSuccess: true,
        error: {},
        entities: payload,
        entity: null,
      };

    default:
      return countryState;
  }
};
