import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Movie, MoviesState, MovieSearchResult } from '../types/movie';

const initialState: MoviesState = {
  selectedMovies: [],
  searchResults: [],
  loading: false,
  error: null,
};

const movieSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    setSearchResults: (state, action: PayloadAction<MovieSearchResult[]>) => {
      state.searchResults = action.payload;
      state.loading = false;
      state.error = null;
    },
    addSelectedMovie: (state, action: PayloadAction<Movie>) => {
      if (!state.selectedMovies.find(movie => movie.id === action.payload.id)) {
        state.selectedMovies.push(action.payload);
      }
    },
    removeSelectedMovie: (state, action: PayloadAction<number>) => {
      state.selectedMovies = state.selectedMovies.filter(
        movie => movie.id !== action.payload
      );
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const {
  setSearchResults,
  addSelectedMovie,
  removeSelectedMovie,
  setLoading,
  setError,
} = movieSlice.actions;

export default movieSlice.reducer; 