import React from "react";
import { useNavigate } from "react-router-dom";
import { IMAGE_URL } from "../../api/configApi";
import { StarIcon } from "../Icon";
import { Image } from "../Lazy";
import { Skeleton } from "../Skeleton";

const MovieCard = ({ detail, showGenres = true }) => {
  const navigate = useNavigate();
  if (!detail) {
    return <Skeleton className="h-[300px] rounded-lg w-auto"></Skeleton>;
  }
  return (
    <div className="flex flex-col dark:border-zinc-600 p-2 rounded-xl h-full bg-zinc-700 overflow-hidden hover:scale-105 hover:brightness-110 transition duration-300">
      {/* h-[500px] */}
      <div
        className="h-[200px] lg:h-[300px] xl:h-auto"
        onClick={() => navigate(`/movies/${detail.id}`)}
      >
        <Image
          lazy_src={
            detail.poster_path
              ? `${IMAGE_URL}/w500${detail.poster_path}`
              : `${IMAGE_URL}/w500${detail.profile_path}`
          }
          // lazy_src={`${IMAGE_URL}/w500/${detail.poster_path}`}
          className="w-full h-full object-cover rounded-xl cursor-pointer"
        ></Image>
      </div>
      <div className="mt-3 text-center flex flex-col flex-1">
        <p className="font-bold text-sm text-shadow-sm whitespace-nowrap overflow-hidden text-ellipsis transition duration-300">
          {detail.title}
        </p>
        {showGenres && detail.genres && (
          <div className="mt-2 flex items-center gap-1 justify-center flex-wrap">
            {detail.genres.length > 0 &&
              detail.genres.map((genre) => (
                <span
                  className="px-2 py-1 border-2 rounded-xl text-xs font-bold border-zinc-600 text-shadow-md"
                  key={genre.id}
                >
                  {genre.name}
                </span>
              ))}
          </div>
        )}
        <div className="flex items-center justify-center gap-x-1 text-yellow-500 mt-auto">
          <span className="font-bold text-base">
            {detail.vote_average?.toFixed(1)}
          </span>
          <StarIcon></StarIcon>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
