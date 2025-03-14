import { render, screen, fireEvent } from '@testing-library/react';
import FavoritesSwitch from './FavoritesSwitch';
import { useMediaQueryStore } from '../store';

jest.mock('../store', () => ({
  useMediaQueryStore: jest.requireActual('zustand').create(() => ({
    query: { showFavorites: false },
    toggleFavorites: jest.fn(),
  })),
}));

describe('FavoritesSwitch Component', () => {
  let mockToggleFavorites: jest.Mock;

  beforeEach(() => {
    const store = useMediaQueryStore.getState();
    mockToggleFavorites = jest.fn();

    store.query = { showFavorites: false };
    store.toggleFavorites = mockToggleFavorites;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render the switch with default unchecked state', () => {
    render(<FavoritesSwitch />);

    const switchElement = screen.getByRole('checkbox');
    expect(switchElement).toBeInTheDocument();
    expect(switchElement).not.toBeChecked();
    expect(screen.getByText('Show Favorites')).toBeInTheDocument();
  });

  it('should render the switch checked when showFavorites is true', () => {
    useMediaQueryStore.setState({ query: { showFavorites: true } });

    render(<FavoritesSwitch />);

    const switchElement = screen.getByRole('checkbox');
    expect(switchElement).toBeChecked();
    expect(screen.getByText('Show All')).toBeInTheDocument();
  });

  it('should call toggleFavorites with the correct value when the switch is toggled', () => {
    render(<FavoritesSwitch />);

    const switchElement = screen.getByRole('checkbox');
    expect(switchElement).not.toBeChecked();

    fireEvent.click(switchElement);

    expect(mockToggleFavorites).toHaveBeenCalledTimes(1);
    expect(mockToggleFavorites).toHaveBeenCalledWith(true);
  });

  it("should display 'Show Favorites' when showFavorites is false", () => {
    useMediaQueryStore.setState({ query: { showFavorites: false } });

    render(<FavoritesSwitch />);

    expect(screen.getByText('Show Favorites')).toBeInTheDocument();
  });

  it("should display 'Show All' when showFavorites is true", () => {
    useMediaQueryStore.setState({ query: { showFavorites: true } });

    render(<FavoritesSwitch />);

    expect(screen.getByText('Show All')).toBeInTheDocument();
  });
});
