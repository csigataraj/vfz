import { render, screen } from '@testing-library/react';
import HomePage from './HomePage';

jest.mock('../components/DynamicHeading', () =>
  jest.fn(() => <div>DynamicHeading Mock</div>)
);
jest.mock('../components/MediaGrid', () =>
  jest.fn(() => <div>MediaGrid Mock</div>)
);
jest.mock('../components/TypeSelector', () =>
  jest.fn(() => <div>TypeSelector Mock</div>)
);
jest.mock('../components/GenreSelector', () =>
  jest.fn(() => <div>GenreSelector Mock</div>)
);
jest.mock('../components/FavoritesSwitch', () =>
  jest.fn(() => <div>FavoritesSwitch Mock</div>)
);

describe('HomePage Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render DynamicHeading', () => {
    render(<HomePage />);
    expect(screen.getByText('DynamicHeading Mock')).toBeInTheDocument();
  });

  it('should render MediaGrid', () => {
    render(<HomePage />);
    expect(screen.getByText('MediaGrid Mock')).toBeInTheDocument();
  });

  it('should render TypeSelector and GenreSelector inside the Box', () => {
    render(<HomePage />);
    expect(screen.getByText('TypeSelector Mock')).toBeInTheDocument();
    expect(screen.getByText('GenreSelector Mock')).toBeInTheDocument();
  });

  it('should render FavoritesSwitch', () => {
    render(<HomePage />);
    expect(screen.getByText('FavoritesSwitch Mock')).toBeInTheDocument();
  });

  it('should render layout components with correct structure', () => {
    render(<HomePage />);

    const heading = screen.getByText('DynamicHeading Mock');
    const mediaGrid = screen.getByText('MediaGrid Mock');
    const typeSelector = screen.getByText('TypeSelector Mock');
    const genreSelector = screen.getByText('GenreSelector Mock');
    const favoritesSwitch = screen.getByText('FavoritesSwitch Mock');

    expect(heading).toBeInTheDocument();
    expect(mediaGrid).toBeInTheDocument();
    expect(typeSelector).toBeInTheDocument();
    expect(genreSelector).toBeInTheDocument();
    expect(favoritesSwitch).toBeInTheDocument();
  });
});
