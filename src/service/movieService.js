import { API_KEY } from "../api/configApi";
import axios from "../configAxios/axios";
const fetchMovies = async (type, page) => {
  const response = await axios.get(
    `/movie/${type}?api_key=${API_KEY}&language=en-US` +
      (page ? `&page=${page}` : "")
  );
  return response.data;
};

const getListMovie = async (type, page) => {
  const response = await Promise.all([
    axios.get(
      `/movie/${type}?api_key=${API_KEY}&language=en-US` +
        (page ? `&page=${page}` : "")
    ),
  ]);
  const movieInfo = response.reduce((final, current, index) => {
    switch (index) {
      case 0:
        const { page, results, total_pages, total_results } = current.data;
        final.detail = { page, results, total_pages, total_results };
        break;
      default:
        break;
    }
    return final;
  }, {});
  return movieInfo;
};

const getMovieFullDetail = async (movieId) => {
  const response = await Promise.all([
    axios.get(`/movie/${movieId}?api_key=${API_KEY}&language=en-US`),
    axios.get(`/movie/${movieId}/credits?api_key=${API_KEY}&language=en-US`),
    axios.get(`/movie/${movieId}/reviews?api_key=${API_KEY}&language=en-US`),
    axios.get(`/movie/${movieId}/similar?api_key=${API_KEY}&language=en-US`),
    axios.get(`/movie/${movieId}/videos?api_key=${API_KEY}&language=en-US`),
    // https://api.themoviedb.org/3/movie/550/images?api_key=THE_KEY
    axios.get(`/movie/${movieId}/images?api_key=${API_KEY}`),
  ]);

  const movieInfo = response.reduce((final, current, index) => {
    switch (index) {
      case 0:
        final.detail = { ...current.data, media_type: "movie" };
        break;

      case 1:
        final.credits = current.data.cast;
        break;

      case 2:
        // final.reviews = current.data.results.filter(
        //   (item) => item.author !== "MSB"
        // );
        final.reviews = current.data.results;
        break;
      case 3:
        final.similar = current.data.results.map((item) => ({
          ...item,
          media_type: "movie",
        }));
        break;

      case 4:
        final.videos = current.data.results
          .filter((item) => item.site === "YouTube")
          .reduce((acc, current) => {
            if (current.type === "Trailer") return [current, ...acc];
            else return [...acc, current];
          }, []);
        break;
      case 5:
        final.posters = current.data.posters
          .slice(0, 12)
          .filter((item) => (item.type = "poster"))
          .reduce((acc, current) => {
            return [...acc, current];
          }, []);
        break;
      default:
        break;
    }

    return final;
  }, {});

  return movieInfo;
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
const getSearchKeyword = async (query) => {
  return (
    await axios.get(`/search/keyword?api_key=${API_KEY}&language=en-US`, {
      params: {
        query,
      },
    })
  ).data.results
    .map((item) => item.name)
    .filter((_, index) => index < 5);
};
export {
  getSearchResult,
  fetchMovies,
  getWatchMovie,
  getSearchKeyword,
  getMovieFullDetail,
  getListMovie,
};
