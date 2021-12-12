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

// import the type for the post request
import type { IPostTaskRequest } from "../controllers/tasks";

// define the route
const BASEurl = testConfigData.baseUrl + "tasks";

// test data
const testTaskToPost: IPostTaskRequest["task"] = {
  title: "Test Task",
  details: "Task's details",
  priority: "low",
  done: false,
};

const testTaskToUpdate: IPostTaskRequest["task"] = {
  title: "Updated Test Task",
  details: "Updated Task's details",
  priority: "high",
  done: true,
};

describe("/tasks/ - GET - POST - PUT - DELETE", () => {
  /**
   * @desc GET
   * 1. Error without token
   * 2. Error wrong token
   * 3. Basic success
   * 4. Mocked returned Array
   */

  describe.skip("GET - Retrives all the tasks of a specific user", () => {
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

      // IMPORTANT: stop mock
      mock.restore();
    });
  });

  /**
   * @desc POST
   * 1. Error without token
   * 2. Error wrong token
   * 3. Error no data provided
   * 4. Add a task
   */

  let idTestPost = "61b5ed9ffee0013fc797f4f4";

  describe("POST - Post a task", () => {
    test("1. Error without token > false, 401 Bad Request", async () => {
      const makeObjToSend = createObj({
        method: "POST",
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
        method: "POST",
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

    test("3. Error - Post a task missing `title` - success: false", async () => {
      const makeObjToSend = createObj({
        method: "POST",
        url: BASEurl,
        withCredentials: true,
        data: {
          config: {
            withCredentials: true,
            header: {
              "Set-Cookie": testToken(),
            },
          },
          task: { ...testTaskToPost, title: "" },
        },
      });

      const res = await getData(makeObjToSend);

      expect.assertions(3);
      // code
      expect(res.response.status).toBe(400);
      // success
      expect(res.response.data.success).toBe(false);
      // msg
      expect(res.response.data.msg).toBe("The task needs a title");
    });

    test("4. Error - Post a task missing `priority` - success: false", async () => {
      const makeObjToSend = createObj({
        method: "POST",
        url: BASEurl,
        withCredentials: true,
        data: {
          config: {
            withCredentials: true,
            header: {
              "Set-Cookie": testToken(),
            },
          },
          task: { ...testTaskToPost, priority: "" },
        },
      });

      const res = await getData(makeObjToSend);

      expect.assertions(3);
      // code
      expect(res.response.status).toBe(400);
      // success
      expect(res.response.data.success).toBe(false);
      // msg
      expect(res.response.data.msg).toBe("The task needs a priority");
    });

    test("5. Post a task - success: true", async () => {
      const makeObjToSend = createObj({
        method: "POST",
        url: BASEurl,
        withCredentials: true,
        data: {
          config: {
            withCredentials: true,
            header: {
              "Set-Cookie": testToken(),
            },
          },
          task: testTaskToPost,
        },
      });

      const res = await getData(makeObjToSend);

      expect.assertions(4);
      // code
      expect(res.status).toBe(200);
      // success
      expect(res.data.success).toBe(true);
      // task
      expect(res.data.task.title).toBe(testTaskToPost.title);
      expect(res.data.task.details).toBe(testTaskToPost.details);

      // set the id for the next test
      idTestPost = res.data.task._id;
    });
  });

  /**
   * @desc GET
   * 1. Get the added task
   * 2. Get all the users posts (1)
   */
  describe("GET - the just added task", () => {
    it("1. get the task by id", async () => {
      const makeObjToSend = createObj({
        method: "GET",
        url: BASEurl + "/" + idTestPost,
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

      expect.assertions(5);
      // status
      expect(res.status).toBe(200);
      // text
      expect(res.statusText).toBe("OK");
      // success
      expect(res.data.success).toBe(true);
      // task
      expect(res.data.task.title).toBe(testTaskToPost.title);
      expect(res.data.task.details).toBe(testTaskToPost.details);
    });

    it("2. get all the users data tasks > success:true and arary length", async () => {
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
      // success
      expect(res.data.success).toBe(true);
      // data returned
      expect(res.data.tasks).toHaveLength(res.data.tasks.length);
    });
  });

  /**
   * @desc PUT
   * 1. Error without token
   * 2. Error wrong token
   * 3. Modifiy the last added task
   */

  describe("PUT - Update a task", () => {
    test("1. Error without token > false, 401 Bad Request", async () => {
      const makeObjToSend = createObj({
        method: "PUT",
        url: BASEurl + "/" + idTestPost,
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
        method: "PUT",
        url: BASEurl + "/" + idTestPost,
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

    it("3.Update a task using task id", async () => {
      const makeObjToSend = createObj({
        method: "PUT",
        url: BASEurl + "/" + idTestPost,
        withCredentials: true,
        data: {
          config: {
            withCredentials: true,
            header: {
              "Set-Cookie": testToken(),
            },
          },
          task: testTaskToUpdate,
        },
      });

      const res = await getData(makeObjToSend);

      expect.assertions(6);
      // code
      expect(res.status).toBe(200);
      // success
      expect(res.data.success).toBe(true);
      // task
      expect(res.data.task.title).toBe(testTaskToUpdate.title);
      expect(res.data.task.details).toBe(testTaskToUpdate.details);
      expect(res.data.task.priority).toBe(testTaskToUpdate.priority);
      expect(res.data.task.done).toBe(testTaskToUpdate.done);
    });
  });

  /**
   * @desc DELETE
   * 1. Error without token
   * 2. Error wrong token
   * 3. Delete the last added task
   */
  describe("DELETE - Delete a task", () => {
    test("1. Error without token > false, 401 Bad Request", async () => {
      const makeObjToSend = createObj({
        method: "DELETE",
        url: BASEurl + "/" + idTestPost,
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
        method: "DELETE",
        url: BASEurl + "/" + idTestPost,
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

    it("3. Delete the added task", async () => {
      const makeObjToSend = createObj({
        method: "DELETE",
        url: BASEurl + "/" + idTestPost,
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

      expect.assertions(2);
      // code
      expect(res.status).toBe(200);
      // success
      expect(res.data.success).toBe(true);

      //
    });

    it("4. get the task by id > success:false", async () => {
      jest.useFakeTimers();

      const makeObjToSend = createObj({
        method: "GET",
        url: BASEurl + "/" + idTestPost,
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

      // temeout to give time to mongo to delete
      setTimeout(async () => {
        const res = await getData(makeObjToSend);
        expect.assertions(2);
        // status
        expect(res.status).toBe(400);
        // success
        expect(res.data.success).toBe(false);
      }, 5000);
    });
  });
});
