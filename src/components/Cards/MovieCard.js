import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useNavigate } from "react-router-dom";
import { IMAGE_URL } from "../../api/configApi";
import { getMovieFullDetail } from "../../service/movieService";
import { Button } from "../Button";
import { StarIcon } from "../Icon";
import { Image } from "../Image";
import { Skeleton } from "../Skeleton";

const MovieCard = ({ id }) => {
  const navigate = useNavigate();
  const { data, isError, error } = useQuery(["movieDetail", id], () =>
    getMovieFullDetail(id)
  );
  if (isError) {
    return <div>{error.message}</div>;
  }
  if (!data) {
    return <Skeleton className="h-[300px] rounded-lg w-auto"></Skeleton>;
  }
  const { detail } = data;
  return (
    <div className="flex flex-col dark:border-zinc-600 p-4 rounded-xl h-full bg-zinc-700">
      <div className="h-[200px]" onClick={() => navigate(`/watch/${id}`)}>
        <Image
          lazy_src={`${IMAGE_URL}/w500/${detail.poster_path}`}
          className="w-full h-full object-cover rounded-xl cursor-pointer"
        ></Image>
      </div>
      <div className="mt-3 text-center flex flex-col flex-1">
        <p className="font-bold text-sm text-shadow-sm">{detail.title}</p>
        {detail.genres && (
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
        <div className="flex items-center justify-center gap-x-1 text-yellow-500 mt-2">
          <span className="font-bold text-base">{detail.vote_average}</span>
          <StarIcon></StarIcon>
        </div>
        <Button id={id}></Button>
      </div>
    </div>
  );
};

export default MovieCard;
