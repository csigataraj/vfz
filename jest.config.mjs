export default {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
    '^.+\\.jsx?$': 'babel-jest',
  },
  testMatch: [
    '**/*.test.ts', // Only include .test.ts(x) files, spec files are reserved for playwright e2e tests
    '**/*.test.tsx',
  ],
  moduleNameMapper: { '\\.css$': 'identity-obj-proxy' },
  moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx'],
  setupFilesAfterEnv: ['<rootDir>/setupTests.ts'],
};
