import React from "react";
import { IMAGE_URL } from "../../api/configApi";
import { useGetDetailsMovie } from "../../hooks/useGetDetailsMovie";
import { Button } from "../Button";
import { StarIcon } from "../Icon";
import { Image } from "../Image";

const MovieCard = ({ movie, genreList, id }) => {
  const { poster_path, title, genres, vote_average } = useGetDetailsMovie({
    movie,
    genreList,
  });
  return (
    <div className="flex flex-col dark:border-zinc-600 p-4 rounded-xl h-full bg-zinc-700">
      <div className="h-[200px]">
        <Image
          lazy_src={`${IMAGE_URL}/w500/${poster_path}`}
          className="w-full h-full object-cover rounded-xl"
        ></Image>
      </div>
      <div className="mt-3 text-center flex flex-col flex-1">
        <p className="font-bold text-sm text-shadow-sm">{title}</p>
        {genreList && (
          <div className="mt-2 flex items-center gap-1 justify-center flex-wrap">
            {genres.length > 0 &&
              genres.map((genre) => (
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
          <span className="font-bold text-base">{vote_average}</span>
          <StarIcon></StarIcon>
        </div>
        <Button id={id}></Button>
      </div>
    </div>
  );
};

export default MovieCard;
