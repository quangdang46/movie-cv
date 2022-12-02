import { useEffect, useState } from "react";
import { fetchGenreMovie, fetchMovies } from "../service/movieService";
const type = {
  UPCOMING: "upcoming",
  TOP_RATED: "top_rated",
  POPULAR: "popular",
  NOWPLAYING: "now_playing",
  LATEST: "latest",
};
export const useFetchMovie = ({ category, currPage = null }) => {
  const [movieList, setMovieList] = useState([]);
  const [genreList, setGenreList] = useState([]);
  const [totalPage, setTotalPage] = useState(0);
  const [totalResults, setTotalResults] = useState(0);
  useEffect(() => {
    const fetchGenre = async () => {
      const { data } = await fetchGenreMovie();
      if (data?.genres && data.genres.length > 0) {
        setGenreList(data.genres);
      }
    };
    const fetch = async () => {
      const { data } = await fetchMovies(type[category], currPage);
      const { page, results, total_pages, total_results } = data;
      setTotalResults(total_results);
      setTotalPage(total_pages);
      if (results && results.length > 0) {
        setMovieList(results);
      }
    };
    fetch();
    fetchGenre();
  }, [category, currPage]);
  return { movieList, genreList, totalPage, totalResults };
};
