import React from "react";
import { useState } from "react";
// banner
const MainBanner = ({ netflixOriginals }) => {
  const [movie, setMovie] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [currentMovie, setCurrentMovie] = useState(null);
  // useEffect(() => {
  //   setMovie(
  //     netflixOriginals[Math.floor(Math.random() * netflixOriginals.length)]
  //   );
  // }, [netflixOriginals]);

  return (
    <div className="flex flex-col space-y-2 py-16 md:space-y-4 lg:h-[65vh] lg:justify-end lg:pb-12">
      <div className="absolute top-0 left-0 -z-10 h-[100vh] w-screen">
        <img
          src={
            // `${IMAGE_URL}${movie?.backdrop_path || movie?.poster_path}` ||
            "https://images.unsplash.com/photo-1670189577367-2c6ef31a4b8c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&q=80"
          }
          alt=""
          className="w-full h-full object-cover"
        />
      </div>

      <h1 className="text-2xl font-bold md:text-4xl lg:text-7xl">
        {movie?.title || movie?.name || movie?.original_name || "Netflix"}
      </h1>
      <p className="max-w-xs text-xs text-shadow-md md:max-w-lg md:text-lg lg:max-w-2xl lg:text-2xl">
        {movie?.overview ||
          "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Tempore distinctio, ratione optio facilis ipsum laborum odio laboriosam in eligendi impedit, beatae tenetur dolor placeat obcaecati doloremque quasi soluta, quos vitae. "}
      </p>
      <div className="flex space-x-3">
        <button className="bannerButton bg-white text-black">
          <span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="h-4 w-4 text-black md:h-7 md:w-7"
            >
              <path
                fillRule="evenodd"
                d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z"
                clipRule="evenodd"
              />
            </svg>
          </span>
          <span>Play</span>
        </button>

        <button
          className="bannerButton bg-[gray]/70"
          onClick={() => {
            setCurrentMovie(movie);
            setShowModal(true);
          }}
        >
          <span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="h-5 w-5 md:h-8 md:w-8"
            >
              <path
                fillRule="evenodd"
                d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm8.706-1.442c1.146-.573 2.437.463 2.126 1.706l-.709 2.836.042-.02a.75.75 0 01.67 1.34l-.04.022c-1.147.573-2.438-.463-2.127-1.706l.71-2.836-.042.02a.75.75 0 11-.671-1.34l.041-.022zM12 9a.75.75 0 100-1.5.75.75 0 000 1.5z"
                clipRule="evenodd"
              />
            </svg>
          </span>
          <span>More Info</span>
        </button>
      </div>
    </div>
  );
};

export default MainBanner;
