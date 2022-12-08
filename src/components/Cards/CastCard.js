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
              : "https://images.unsplash.com/photo-1670258880467-211fb6642971?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&q=80"
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
