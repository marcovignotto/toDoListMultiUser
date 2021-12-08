/**
 * @desc Utility to create an obj for axios
 */
import type {
  AxiosRequestConfig,
  AxiosResponse,
  AxiosPromise,
  AxiosError,
} from "axios";

import type { IObject } from "./createObj";

const createObj = (objCall: AxiosRequestConfig<IObject>) => {
  const { method, url, data, params = "" } = objCall;

  // // if token is not empty returns header with token
  // // else header with out
  // if (token) {
  //   return {
  //     method: method,
  //     url: url,
  //     params: params,
  //     data: data,
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization: `Bearer ${token}`,
  //     },
  //   };
  // }

  return {
    method: method,
    url: url,
    data: data,
    params: params,
    headers: {
      "Content-Type": "application/json",
    },
  };
};

export default createObj;
