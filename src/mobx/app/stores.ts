// https://javascript.plainenglish.io/all-you-need-is-mobx-react-lite-47ba0e95e9c8

import { createContext, useContext } from "react";

import { CounterStore, EmployeeStore } from "../stores";

// configure({ enforceActions: "always" });

export const stores = Object.freeze({
  counterStore: CounterStore,
  employeeStore: EmployeeStore,
});

const StoresContext = createContext(stores);

export const useStores = () => useContext(StoresContext);

export const StoresProvider = StoresContext.Provider;
