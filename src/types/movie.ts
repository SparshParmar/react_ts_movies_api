export interface Movie {
  id: number;
  name: string;
  image: {
    medium?: string;
    original?: string;
  };
  rating: {
    average?: number;
  };
  summary: string;
}

export interface MovieSearchResult {
  score: number;
  show: Movie;
}

export interface MoviesState {
  selectedMovies: Movie[];
  searchResults: MovieSearchResult[];
  loading: boolean;
  error: string | null;
} 