import { AnyAction } from "redux";

import {
  LIST_BUSINESS_UNITS_COMPLETE,
  LIST_BUSINESS_UNITS_LOADING,
  LIST_BUSINESS_UNITS_ERROR,
  StateType,
} from "redux/app";

import { BusinessUnit } from "types";

const initialState: StateType<BusinessUnit> = {
  entities: [],
  entity: null,
  isLoading: false,
  isSuccess: false,
  error: {},
};

export const businessUnitReducer = (
  businessUnitState = initialState,
  action: AnyAction
): StateType<BusinessUnit> => {
  const { type, payload } = action;
  switch (type) {
    case LIST_BUSINESS_UNITS_LOADING:
      return {
        isLoading: true,
        isSuccess: false,
        error: {},
        entities: [],
        entity: null,
      };

    case LIST_BUSINESS_UNITS_ERROR:
      return {
        isLoading: false,
        isSuccess: false,
        error: payload,
        entities: [],
        entity: null,
      };

    case LIST_BUSINESS_UNITS_COMPLETE:
      return {
        isLoading: false,
        isSuccess: true,
        error: {},
        entities: payload,
        entity: null,
      };

    default:
      return businessUnitState;
  }
};
