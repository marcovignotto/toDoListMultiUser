/**
* @desc test for the route tasks 
        GET POST PATCH DELETE
*/

import createObj from "../__test__/utils/axiosObj";
import getData from "../__test__/utils/createObj";

const BASEurl = "http://localhost:5000/";

describe("/v1/tasks/ - GET - POST - PATCH - DELETE", () => {
  describe("GET - Retrives all the tasks of a specific user", () => {
    test("Basic > true, 200, ok", async () => {
      const makeObjToSend = createObj({
        method: "GET",
        url: BASEurl + "v1/tasks",
        //             data: {},
        params: "",
      });

      const res = await getData(makeObjToSend);

      expect.assertions(3);

      expect(res.status).toBe(200);
      expect(res.statusText).toBe("OK");
      expect(res.data.success).toBe(true);
    });

    test("Error wrong user request > false, 400 Bad Request", async () => {
      const makeObjToSend = createObj({
        method: "GET",
        url: BASEurl + "v1/tasks",
        //             data: {},
        params: "",
      });

      const res = await getData(makeObjToSend);

      expect.assertions(2);

      expect(res.status).toBe(400);
      expect(res.data.success).toBe(false);
    });
  });
});
