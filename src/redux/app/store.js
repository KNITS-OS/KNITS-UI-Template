import { applyMiddleware, combineReducers, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import logger from "redux-logger";
import thunk from "redux-thunk";

import {
  worldOverviewReducer,
  countryReducer,
  businessUnitReducer,
  groupReducer,
  documentReducer,
  employeeReducer,
} from "redux/features";

const middleware = [thunk];

const rootReducer = combineReducers({
  employee: employeeReducer,
  document: documentReducer,
  businessUnit: businessUnitReducer,
  group: groupReducer,
  country: countryReducer,
  worldOverview: worldOverviewReducer,
});

export const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(...middleware, logger))
);
