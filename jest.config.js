export default {
  testEnvironment: "allure-jest/node",
  transform: {
    "^.+\\.js$": "babel-jest",
  },
  testTimeout: 50000,
};
