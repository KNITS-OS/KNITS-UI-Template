import {
  LIST_BUSINESS_UNITS_COMPLETE,
  LIST_BUSINESS_UNITS_LOADING,
  LIST_BUSINESS_UNITS_ERROR,
} from "redux/app";

import { businessUnitService } from ".";

export const findAllBusinessUnits = () => async (dispatch: Dispatch<AnyAction>) => {
  try {
    dispatch({
      type: LIST_BUSINESS_UNITS_LOADING,
      payload: LIST_BUSINESS_UNITS_LOADING,
    });

    const { data } = await businessUnitService.findAll();

    dispatch({
      type: LIST_BUSINESS_UNITS_COMPLETE,
      payload: data,
    });
  } catch (err) {
    dispatch({
      type: LIST_BUSINESS_UNITS_ERROR,
      payload: err.message,
    });
  }
};
