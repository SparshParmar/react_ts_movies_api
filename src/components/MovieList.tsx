import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../store/store';
import { removeSelectedMovie } from '../store/movieSlice';

const MovieList: React.FC = () => {
  const selectedMovies = useSelector((state: RootState) => state.movies.selectedMovies);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleRemoveMovie = (movieId: number) => {
    dispatch(removeSelectedMovie(movieId));
  };

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-4">Selected Movies</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {selectedMovies.map(movie => (
          <div key={movie.id} className="border rounded-lg p-4 shadow-sm">
            <div className="relative">
              <img
                src={movie.image?.medium || 'https://via.placeholder.com/210x295'}
                alt={movie.name}
                className="w-full h-64 object-cover rounded-md"
              />
              <button
                onClick={() => handleRemoveMovie(movie.id)}
                className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600"
              >
                ×
              </button>
            </div>
            <div className="mt-4">
              <h3
                className="text-xl font-semibold cursor-pointer hover:text-blue-600"
                onClick={() => navigate(`/movie/${movie.id}`)}
              >
                {movie.name}
              </h3>
              <div className="mt-2">
                Rating: {movie.rating?.average || 'N/A'}
              </div>
            </div>
          </div>
        ))}
      </div>
      {selectedMovies.length === 0 && (
        <p className="text-gray-500 text-center">No movies selected</p>
      )}
    </div>
  );
};

export default MovieList; 