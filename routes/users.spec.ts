/**
 * @desc test for the route users
 *       POST PATCH
 */

import createObj from "../__test__/utils/axiosObj";
import getData from "../__test__/utils/createObj";
import testConfigData from "../__test__/testConfig.json";

const BASEurl = testConfigData.baseUrl;

describe("/v1/users/ - POST - PATCH", () => {
  it("POST - creates a new user", async () => {
    const makeObjToSend = createObj({
      method: "POST",
      url: BASEurl + "v1/users",
      //             data: {},
      params: "",
    });

    const res = await getData(makeObjToSend);
    console.log("res", res);

    // expect.assertions(3);

    // expect(res.status).toBe(200);
    // expect(res.statusText).toBe("OK");
    // expect(res.data.success).toBe(true);
  });
});
