import { Dispatch } from "redux";
import { ActionType } from "typesafe-actions";

import { AppActionType, typedAction, SerializedError } from "redux/app";

import { BusinessUnit } from "types";

import { businessUnitService } from ".";

const findAllBusinessUnitsLoading = () =>
  typedAction(AppActionType.LIST_BUSINESS_UNITS_LOADING, AppActionType.LIST_BUSINESS_UNITS_LOADING);

const findAllBusinessUnitsComplete = (data: BusinessUnit[]) =>
  typedAction(AppActionType.LIST_BUSINESS_UNITS_COMPLETE, data);

const findAllBusinessUnitsError = (err: SerializedError) =>
  typedAction(AppActionType.LIST_BUSINESS_UNITS_ERROR, err);

export type BusinessUnitActionType = ActionType<
  | typeof findAllBusinessUnitsLoading
  | typeof findAllBusinessUnitsComplete
  | typeof findAllBusinessUnitsError
>;

export const findAllBusinessUnits = () => async (dispatch: Dispatch<BusinessUnitActionType>) => {
  try {
    dispatch(findAllBusinessUnitsLoading());

    const { data } = await businessUnitService.findAll();

    dispatch(findAllBusinessUnitsComplete(data));
  } catch (err) {
    dispatch(findAllBusinessUnitsError(err as SerializedError));
  }
};
