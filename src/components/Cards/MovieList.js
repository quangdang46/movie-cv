import React, { useState } from "react";
import { useFetchMovie } from "../../hooks/useFetchMovie";
import MovieCard from "./MovieCard";


const MovieList = ({ category = "TOP_RATED" }) => {
  const [currPage, setCurrPage] = useState(1);
  const { movieList, genreList } = useFetchMovie({
    category,
    currPage,
  });

  return (
    <div className="mt-4 grid grid-cols-4 gap-3">
      {movieList.map((movie) => (
        <MovieCard movie={movie} genreList={genreList} key={movie.id} />
      ))}
    </div>
  );
};

export default MovieList;
