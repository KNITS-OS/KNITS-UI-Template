import { AnyAction } from "redux";

import {
  LIST_COUNTRIES_COMPLETE,
  LIST_COUNTRIES_ERROR,
  LIST_COUNTRIES_LOADING,
  StateType,
} from "redux/app";

import { Country } from "types";

const initialState: StateType<Country> = {
  entities: [],
  entity: null,
  isLoading: false,
  isSuccess: false,
  error: {},
};

export const countryReducer = (
  countryState = initialState,
  action: AnyAction
): StateType<Country> => {
  const { type, payload } = action;
  switch (type) {
    case LIST_COUNTRIES_LOADING:
      return {
        isLoading: true,
        isSuccess: false,
        error: {},
        entities: [],
        entity: null,
      };

    case LIST_COUNTRIES_ERROR:
      return {
        isLoading: false,
        isSuccess: false,
        error: payload,
        entities: [],
        entity: null,
      };

    case LIST_COUNTRIES_COMPLETE:
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
