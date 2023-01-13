import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { MovieCard } from "../components/Cards";
import { Image } from "../components/Lazy";

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
    <div className="flex-grow px-10 pt-5">
      <div className="flex items-center justify-between">
        <span className="uppercase text-white font-semibold text-[35px] mb-4">
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
        <div className="text-white text-2xl font-semibold w-full">
          You have no movie in your list
          <Image
            lazy_src="https://source.unsplash.com/random"
            alt="no movie"
            className="w-full h-full"
          ></Image>
        </div>
      )}
    </div>
  );
};

export default History;
