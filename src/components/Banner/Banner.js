import React from "react";
import { IMAGE_URL } from "../../api/configApi";
import { useGetDetailsMovie } from "../../hooks/useGetDetailsMovie";
// fix responsive
const Banner = ({ movie, genreList }) => {
  const { poster_path, title, genres, release_date, backdrop_path, overview } =
    useGetDetailsMovie({
      movie,
      genreList,
    });
  return (
    <div
      className="flex items-center mt-4 bg-black/10 bg-blend-multiply rounded-3xl h-80 overflow-hidden bg-cover bg-center p-5 sm:p-10 text-white relative "
      style={{
        backgroundImage:
          'url("' + IMAGE_URL + "/original" + backdrop_path + '")',
      }}
    >
      <div className="overlay absolute inset-0 bg-gradient-to-t from-[rgba(0,0,0,0.5)] to-[rgba(0,0,0,0.5)] rounded-lg"></div>
      <div className="flex items-center gap-x-[30px] rounded-lg absolute z-50">
        <div className="h-[250px] w-[200px] lg:w-[250px] rounded-lg  hidden md:block">
          <img
            src={`${IMAGE_URL}/w500/${poster_path}`}
            alt=""
            className="w-full h-full object-cover rounded-lg"
          />
        </div>
        <div className="p-2 sm:p-4">
          <h1 className="capitalize text-2xl font-bold">{title}</h1>
          <p className="mt-2">{release_date}</p>
          <p className="mt-2 leading-6 max-w-md hidden sm:block">{overview}</p>
          <div className="mt-2 flex items-center gap-x-2">
            {genres.length > 0 &&
              genres.map((genre) => (
                <span
                  className="py-1 px-2 bg-[#cfcfcf5e] rounded-md"
                  key={genre.id}
                >
                  {genre.name}
                </span>
              ))}
          </div>
          <div className="mt-5 flex items-stretch gap-x-3">
            <button className="bg-[#cfcfcf5e] px-6 py-2 xl:px-8 xl:py-3 rounded-lg text-xl font-sans">
              Trailer
            </button>
            <button className="bg-primary px-6 py-2 xl:px-8 xl:py-3 rounded-lg text-xl font-sans">
              Watch Movie
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
