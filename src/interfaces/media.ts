export interface Media {
    id: string;
    genre: string;
    type: "movie" | "series" | "book";
    title: string;
    description: string;
}

export interface MediaQuery {
    genre?: string;
    type?: string;
    searchText?: string;
  }