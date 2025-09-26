import type { Config } from "jest";

const config: Config = {
  preset: "jest-preset-angular",
  setupFilesAfterEnv: ["<rootDir>/setup-jest.ts"],
  testEnvironment: "jsdom",
  moduleNameMapper: {
    '^@app/services$': '<rootDir>/src/app/services/index.ts',
    '^@app/pipes$': '<rootDir>/src/app/pipes/index.ts',
    '^@app/pages$': '<rootDir>/src/app/pages/index.ts',
    '^@app/components$': '<rootDir>/src/app/components/index.ts',
    '^@app/utils$': '<rootDir>/src/app/utils/index.ts',
    '^@app/models$': '<rootDir>/src/app/models/index.ts',
    '^@app/(.*)$': '<rootDir>/src/app/$1'
  }
};

export default config;
