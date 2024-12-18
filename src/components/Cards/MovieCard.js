import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IMAGE_URL } from "../../api/configApi";
import { StarIcon } from "../Icon";
import { Image } from "../Lazy";
import { Skeleton } from "../Skeleton";
import PropTypes from "prop-types";

const MovieCard = ({ detail, showGenres = true, useDelete = false }) => {
  const navigate = useNavigate();
  const [isDelete, setIsDelete] = useState(false);
  if (!detail) {
    return <Skeleton className="h-[300px] rounded-lg w-auto"></Skeleton>;
  }

  const handleStorageList = (id) => {
    let storageList = localStorage.getItem("deleteList");
    if (storageList) {
      let list = JSON.parse(storageList);
      if (list.includes(id)) {
        list = list.filter((item) => item !== id);
      } else {
        list.push(id);
      }
      localStorage.setItem("deleteList", JSON.stringify(list));
    } else {
      localStorage.setItem("deleteList", JSON.stringify([id]));
    }
  };

  // get id delete from localstorage
  const handleDelete = (id) => {
    if (useDelete) {
      handleStorageList(id);
      setIsDelete(!isDelete);
    }
  };
  return (
    <div
      className={`relative flex flex-col dark:border-zinc-600 p-2 rounded-xl h-full dark:bg-zinc-700 bg-gray-500 overflow-hidden hover:scale-105 hover:brightness-110 transition duration-300 ${
        useDelete && "cursor-pointer"
      }`}
      onClick={() => handleDelete(detail.id)}
    >
      {isDelete && useDelete && (
        <div className="cursor-pointer overlay absolute inset-0 bg-gradient-to-t from-[rgba(0,0,0,0.7)] to-[rgba(0,0,0,0.5)] rounded-xl z-10"></div>
      )}
      <div className={`${useDelete && "pointer-events-none"}`}>
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
          <p className="font-bold text-sm whitespace-nowrap overflow-hidden text-ellipsis transition duration-300">
            {detail.title || detail.original_name}
          </p>
          {showGenres && detail.genres && (
            <div className="mt-2 flex items-center gap-1 justify-center flex-wrap">
              {detail.genres.length > 0 &&
                detail.genres.map((genre) => (
                  <span
                    className="px-2 py-1 border-2 rounded-xl text-xs font-bold border-gray-700 dark:border-zinc-600"
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
    </div>
  );
};
MovieCard.propTypes = {
  detail: PropTypes.object.isRequired,
  showGenres: PropTypes.bool,
  useDelete: PropTypes.bool,
};

export default MovieCard;
