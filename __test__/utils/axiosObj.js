"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const createObj = (objCall) => {
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
exports.default = createObj;
//# sourceMappingURL=axiosObj.js.map