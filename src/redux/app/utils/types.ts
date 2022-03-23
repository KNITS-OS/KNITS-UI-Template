import { Domain } from "types";

export interface SerializedError {
  name?: string;
  message?: string;
  stack?: string;
  code?: string;
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
