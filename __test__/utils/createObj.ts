/**
 * @desc func to get the make axios calls
 */

import axios from "axios";
import type {
  AxiosRequestConfig,
  AxiosResponse,
  AxiosPromise,
  AxiosError,
  Method,
  AxiosRequestHeaders,
} from "axios";

// import IObject from "./axiosObj";

interface IDataSuccess<T = any> {
  data: T;
  status: number;
  statusText: string;
  headers: any;
  config: AxiosRequestConfig;
  request?: any;
}

interface IDataError<T = any, D = any> {
  config: AxiosRequestConfig<D>;
  code?: string;
  request?: any;
  response?: AxiosResponse<T, D>;
  isAxiosError: boolean;
  toJSON: () => object;
}

export interface IObject {
  method?: Method;
  url?: string;
  config?: object;
  data?: object;
  params?: object;
  headers?: AxiosRequestHeaders;
  withCredentials?: boolean;
}
axios.defaults.withCredentials = true;
const getData: Function = async (
  objCall: AxiosRequestConfig<IObject>
): Promise<AxiosResponse<IDataSuccess> | AxiosError<IDataError>> => {
  return axios(objCall)
    .then((res: AxiosResponse<IDataSuccess>) => res)
    .catch((err: AxiosError<IDataError>) => err);
};

export default getData;
