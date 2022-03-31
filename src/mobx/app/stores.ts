// https://javascript.plainenglish.io/all-you-need-is-mobx-react-lite-47ba0e95e9c8

import { configure } from "mobx";
import { types } from "mobx-state-tree";
import { createContext, useContext } from "react";

import { EmployeeStore, GroupStore } from "../models";

configure({
  enforceActions: "observed",
  computedRequiresReaction: true,
  reactionRequiresObservable: true,
  observableRequiresReaction: true,
  disableErrorBoundaries: true,
});

const RootModel = types.model({
  employeeStore: EmployeeStore,
  groupStore: GroupStore,
});

export const stores = RootModel.create({
  employeeStore: {},
  groupStore: {},
});

const StoresContext = createContext(stores);

export const useStores = () => useContext(StoresContext);

export const StoresProvider = StoresContext.Provider;
