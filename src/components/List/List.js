import React from "react";
import MovieCard from "../Cards/MovieCard";

const List = ({ movies, className = "" }) => {
  return (
    <div
      className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 xl:grid-cols-5 gap-2 sm:gap-3 md:gap-5 xl:gap-10 ${className}`}
    >
      {movies &&
        movies.length > 0 &&
        movies.map((movie) => {
          return <MovieCard key={movie.id} id={movie.id}></MovieCard>;
        })}
    </div>
  );
};

export default List;
