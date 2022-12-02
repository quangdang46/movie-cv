import { useEffect, useState } from "react";

export const useGetDetailsMovie = ({ movie, genreList = null }) => {
  const [genres, setGenres] = useState([]);
  const {
    title,
    vote_average,
    poster_path,
    genre_ids,
    adult,
    backdrop_path,
    id,
    original_title,
    overview,
    release_date,
  } = movie;
  useEffect(() => {
    const genre =
      genreList && genreList.filter((genre) => genre_ids.includes(genre.id));
    setGenres(genre);
  }, [genreList, genre_ids]);
  return {
    title,
    vote_average,
    poster_path,
    genre_ids,
    adult,
    backdrop_path,
    id,
    original_title,
    overview,
    release_date,
    genres,
  };
};
