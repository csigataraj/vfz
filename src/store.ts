import { create } from 'zustand';
import { MediaQuery } from './interfaces/media';

interface MediaQueryStore {
  query: MediaQuery;
  search: (text: string) => void;
  selectType: (name: string) => void;
  selectGenre: (name: string) => void;
  toggleFavorites: (show: boolean) => void;
}
interface FavoritesStore {
  favorites: Record<string, boolean>; // Object where keys are media IDs
  toggleFavorite: (id: string) => void;
}

export const useMediaQueryStore = create<MediaQueryStore>((set) => ({
  query: {},
  search: (searchText: string) => set(() => ({ query: { searchText } })),
  selectGenre: (genre: string) =>
    set((store) => ({ query: { ...store.query, genre } })),
  selectType: (type: string) =>
    set((store) => ({ query: { ...store.query, type } })),
  toggleFavorites: (showFavorites: boolean) =>
    set((store) => ({ query: { ...store.query, showFavorites } })),
}));

export const useFavoritesStore = create<FavoritesStore>((set) => ({
  favorites: {},
  toggleFavorite: (id: string) =>
    set((state) => ({
      favorites: {
        ...state.favorites,
        [id]: !state.favorites[id], // Toggle favorite state
      },
    })),
}));
