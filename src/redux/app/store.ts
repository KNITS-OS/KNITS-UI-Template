import { applyMiddleware, combineReducers, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import logger from "redux-logger";
import { createReducer, ORM } from "redux-orm";
import thunk from "redux-thunk";

import {
  worldOverviewReducer,
  countryReducer,
  businessUnitReducer,
  documentReducer,
  employeeReducer,
} from "redux/features";

import { Employee, Group } from "../models";

export const orm = new ORM({
  stateSelector: state => state.orm,
});
orm.register(Employee, Group);

const emptyDBState = orm.getEmptyState();

export const session = orm.session(emptyDBState);

const middleware = [thunk];

const rootReducer = combineReducers({
  employee: employeeReducer,
  document: documentReducer,
  worldOverview: worldOverviewReducer,
  businessUnit: businessUnitReducer,
  country: countryReducer,
  orm: createReducer(orm),
});

export type RootState = ReturnType<typeof rootReducer>;

export const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(...middleware, logger))
);

export type AppDispatch = typeof store.dispatch;
