export default {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.tsx?$': 'ts-jest', // Transpile TypeScript files
    '^.+\\.jsx?$': 'babel-jest', // Transpile JavaScript or JSX files
  },
  moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx'],
  setupFilesAfterEnv: ['<rootDir>/setupTests.ts'],
};
