import React from "react";
import MovieCard from "../Cards/MovieCard";
import PropTypes from "prop-types";

const List = ({ movies, className = "" }) => {
  return (
    <div
      className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 xl:grid-cols-5 gap-4 xl:gap-5 ${className}`}
    >
      {movies &&
        movies.length > 0 &&
        movies.map((movie) => {
          return <MovieCard key={movie.id} detail={movie}></MovieCard>;
        })}
    </div>
  );
};
List.propTypes = {
  movies: PropTypes.array.isRequired,
  className: PropTypes.string,
};

export default List;
