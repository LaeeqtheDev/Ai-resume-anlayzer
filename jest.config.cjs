// jest.config.cjs
module.exports = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/tests/setupTests.ts"],
  moduleNameMapper: {
    "^~/(.*)$": "<rootDir>/app/$1",
  },
};
