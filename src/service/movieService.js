import { API_KEY } from "../api/configApi";
import axios from "../configAxios/axios";
const fetchMovies = async (type, page) => {
  return axios.get(
    `/movie/${type}?api_key=${API_KEY}&language=en-US` +
      (page ? `&page=${page}` : "")
  );
};

const fetchGenreMovie = async () => {
  return axios.get(`/genre/movie/list?api_key=${API_KEY}&language=en-US`);
};
export { fetchMovies, fetchGenreMovie };
