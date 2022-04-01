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
  employeeService,
  groupService,
} from "redux/features";

import { Employee, Group } from "../models";

export const orm = new ORM({
  stateSelector: state => state.orm,
});
orm.register(Employee, Group);

const emptyDBState = orm.getEmptyState();

export const session = orm.session(emptyDBState);

const middleware = [thunk];

const ormReducer = createReducer(orm);

const rootReducer = combineReducers({
  orm: ormReducer,
  document: documentReducer,
  worldOverview: worldOverviewReducer,
  businessUnit: businessUnitReducer,
  country: countryReducer,
});

const addDataToDB = async () => {
  const { data: employees } = await employeeService.findAllEmployees();
  const { data: groups } = await groupService.findAll();

  employees.forEach(employee => {
    session.Employee.create(employee as any);
  });
  groups.forEach(group => {
    session.Group.create(group as any);
  });
};

const data = addDataToDB();
console.log("data 12345", data);

console.log("1234 rr", rootReducer);

export type RootState = ReturnType<typeof rootReducer>;

export const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(...middleware, logger))
);

export type AppDispatch = typeof store.dispatch;
