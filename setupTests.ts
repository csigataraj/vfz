import '@testing-library/jest-dom';

beforeAll(() => {
  HTMLElement.prototype.scrollTo = jest.fn();
});
afterAll(() => {
  jest.resetAllMocks();
});
