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

const getSearchResult = async (typeSearch, query, page) => {
  const data = (
    await axios.get(`/search/${typeSearch}?api_key=${API_KEY}&language=en-US`, {
      params: {
        query,
        page,
      },
    })
  ).data;

  const results = data.results
    .map((item) => ({
      ...item,
      ...(typeSearch !== "multi" && { media_type: typeSearch }),
    }))
    .filter((item) => item.poster_path || item.profile_path);

  return {
    ...data,
    results,
  };
};

export {
  getSearchResult,
  fetchMovies,
  fetchGenreMovie,
  fetchMovieById,
  fetchMovieMeta,
  getWatchMovie,
};
