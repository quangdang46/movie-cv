import React from "react";
import { Image } from "../Image";

const CastCard = ({ data }) => {
  const { name, character, profile_path } = data;
  return (
    <div className="">
      <div
        className="bg-[#222] rounded-lg overflow-hidden"
        style={{
          aspectRatio: "9/16",
        }}
      >
        <Image
          lazy_src={
            profile_path
              ? `https://image.tmdb.org/t/p/w500${profile_path}`
              : "https://images.unsplash.com/photo-1535704882196-765e5fc62a53?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8YW5pbWUlMjBnaXJsfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
          }
          alt={name}
          className={"w-full h-full rounded-lg object-cover"}
        />
      </div>
      <div className="mt-3">
        <p className="text-sm leading-6">{name}</p>
        <p className="text-yellow-400 text-sm">{character}</p>
      </div>
    </div>
  );
};

export default CastCard;
