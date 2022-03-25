import { AppActionType, typedAction } from "redux/app";

import { businessUnitService } from ".";

const findAllBusinessUnitsLoading = () =>
  typedAction(AppActionType.LIST_BUSINESS_UNITS_LOADING, AppActionType.LIST_BUSINESS_UNITS_LOADING);

const findAllBusinessUnitsComplete = data =>
  typedAction(AppActionType.LIST_BUSINESS_UNITS_COMPLETE, data);

const findAllBusinessUnitsError = err => typedAction(AppActionType.LIST_BUSINESS_UNITS_ERROR, err);

export const findAllBusinessUnits = () => async dispatch => {
  try {
    dispatch(findAllBusinessUnitsLoading());

    const { data } = await businessUnitService.findAll();

    dispatch(findAllBusinessUnitsComplete(data));
  } catch (err) {
    dispatch(findAllBusinessUnitsError(err));
  }
};
