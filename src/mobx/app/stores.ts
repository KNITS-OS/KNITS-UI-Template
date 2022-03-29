// https://javascript.plainenglish.io/all-you-need-is-mobx-react-lite-47ba0e95e9c8

import { configure } from "mobx";
import { createContext, useContext } from "react";

import { EmployeeStore, GroupStore } from "../stores";

configure({
  enforceActions: "observed",
  computedRequiresReaction: true,
  reactionRequiresObservable: true,
  observableRequiresReaction: true,
  disableErrorBoundaries: true,
});

export const stores = Object.freeze({
  employeeStore: new EmployeeStore(),
  groupStore: new GroupStore(),
});

const StoresContext = createContext(stores);

export const useStores = () => useContext(StoresContext);

export const StoresProvider = StoresContext.Provider;
