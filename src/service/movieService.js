import { API_KEY } from "../api/configApi";
import axios from "../configAxios/axios";
const fetchMovies = async (type, page) => {
  return await axios.get(
    `/movie/${type}?api_key=${API_KEY}&language=en-US` +
      (page ? `&page=${page}` : "")
  );
};

const fetchGenreMovie = async () => {
  return await axios.get(`/genre/movie/list?api_key=${API_KEY}&language=en-US`);
};

const fetchMovieById = async (id) => {
  return await axios.get(`/movie/${id}?api_key=${API_KEY}&language=en-US`);
};
const fetchMovieMeta = async (movieId, type) => {
  return await axios.get(
    `/movie/${movieId}/${type}?api_key=${API_KEY}&language=en-US`
  );
};
export { fetchMovies, fetchGenreMovie, fetchMovieById, fetchMovieMeta };
