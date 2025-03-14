import React from 'react';
import { render, screen } from '@testing-library/react';
import { useRouteError, isRouteErrorResponse } from 'react-router-dom';
import ErrorPage from './ErrorPage';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useRouteError: jest.fn(),
  isRouteErrorResponse: jest.fn(),
}));

jest.mock('../components/NavBar', () => jest.fn(() => <div>NavBar Mock</div>));

describe('ErrorPage Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render NavBar', () => {
    render(<ErrorPage />);
    expect(screen.getByText('NavBar Mock')).toBeInTheDocument();
  });

  it("should display 'Invalid Page' when the error is a RouteErrorResponse", () => {
    (useRouteError as jest.Mock).mockReturnValue({});
    (isRouteErrorResponse as unknown as jest.Mock).mockReturnValue(true);

    render(<ErrorPage />);

    expect(screen.getByText('Oops...')).toBeInTheDocument();
    expect(screen.getByText('Invalid Page')).toBeInTheDocument();
  });

  it("should display 'Unexpected error' when the error is not a RouteErrorResponse", () => {
    (useRouteError as jest.Mock).mockReturnValue({});
    (isRouteErrorResponse as unknown as jest.Mock).mockReturnValue(false);

    render(<ErrorPage />);

    expect(screen.getByText('Oops...')).toBeInTheDocument();
    expect(screen.getByText('Unexpected error')).toBeInTheDocument();
  });

  it('should render layout components with correct structure', () => {
    render(<ErrorPage />);
    expect(
      screen.getByRole('heading', { name: 'Oops...' })
    ).toBeInTheDocument();
    expect(screen.getByText('Unexpected error')).toBeInTheDocument();
    expect(screen.getByText('NavBar Mock')).toBeInTheDocument();
  });
});
