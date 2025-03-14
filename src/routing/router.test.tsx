import { render, screen } from '@testing-library/react';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';
import router from './router';

function HomePage() {
  return <div data-testid="home-page">Home Page</div>;
}
function ErrorPage() {
  return <div data-testid="error-page">Error Page</div>;
}
function MediaDetailPage() {
  return <div data-testid="media-detail-page">Media Detail Page</div>;
}

jest.mock('../pages/HomePage', () => HomePage);
jest.mock('../pages/ErrorPage', () => ErrorPage);
jest.mock('../pages/MediaDetailPage', () => MediaDetailPage);

describe('Router Configuration', () => {
  it('renders the Layout and HomePage for the root route', () => {
    const memoryRouter = createMemoryRouter(router.routes, {
      initialEntries: ['/'],
    });

    render(<RouterProvider router={memoryRouter} />);

    expect(screen.getByTestId('home-page')).toBeInTheDocument();
  });

  it('renders the Layout and MediaDetailPage for a valid id route', () => {
    const memoryRouter = createMemoryRouter(router.routes, {
      initialEntries: ['/123'],
    });

    render(<RouterProvider router={memoryRouter} />);

    expect(screen.getByTestId('media-detail-page')).toBeInTheDocument();
  });

  it('renders the ErrorPage for an invalid route', () => {
    const memoryRouter = createMemoryRouter(router.routes, {
      initialEntries: ['/unknown/route'],
    });

    render(<RouterProvider router={memoryRouter} />);

    expect(screen.getByTestId('error-page')).toBeInTheDocument();
  });
});
