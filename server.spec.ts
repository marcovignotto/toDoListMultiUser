/**
 * @desc test 404 & welcome api v1
 */

import createObj from "./__test__/utils/axiosObj";
import getData from "./__test__/utils/createObj";

const BASEurl = "http://localhost:5000/";

/**
 * @desc Test welcome API v1
 */

describe("test 404 & welcome api v1", () => {
  it("/v1/ > Welcome to the Multi User ToDo List v1.0", async () => {
    const makeObjToSend = createObj({
      method: "GET",
      url: BASEurl + "v1/",
      //             data: {},
      params: "",
    });

    const res = await getData(makeObjToSend);
    expect.assertions(4);

    expect(res.status).toBe(200);
    expect(res.statusText).toBe("OK");
    expect(res.data.success).toBe(true);
    expect(res.data.msg).toBe("Welcome to the Multi User ToDo List v1.0");
  });
});
