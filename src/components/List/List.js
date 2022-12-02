import React from "react";
import MovieCard from "../Cards/MovieCard";

const List = ({ movies, className = "" }) => {
  return (
    <div className={`grid grid-cols-4 gap-10 ${className}`}>
      {movies &&
        movies.length > 0 &&
        movies.map((movie) => {
          return <MovieCard key={movie.id} movie={movie}></MovieCard>;
        })}
    </div>
  );
};

export default List;
