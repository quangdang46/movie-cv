import { API_KEY } from "../api/configApi";
import axios from "../configAxios/axios";
const fetchMovies = async (type, page) => {
  const response = await axios.get(
    `/movie/${type}?api_key=${API_KEY}&language=en-US` +
      (page ? `&page=${page}` : "")
  );
  return response.data;
};
const getGenres = async () => {
  // https://api.themoviedb.org/3/genre/movie/list?api_key=a8ee03e8420a8c4b12cd8edf16b4a3aa&language=en-US
  // /genre/movie/list?api_key=${API_KEY}&language=en-US
  const movieGenres = (
    await axios.get(`/genre/movie/list?api_key=${API_KEY}&language=en-US`)
  ).data.genres;
  const tvGenres = (
    await axios.get(`/genre/tv/list?api_key=${API_KEY}&language=en-US`)
  ).data.genres;

  return {
    movieGenres,
    tvGenres,
  };
};

const getListMovie = async (type, page) => {
  const response = await Promise.all([
    axios.get(
      `/movie/${type}?api_key=${API_KEY}&language=en-US` +
        (page ? `&page=${page}` : "")
    ),
    axios.get(`/genre/movie/list?api_key=${API_KEY}&language=en-US`),
  ]);
  const movieInfo = response.reduce((final, current, index) => {
    switch (index) {
      case 0:
        const { page, results, total_pages, total_results } = current.data;
        final.detail = { page, results, total_pages, total_results };
        break;
      case 1:
        const { genres } = current.data;
        final.genres = genres;
        break;
      default:
        break;
    }
    return final;
  }, {});
  const { detail, genres } = movieInfo;
  const mappingMovies = detail.results?.map((movie, index) => {
    const genresList = movie.genre_ids.map((id) => {
      return genres.find((item) => item.id === id);
    });
    return {
      ...movie,
      genres: genresList,
    };
  });
  return {
    detail: {
      ...detail,
      results: mappingMovies,
    },
    genres,
  };
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
const getExploreMovie = async (page, config = {}) => {
  const data = (
    await axios.get(`/discover/movie?api_key=${API_KEY}&language=en-US`, {
      params: {
        ...config,
        page,
      },
    })
  ).data;
  const adjustedItems = data.results
    .filter((item) => item.poster_path)
    .map((item) => ({
      ...item,
      media_type: "movie",
    }));

  return {
    ...data,
    results: adjustedItems,
  };
};

export {
  getSearchResult,
  fetchMovies,
  getWatchMovie,
  getSearchKeyword,
  getMovieFullDetail,
  getListMovie,
  getGenres,
  getExploreMovie,
};
