export interface IUpdated<T> {
  id: number;
  body: T;
}

export interface SerializedError {
  name?: string;
  message?: string;
  stack?: string;
  code?: string;
}
