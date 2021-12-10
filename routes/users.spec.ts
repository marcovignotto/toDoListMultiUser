/**
 * @desc test for the route users
 *       POST PATCH
 */

import createObj from "../__test__/utils/axiosObj";
import getData from "../__test__/utils/createObj";
import testConfigData from "../__test__/testConfig.json";

const BASEurl = testConfigData.baseUrl;

const userNameEmailGen = Math.floor(Math.random() * 999999);

const userToCreate = {
  firstName: "NAME_" + userNameEmailGen.toString().substring(0, 4),
  lastName: "LAST_" + userNameEmailGen.toString().substring(0, 4),
  email: `${userNameEmailGen}@email.com`,
  password: "12345678",
  role: "user",
};

const userToPatch = {
  firstName: "PATCHED_NAME_" + userNameEmailGen.toString().substring(0, 4),
  lastName: "PATCHED_LAST_" + userNameEmailGen.toString().substring(0, 4),
  email: `${userNameEmailGen}@patchedemail.com`,
  password: "12345678",
  role: "admin",
};

/**
 * @desc test POST 2 times
 * 1. POST a new user
 * 2. POST the same user to get an error
 * 3. PATCH the same changin some infos
 */

describe.skip("/users/ - POST - PATCH", () => {
  let idToPatch = "";

  const makeObjToSend = createObj({
    method: "POST",
    url: BASEurl + "users",
    data: {
      method: "POST",
      url: BASEurl + "users",
      data: userToCreate,
    },
  });

  it("1. POST - creates a new user > {success:true}, generated email/userName", async () => {
    const res = await getData(makeObjToSend);

    // set id to patch
    idToPatch = res.data._id;

    expect.assertions(5);

    expect(res.status).toBe(200);
    expect(res.data.success).toBe(true);
    expect(res.data.firstName).toBe(userToCreate.firstName);
    expect(res.data.lastName).toBe(userToCreate.lastName);
    expect(res.data.email).toBe(userToCreate.email);
  });

  it("2. POST - the same user registration > email error msg", async () => {
    const res = await getData(makeObjToSend);

    expect.assertions(3);

    expect(res.response.status).toBe(409);
    expect(res.response.data.success).toBe(false);
    expect(res.response.data.msg).toBe("Email already exists!");
  });

  it("3. PUT - a user >  {success:true}", async () => {
    const makeObjToSend = createObj({
      method: "PUT",
      url: BASEurl + "users",
      data: {
        method: "PUT",
        url: BASEurl + "users",
        data: { ...userToPatch, _id: idToPatch },
      },
    });
    const res = await getData(makeObjToSend);

    expect.assertions(5);

    expect(res.status).toBe(200);
    expect(res.data.success).toBe(true);
    expect(res.data.firstName).toBe(userToPatch.firstName);
    expect(res.data.lastName).toBe(userToPatch.lastName);
    expect(res.data.email).toBe(userToPatch.email);
  });
});
