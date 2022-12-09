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

const getWatchMovie = async (id) => {
  const res = await Promise.all([
    axios.get(`/movie/${id}?api_key=${API_KEY}&language=en-US`),
    axios.get(`/movie/${id}/recommendations?api_key=${API_KEY}&language=en-US`),
  ]);
  return {
    detail: res[0].data,
    recommendations: res[1].data.results.filter((item) => item.poster_path),
  };
};

export {
  fetchMovies,
  fetchGenreMovie,
  fetchMovieById,
  fetchMovieMeta,
  getWatchMovie,
};
