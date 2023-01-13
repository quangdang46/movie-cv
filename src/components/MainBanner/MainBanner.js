import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { IMAGE_URL } from "../../api/configApi";
import { openModal } from "../../redux/modalSlice";
import { InfoIcon, PlayIcon } from "../Icon";
import { Image } from "../Lazy";
// banner
const MainBanner = ({ randomMovies }) => {
  const [movie, setMovie] = useState(null);

  const showModal = useSelector((state) => state.modal.showModal);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    setMovie(randomMovies[Math.floor(Math.random() * randomMovies.length - 1)]);
  }, [randomMovies]);
  if (movie && movie.id) {
    localStorage.setItem("movieTrailer", movie?.id);
  }
  const handlePlayModal = () => {
    dispatch(openModal(!showModal));
  };
  return (
    <div className="flex flex-col space-y-2 py-16 md:space-y-4 lg:h-[65vh] lg:justify-end lg:pb-12">
      <div className="absolute top-0 left-0 -z-10 h-[100vh] w-screen">
        <Image
          lazy_src={`${IMAGE_URL}/w500${
            movie?.backdrop_path || movie?.poster_path
          }`}
          className="w-full h-full object-cover"
        ></Image>
      </div>

      <h1 className="text-2xl font-bold md:text-4xl lg:text-7xl">
        {movie?.title || movie?.name || movie?.original_name || "Netflix"}
      </h1>
      <p className="max-w-xs text-xs md:max-w-lg md:text-lg lg:max-w-2xl lg:text-2xl">
        {movie?.overview ||
          "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Tempore distinctio, ratione optio facilis ipsum laborum odio laboriosam in eligendi impedit, beatae tenetur dolor placeat obcaecati doloremque quasi soluta, quos vitae. "}
      </p>
      <div className="flex space-x-3">
        <button
          className="flex items-center gap-x-2 rounded px-5 py-1.5 text-sm font-semibold transition hover:opacity-75 md:py-2.5 md:px-8 md:text-xl bg-white text-black"
          onClick={handlePlayModal}
        >
          <PlayIcon></PlayIcon>
          <span>Watch trailer</span>
        </button>

        <button
          className="flex items-center gap-x-2 rounded px-5 py-1.5 text-sm font-semibold transition hover:opacity-75 md:py-2.5 md:px-8 md:text-xl bg-[gray]/70"
          onClick={() => {
            navigate(`/movies/${movie?.id}`);
          }}
        >
          <InfoIcon></InfoIcon>
          <span>More Info</span>
        </button>
      </div>
    </div>
  );
};

export default MainBanner;
