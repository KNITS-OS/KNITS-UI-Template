import { AppActionType } from "redux/app";

const initialState = {
  entities: [],
  entity: null,
  isLoading: false,
  isSuccess: false,
  error: {},
};

export const businessUnitReducer = (businessUnitState = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case AppActionType.LIST_BUSINESS_UNITS_LOADING:
      return {
        isLoading: true,
        isSuccess: false,
        error: {},
        entities: [],
        entity: null,
      };

    case AppActionType.LIST_BUSINESS_UNITS_ERROR:
      return {
        isLoading: false,
        isSuccess: false,
        error: payload,
        entities: [],
        entity: null,
      };

    case AppActionType.LIST_BUSINESS_UNITS_COMPLETE:
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
