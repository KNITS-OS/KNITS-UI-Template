import { Domain } from "types";

export interface SerializedError {
  name?;
  message?;
  stack?;
  code?;
}

export type StateType<T extends Domain> = {
  entities: T[];
  entity: T | null;
  isLoading: boolean;
  isSuccess: boolean;
  error: SerializedError;
};

export interface IUpdated<T> {
  id: number;
  body: T;
}
