/**
 * @desc Utility that returns test credentials
 */
require("dotenv").config({ path: __dirname + "/.env" });

const userTestEmail = process.env.TEST_USER_EMAIL;
const userTestPass = process.env.TEST_USER_PASS;
const userTestToken = process.env.TEST_TOKEN;

const credentialsRight: Function = (): object => {
  return {
    email: userTestEmail,
    password: userTestPass,
  };
};

const credentialsWrongPass: Function = (): object => {
  return {
    email: userTestEmail,
    password: userTestPass + "1",
  };
};

const credentialsWrongEmail: Function = (): object => {
  return {
    email: userTestEmail + "1",
    password: userTestPass,
  };
};

const testToken: Function = (): string | undefined => {
  return userTestToken;
};

export {
  credentialsRight,
  credentialsWrongEmail,
  credentialsWrongPass,
  testToken,
};
