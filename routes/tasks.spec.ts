/**
 * @desc test for the route tasks
 *       GET POST PATCH DELETE
 */

import createObj from "../__test__/utils/axiosObj";
import getData from "../__test__/utils/createObj";
import testConfigData from "../__test__/testConfig.json";

const BASEurl = testConfigData.baseUrl;

describe.skip("/tasks/ - GET - POST - PATCH - DELETE", () => {
  describe("GET - Retrives all the tasks of a specific user", () => {
    test("Basic > true, 200, ok", async () => {
      const makeObjToSend = createObj({
        method: "GET",
        url: BASEurl + "tasks",
        params: "",
      });

      const res = await getData(makeObjToSend);

      expect.assertions(3);

      expect(res.status).toBe(200);
      expect(res.statusText).toBe("OK");
      expect(res.data.success).toBe(true);
    });

    test.skip("Error wrong user request > false, 400 Bad Request", async () => {
      const makeObjToSend = createObj({
        method: "GET",
        url: BASEurl + "v1/tasks",
        data: { method: "GET", url: BASEurl + "v1/tasks" },
        params: { user: "wrongUser", password: "wrongPassword" }, // test user
      });

      const res = await getData(makeObjToSend);
      console.log("res", res);
      //       expect.assertions(2);

      //       expect(res.status).toBe(400);
      //       expect(res.data.success).toBe(false);
    });
  });
});
