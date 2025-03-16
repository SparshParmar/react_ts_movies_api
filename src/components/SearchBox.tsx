import React, { useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import debounce from 'lodash/debounce';
import { searchMovies } from '../services/movieApi';
import { setSearchResults, setLoading, setError, addSelectedMovie } from '../store/movieSlice';
import { RootState } from '../store/store';
import { Movie } from '../types/movie';

const SearchBox: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const dispatch = useDispatch();
  const { searchResults, loading } = useSelector((state: RootState) => state.movies);

  const debouncedSearch = useCallback(
    debounce(async (query: string) => {
      if (!query.trim()) {
        dispatch(setSearchResults([]));
        return;
      }

      dispatch(setLoading(true));
      try {
        const results = await searchMovies(query);
        dispatch(setSearchResults(results));
      } catch (error) {
        dispatch(setError('Failed to fetch movies'));
      }
    }, 300),
    []
  );

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    debouncedSearch(value);
  };

  const handleSelectMovie = (movie: Movie) => {
    dispatch(addSelectedMovie(movie));
    setSearchTerm('');
    dispatch(setSearchResults([]));
  };

  return (
    <div className="relative w-full max-w-md mx-auto">
      <input
        type="text"
        value={searchTerm}
        onChange={handleSearchChange}
        placeholder="Search for movies..."
        className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      />
      {loading && (
        <div className="mt-2 text-gray-600">Loading...</div>
      )}
      {searchResults.length > 0 && searchTerm && (
        <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto">
          {searchResults.map(({ show }) => (
            <div
              key={show.id}
              onClick={() => handleSelectMovie(show)}
              className="p-3 hover:bg-gray-100 cursor-pointer text-gray-800 border-b border-gray-100 last:border-b-0"
            >
              <div className="font-medium">{show.name}</div>
              {show.rating?.average && (
                <div className="text-sm text-gray-600">Rating: {show.rating.average}</div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBox; 