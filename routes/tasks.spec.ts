/**
 * @desc test for the route tasks
 *       GET POST PATCH DELETE
 */

import createObj from "../__test__/utils/axiosObj";
import getData from "../__test__/utils/createObj";
import testConfigData from "../__test__/testConfig.json";

import axios from "axios";
import MockAdapter from "axios-mock-adapter";

import {
  credentialsRight,
  credentialsWrongEmail,
  credentialsWrongPass,
  testToken,
} from "../__test__/utils/credentials";

// define the route
const BASEurl = testConfigData.baseUrl + "tasks";

/**
 * @desc test GET
 * 1. Error without token
 * 2. Error wrong token
 * 3. Basic
 */

describe("/tasks/ - GET - POST - PATCH - DELETE", () => {
  describe("GET - Retrives all the tasks of a specific user", () => {
    test("1. Error without token > false, 401 Bad Request", async () => {
      const makeObjToSend = createObj({
        method: "GET",
        url: BASEurl,
        withCredentials: true,
        data: {
          config: {
            withCredentials: true,
            header: {},
          },
        },
      });

      const res = await getData(makeObjToSend);

      expect.assertions(3);
      // code
      expect(res.response.status).toBe(401);
      // success
      expect(res.response.data.success).toBe(false);
      // msg
      expect(res.response.data.msg).toBe("No Token, no auth!");
    });

    test("2. Error wrong token > false, 401 Bad Request", async () => {
      const makeObjToSend = createObj({
        method: "GET",
        url: BASEurl,
        withCredentials: true,
        data: {
          config: {
            withCredentials: true,
            header: {
              "Set-Cookie": testToken() + "XYZ",
            },
          },
        },
      });

      const res = await getData(makeObjToSend);
      expect.assertions(3);
      // code
      expect(res.response.status).toBe(401);
      // success
      expect(res.response.data.success).toBe(false);
      // msg
      expect(res.response.data.msg).toBe("Authorization error!");
    });

    test("3. Basic > true, 200, ok", async () => {
      const makeObjToSend = createObj({
        method: "GET",
        url: BASEurl,
        withCredentials: true,
        data: {
          config: {
            withCredentials: true,
            header: {
              "Set-Cookie": testToken(),
            },
          },
        },
      });

      const res = await getData(makeObjToSend);

      expect.assertions(3);
      // status
      expect(res.status).toBe(200);
      // text
      expect(res.statusText).toBe("OK");
      // success
      expect(res.data.success).toBe(true);
    });

    test("4. Mocked array returned > true, 200, length 3", async () => {
      // mock
      var mock = new MockAdapter(axios);
      // array 3 items
      const data = {
        success: true,
        tasks: [{ task: "one" }, { task: "two" }, { task: "three" }],
      };

      mock.onGet(BASEurl).reply(200, data);

      //
      const makeObjToSend = createObj({
        method: "GET",
        url: BASEurl,
        withCredentials: true,
      });

      const res = await getData(makeObjToSend);

      expect.assertions(3);
      // status
      expect(res.status).toBe(200);
      // success
      expect(res.data.success).toBe(true);
      // data returned
      expect(res.data.tasks).toHaveLength(3);
    });
  });
});
