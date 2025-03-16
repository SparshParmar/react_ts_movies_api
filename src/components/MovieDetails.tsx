import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store/store';
import { removeSelectedMovie } from '../store/movieSlice';

const MovieDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const movie = useSelector((state: RootState) =>
    state.movies.selectedMovies.find(m => m.id === Number(id))
  );

  if (!movie) {
    return (
      <div className="container mx-auto px-4 py-8">
        <p className="text-center text-xl">Movie not found</p>
        <button
          onClick={() => navigate('/')}
          className="mt-4 mx-auto block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Back to Home
        </button>
      </div>
    );
  }

  const handleDelete = () => {
    dispatch(removeSelectedMovie(movie.id));
    navigate('/');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="md:w-1/3">
            <img
              src={movie.image?.original || movie.image?.medium || 'https://via.placeholder.com/210x295'}
              alt={movie.name}
              className="w-full rounded-lg shadow-lg"
            />
          </div>
          <div className="md:w-2/3">
            <h1 className="text-3xl font-bold mb-4">{movie.name}</h1>
            <div className="mb-4">
              <span className="text-lg font-semibold">Rating: </span>
              <span className="text-lg">{movie.rating?.average || 'N/A'}</span>
            </div>
            <div className="prose max-w-none mb-6">
              <div dangerouslySetInnerHTML={{ __html: movie.summary }} />
            </div>
            <div className="flex gap-4">
              <button
                onClick={() => navigate('/')}
                className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
              >
                Back
              </button>
              <button
                onClick={handleDelete}
                className="bg-red-500 text-white px-6 py-2 rounded hover:bg-red-600"
              >
                Remove Movie
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails; 