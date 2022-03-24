import { AnyAction } from "redux";

import { ActionType, StateType } from "redux/app";

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
    case ActionType.LIST_BUSINESS_UNITS_LOADING:
      return {
        isLoading: true,
        isSuccess: false,
        error: {},
        entities: [],
        entity: null,
      };

    case ActionType.LIST_BUSINESS_UNITS_ERROR:
      return {
        isLoading: false,
        isSuccess: false,
        error: payload,
        entities: [],
        entity: null,
      };

    case ActionType.LIST_BUSINESS_UNITS_COMPLETE:
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
