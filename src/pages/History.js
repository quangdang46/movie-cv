import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { MovieCard } from "../components/Cards";

const History = () => {
  const user = useSelector((state) => state.auth.user);
  const [movieList, setMovieList] = useState([]);

  useEffect(() => {
    if (user) {
      if (user.recentlyWatch && user.recentlyWatch.length > 0) {
        setMovieList([...user.recentlyWatch].reverse());
      }
    }
  }, [user]);
  if (movieList.length === 0) {
    return null;
  }
  return (
    <div className="flex-grow">
      <div className="grid grid-cols-sm md:grid-cols-lg gap-x-2 md:gap-x-5 gap-y-5 mt-5">
        {movieList &&
          movieList.map((movie) => (
            <MovieCard
              detail={movie}
              showGenres={false}
              key={movie.id}
            ></MovieCard>
          ))}
      </div>
    </div>
  );
};

export default History;
