/* eslint-disable @typescript-eslint/no-var-requires */

const nextJest = require("next/jest");

/**
 * Setting up Jest
 * https://nextjs.org/docs/testing#setting-up-jest-with-the-rust-compiler
 *  */
const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: "./",
});

// Add any custom config to be passed to Jest
/** @type {import('jest').Config} */
const customJestConfig = {
  // Add more setup options before each test is run
  // setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  transformIgnorePatterns: ["node_modules/(?!(react-markdown))"],

  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  testEnvironment: "jest-environment-jsdom",

  moduleNameMapper: {
    "~/(.*)$": "<rootDir>/src/$1",
    "next/router": "<rootDir>/__mocks__/next/router.js",
    "react-markdown": "<rootDir>/node_modules/react-markdown/react-markdown.min.js", // There's an issue with [ESM + Jest](https://stackoverflow.com/questions/72382316/jest-encountered-an-unexpected-token-react-markdown)
  },
};

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async

module.exports = createJestConfig(customJestConfig);
