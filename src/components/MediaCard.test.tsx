import { render, screen, fireEvent } from '@testing-library/react';
import { useColorMode } from '@chakra-ui/react';
import { useFavoritesStore } from '../store';
import MediaCard from './MediaCard';
import { MemoryRouter } from 'react-router-dom';
import { Media } from '../interfaces/media';

jest.mock('@chakra-ui/react', () => ({
  ...jest.requireActual('@chakra-ui/react'),
  useColorMode: jest.fn(),
}));

jest.mock('../store', () => ({
  useFavoritesStore: jest.requireActual('zustand').create(() => ({
    favorites: {},
    toggleFavorite: jest.fn(),
  })),
}));

describe('MediaCard Component', () => {
  let mockToggleFavorite: jest.Mock;
  let mockFavorites: Record<string, boolean>;

  const mockMedia = {
    id: '1',
    title: 'Test Media',
    genre: 'Drama',
    type: 'movie',
    description: 'Test description',
    favorite: false,
  } as Media;

  beforeEach(() => {
    mockToggleFavorite = jest.fn();
    mockFavorites = { '1': true };

    const favoritesStore = useFavoritesStore.getState();
    favoritesStore.favorites = mockFavorites;
    favoritesStore.toggleFavorite = mockToggleFavorite;

    useFavoritesStore.setState({
      ...favoritesStore,
    });

    (useColorMode as jest.Mock).mockReturnValue({ colorMode: 'light' });

    jest.clearAllMocks();
  });

  it('should render the media title and link', () => {
    render(
      <MemoryRouter>
        <MediaCard media={mockMedia} />
      </MemoryRouter>
    );

    const link = screen.getByRole('link', { name: 'Test Media' });
    expect(link).toHaveAttribute('href', '/1');
    expect(link).toBeInTheDocument();

    const title = screen.getByText('Test Media');
    expect(title).toBeInTheDocument();
  });

  it('should render the favorite icon when the media is a favorite', () => {
    render(
      <MemoryRouter>
        <MediaCard media={mockMedia} />
      </MemoryRouter>
    );

    const favoriteIcon = screen.getByRole('img');
    expect(favoriteIcon).toBeInTheDocument();

    fireEvent.click(favoriteIcon);
    expect(mockToggleFavorite).toHaveBeenCalledTimes(1);
    expect(mockToggleFavorite).toHaveBeenCalledWith('1');
  });

  it('should render the regular star icon when the media is not a favorite', () => {
    const favoritesStore = useFavoritesStore.getState();
    favoritesStore.favorites = {};

    useFavoritesStore.setState({
      ...favoritesStore,
    });

    render(
      <MemoryRouter>
        <MediaCard media={mockMedia} />
      </MemoryRouter>
    );

    const regularIcon = screen.getByRole('img', { hidden: true });
    expect(regularIcon).toBeInTheDocument();

    fireEvent.click(regularIcon);
    expect(mockToggleFavorite).toHaveBeenCalledTimes(1);
    expect(mockToggleFavorite).toHaveBeenCalledWith('1');
  });

  it('should apply dynamic background colors based on color mode', () => {
    (useColorMode as jest.Mock).mockReturnValue({ colorMode: 'dark' });

    render(
      <MemoryRouter>
        <MediaCard media={mockMedia} />
      </MemoryRouter>
    );

    const card = screen.getByRole('region');
    expect(card).toHaveStyle('background-color: gray.700');

    (useColorMode as jest.Mock).mockReturnValue({ colorMode: 'light' });

    render(
      <MemoryRouter>
        <MediaCard media={mockMedia} />
      </MemoryRouter>
    );

    expect(card).toHaveStyle('background-color: gray.100');
  });
});
