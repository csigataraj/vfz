import { create } from "zustand";
import { MediaQuery } from "./interfaces/media";


interface MediaQueryStore {
  query: MediaQuery;
  search: (text: string) => void;
  selectType: (name: string) => void;
  selectGenre: (name: string) => void;
}

const useMediaQueryStore = create<MediaQueryStore>((set) => ({
  query: {},
  search: (searchText: string) => set(() => ({ query: { searchText } })),
  selectGenre: (genre: string) => set((store) => ({ query: { ...store.query, genre } })),
  selectType: (type: string) =>  set((store) => ({ query: { ...store.query, type } })),
}));

export default useMediaQueryStore;
