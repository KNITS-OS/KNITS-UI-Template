import { AnyAction, Dispatch } from "redux";

import {
  LIST_BUSINESS_UNITS_COMPLETE,
  LIST_BUSINESS_UNITS_LOADING,
  LIST_BUSINESS_UNITS_ERROR,
  typedAction,
  SerializedError,
} from "redux/app";

import { BusinessUnit } from "types";

import { businessUnitService } from ".";

const findAllBusinessUnitsLoading = () =>
  typedAction(LIST_BUSINESS_UNITS_LOADING, LIST_BUSINESS_UNITS_LOADING);

const findAllBusinessUnitsComplete = (data: BusinessUnit[]) =>
  typedAction(LIST_BUSINESS_UNITS_COMPLETE, data);

const findAllBusinessUnitsError = (err: SerializedError) =>
  typedAction(LIST_BUSINESS_UNITS_ERROR, err.message);

export const findAllBusinessUnits = () => async (dispatch: Dispatch<AnyAction>) => {
  try {
    dispatch(findAllBusinessUnitsLoading());

    const { data } = await businessUnitService.findAll();

    dispatch(findAllBusinessUnitsComplete(data));
  } catch (err) {
    dispatch(findAllBusinessUnitsError(err as SerializedError));
  }
};
