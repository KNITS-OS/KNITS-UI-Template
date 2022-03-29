// https://javascript.plainenglish.io/all-you-need-is-mobx-react-lite-47ba0e95e9c8

import { createContext, useContext } from "react";

import { CounterStore, EmployeeStore, GroupStore } from "../stores";

// configure({ enforceActions: "always" });

export const stores = Object.freeze({
  counterStore: CounterStore,
  employeeStore: EmployeeStore,
  groupsStore: new GroupStore(),
});

const StoresContext = createContext(stores);

export const useStores = () => useContext(StoresContext);

export const StoresProvider = StoresContext.Provider;
