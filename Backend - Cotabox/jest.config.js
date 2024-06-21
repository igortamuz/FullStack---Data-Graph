require("dotenv").config({ path: ".env.test" });

module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  coverageDirectory: 'coverage',
  collectCoverage: true,
  moduleDirectories: ["node_modules", "src"],
  transform: {
    ".+\\.ts$": "ts-jest",
  },
  testMatch: ["<rootDir>/src/tests/integrations/*.(test|spec).ts"],
  restoreMocks: true,
};
