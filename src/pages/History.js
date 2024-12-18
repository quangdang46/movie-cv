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
    <div className="flex-grow xs:px-2 sm:px-5 md:px-10 pt-5">
      <div className="flex items-center justify-between">
        <span className="uppercase text-black dark:text-white font-semibold text-2xl sm:text-[35px] mb-4">
          My History
        </span>
      </div>
      {movieList && movieList.length > 0 && (
        <div className="grid grid-cols-sm md:grid-cols-lg gap-x-2 md:gap-x-5 gap-y-5 mt-5">
          {movieList.map((movie) => (
            <MovieCard
              detail={movie}
              showGenres={false}
              key={movie.id}
            ></MovieCard>
          ))}
        </div>
      )}
      {movieList.length === 0 && (
        <div className="text-black dark:text-white text-2xl font-semibold w-full">
          You have no movie in your list
        </div>
      )}
    </div>
  );
};

export default History;
