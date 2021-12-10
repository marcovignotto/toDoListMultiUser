/**
 * @desc test for the route auth
 *       GET POST
 */

import createObj from "../__test__/utils/axiosObj";
import getData from "../__test__/utils/createObj";
import testConfigData from "../__test__/testConfig.json";

import {
  credentialsRight,
  credentialsWrongEmail,
  credentialsWrongPass,
} from "../__test__/utils/credentials";

const BASEurl = testConfigData.baseUrl;

/**
 * @desc test POST + GET Success / GET Error / POST Error
 * 3. POST to get the token
 * 2. GET to get user data with the token
 * 1. GET to get an ERROR with wrong token
 * 4. POST to get an ERROR with wrong credentials
 * 5. POST to get an ERROR with wrong credentials
 */

describe("/auth/ - GET - POST", () => {
  let access_token = "";

  describe("POST call tests", () => {
    it("1. POST get an ERROR > Wrong credentials password test", async () => {
      const makeObjToSend = createObj({
        method: "POST",
        url: BASEurl + "auth",
        data: {
          method: "POST",
          url: BASEurl + "auth",
          data: credentialsWrongEmail(),
        },
      });

      const res = await getData(makeObjToSend);

      expect.assertions(3);
      // false
      expect(res.response.data.success).toBe(false);
      // msg
      expect(res.response.data.msg).toBe("Unauthorized");
      // status
      expect(res.response.status).toBe(401);
    });
    it("2. POST get an ERROR > Wrong credentials password test", async () => {
      const makeObjToSend = createObj({
        method: "POST",
        url: BASEurl + "auth",
        data: {
          method: "POST",
          url: BASEurl + "auth",
          data: credentialsWrongPass(),
        },
      });

      const res = await getData(makeObjToSend);

      expect.assertions(3);
      // false
      expect(res.response.data.success).toBe(false);
      // msg
      expect(res.response.data.msg).toBe("Unauthorized");
      // status
      expect(res.response.status).toBe(401);
    });

    it("3. POST get a token > success: true", async () => {
      const makeObjToSend = createObj({
        method: "POST",
        url: BASEurl + "auth",
        data: {
          method: "POST",
          url: BASEurl + "auth",
          data: credentialsRight(),
        },
      });

      const res = await getData(makeObjToSend);

      expect.assertions(2);
      // 200
      expect(res.status).toBe(200);
      // success
      expect(res.data.success).toBe(true);
      // token
      expect(res.data.token).toHaveLength(res.data.token.length);

      access_token = res.data.token;
    });
  });

  // get to test with the auth middleware
  describe("GET call tests", () => {
    it("GET user data with a token > success:true", async () => {
      const makeObjToSend = createObj({
        method: "GET",
        url: BASEurl + "auth",
        withCredentials: true,
        data: {
          config: {
            withCredentials: true,
            header: {
              "Set-Cookie": access_token,
            },
          },
          method: "GET",
          url: BASEurl + "auth",
          data: credentialsRight(),
          withCredentials: true,
        },
      });

      const res = await getData(makeObjToSend);

      expect.assertions(1);
      // 200
      expect(res.status).toBe(200);
      // token
      expect(res.data.token).toHaveLength(res.data.token.length);
      // id
      expect(res.data.id).toHaveLength(res.data.id.length);
    });
  });
});
