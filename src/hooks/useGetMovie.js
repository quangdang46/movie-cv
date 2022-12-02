import { useEffect, useState } from "react";
import { fetchMovieById } from "../service/movieService";

const useGetMovie = (id) => {
  const [backdropPath, setBackdropPath] = useState("");
  const [genres, setGenres] = useState([]);
  const [homepage, setHomepage] = useState("");
  const [idMovie, setIdMovie] = useState("");
  const [imdbId, setImdbId] = useState("");
  const [originalTitle, setOriginalTitle] = useState("");
  const [overview, setOverview] = useState("");
  const [posterPath, setPosterPath] = useState("");
  const [productionCompanies, setProductionCompanies] = useState([]);
  const [releaseDate, setReleaseDate] = useState("");
  const [runtime, setRuntime] = useState("");
  const [revenue, setRevenue] = useState("");
  const [status, setStatus] = useState("");
  const [tagline, setTagline] = useState("");
  const [title, setTitle] = useState("");
  const [voteAverage, setVoteAverage] = useState("");
  const [voteCount, setVoteCount] = useState("");

  useEffect(() => {
    const fetch = async () => {
      const { data } = await fetchMovieById(id);
      const {
        backdrop_path,
        genres,
        homepage,
        id,
        imdb_id,
        original_title,
        overview,
        poster_path,
        production_companies,
        release_date,
        runtime,
        revenue,
        status,
        tagline,
        title,
        vote_average,
        vote_count,
      } = data;
      if (!data) {
        return;
      }
      setBackdropPath(backdrop_path);
      setGenres(genres);
      setHomepage(homepage);
      setIdMovie(id);
      setImdbId(imdb_id);
      setOriginalTitle(original_title);
      setOverview(overview);
      setPosterPath(poster_path);
      setProductionCompanies(production_companies);
      setReleaseDate(release_date);
      setRuntime(runtime);
      setRevenue(revenue);
      setStatus(status);
      setTagline(tagline);
      setTitle(title);
      setVoteAverage(vote_average);
      setVoteCount(vote_count);
    };
    fetch();
  }, [id]);

  return {
    backdropPath,
    genres,
    homepage,
    idMovie,
    imdbId,
    originalTitle,
    overview,
    posterPath,
    productionCompanies,
    releaseDate,
    runtime,
    revenue,
    status,
    tagline,
    title,
    voteAverage,
    voteCount,
  };
};
