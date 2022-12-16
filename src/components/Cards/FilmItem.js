import React from "react";
import { Link } from "react-router-dom";
import { IMAGE_URL } from "../../api/configApi";
import { StarIcon } from "../Icon";
import { Image } from "../Lazy";

const FilmItem = ({ item }) => {
  return (
    <Link to={`/movies/${item.id}`}>
      <div className="shadow-sm bg-dark-darken pb-2 rounded-md overflow-hidden hover:scale-105 hover:brightness-110 transition duration-300 relative group">
        <Image
          lazy_src={
            item.poster_path
              ? `${IMAGE_URL}/w342${item.poster_path}`
              : `${IMAGE_URL}/w342${item.profile_path}`
          }
          className="object-cover w-full h-full"
        ></Image>
        <p className="whitespace-nowrap overflow-hidden text-ellipsis text-base text-gray-300 mt-1 text-center px-2 group-hover:text-white transition duration-300">
          {item.title || item.name}
        </p>
        <div className="bg-primary px-2 py-1 rounded-full absolute top-[5%] left-[8%] z-20 flex items-center gap-1 text-white text-xs">
          {item.vote_average?.toFixed(1)}
          <StarIcon></StarIcon>
        </div>
      </div>
    </Link>
  );
};

export default FilmItem;
