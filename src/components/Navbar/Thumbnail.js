import React from "react";
import { useState } from "react";

const Thumbnail = ({ movie }) => {
  const [currentMovie, setCurrentMovie] = useState(null);
  const [showModal, setShowModal] = useState(null);

  return (
    <div
      className={`relative h-28 min-w-[180px] cursor-pointer transition duration-200 ease-out md:h-36 md:min-w-[260px] md:hover:scale-105`}
      onClick={() => {
        setCurrentMovie(movie);
        setShowModal(true);
      }}
    >
      <img
        // src={`https://image.tmdb.org/t/p/w500${
        //   movie.backdrop_path || movie.poster_path
        // }`}
        src="https://images.unsplash.com/photo-1508138221679-760a23a2285b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80"
        alt=""
        className="rounded-sm object-cover md:rounded w-full h-full"
      />
    </div>
  );
};

export default Thumbnail;
