import axios from 'axios';
import { MovieSearchResult } from '../types/movie';

const BASE_URL = 'https://api.tvmaze.com';

export const searchMovies = async (query: string): Promise<MovieSearchResult[]> => {
  try {
    const response = await axios.get(`${BASE_URL}/search/shows?q=${encodeURIComponent(query)}`);
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch movies');
  }
}; 