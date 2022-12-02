import React from "react";
import MovieCard from "../Cards/MovieCard";

const List = ({ movies, className = "" }) => {
  return (
    <div
      className={`grid md:grid-cols-3 xl:grid-cols-4  md:gap-5 xl:gap-10 ${className}`}
    >
      {movies &&
        movies.length > 0 &&
        movies.map((movie) => {
          return <MovieCard key={movie.id} movie={movie}></MovieCard>;
        })}
    </div>
  );
};

export default List;
