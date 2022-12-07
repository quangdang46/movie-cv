import { useEffect, useState } from "react";
import { fetchMovieById } from "../service/movieService";

const useGetMovie = ({ id }) => {
  const [movie, setMovie] = useState({});
  const [backdropPath, setBackdropPath] = useState("");
  const [genres, setGenres] = useState([]);
  const [originalTitle, setOriginalTitle] = useState("");
  const [overview, setOverview] = useState("");
  const [posterPath, setPosterPath] = useState("");
  const [releaseDate, setReleaseDate] = useState("");
  const [runtime, setRuntime] = useState("");
  const [tagline, setTagline] = useState("");
  const [title, setTitle] = useState("");
  const [voteAverage, setVoteAverage] = useState("");
  const [voteCount, setVoteCount] = useState("");
  useEffect(() => {
    const fetch = async () => {
      const { data } = await fetchMovieById(id);
      if (!data) {
        return;
      }
      setMovie(data);
    };
    fetch();
  }, [id]);

  useEffect(() => {
    const {
      backdrop_path,
      genres,

      original_title,
      overview,
      poster_path,
      release_date,
      runtime,
      tagline,
      title,
      vote_average,
      vote_count,
    } = movie;
    if (!movie) {
      return;
    }
    setBackdropPath(backdrop_path);
    setGenres(genres);

    setOriginalTitle(original_title);
    setOverview(overview);
    setPosterPath(poster_path);
    setReleaseDate(release_date);
    setRuntime(runtime);
    setTagline(tagline);
    setTitle(title);
    setVoteAverage(vote_average);
    setVoteCount(vote_count);
  }, [movie]);
  return {
    backdropPath,
    genres,
    originalTitle,
    overview,
    posterPath,
    releaseDate,
    runtime,
    tagline,
    title,
    voteAverage,
    voteCount,
  };
};

export default useGetMovie;
