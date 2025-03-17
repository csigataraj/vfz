export interface Media {
  id: string;
  genre: string;
  year: string;
  type: 'movie' | 'series' | 'book';
  title: string;
  description: string;
  favorite: boolean;
}

export interface MediaQuery {
  genre?: string;
  type?: string;
  year?: string;
  searchText?: string;
  showFavorites?: boolean;
}
