import { AxiosResponse } from "axios";

export interface IUpdated<T> {
  id: number;
  body: T;
}

export type HttpResponseType = Promise<AxiosResponse<any>>;
