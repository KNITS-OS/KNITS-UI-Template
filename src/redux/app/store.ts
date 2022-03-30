import { applyMiddleware, combineReducers, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import logger from "redux-logger";
import { createReducer, ORM } from "redux-orm";
import thunk from "redux-thunk";

import {
  worldOverviewReducer,
  countryReducer,
  businessUnitReducer,
  groupReducer,
  documentReducer,
  employeeReducer,
} from "redux/features";

import { Employee, Group } from "../models";

const orm = new ORM();
orm.register(Employee, Group);

const middleware = [thunk];

const rootReducer = combineReducers({
  orm: createReducer(orm),
  employee: employeeReducer,
  document: documentReducer,
  group: groupReducer,
  worldOverview: worldOverviewReducer,
  businessUnit: businessUnitReducer,
  country: countryReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(...middleware, logger))
);

export type AppDispatch = typeof store.dispatch;
