import axios, { AxiosResponse } from "axios";

export type HttpResponseType<T> = Promise<AxiosResponse<T>>;

export const httpCommon = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  headers: {
    "Content-type": "application/json",
    Accept: "application/json",
  },
});
