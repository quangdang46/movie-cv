import React from "react";
import { useRef, useState } from "react";
import { useFetchMovie } from "../../hooks/useFetchMovie";
import { Thumbnail } from "../Cards";
import { ChevronLeftIcon, ChevronRightIcon } from "../Icon";
import { Label } from "../Label";
const category = {
  UPCOMING: "upcoming",
  TOPRATED: "toprated",
  POPULAR: "popular",
  NOWPLAYING: "nowplaying",
  LATEST: "latest",
};
const Row = ({ title, type }) => {
  const rowRef = useRef(null);
  const [isMoved, setIsMoved] = useState(false);
  const { movieList } = useFetchMovie({ category: type });
  const handleClick = (direction) => {
    setIsMoved(true);
    if (rowRef.current) {
      const { scrollLeft, clientWidth } = rowRef.current;

      const scrollTo =
        direction === "left"
          ? scrollLeft - clientWidth
          : scrollLeft + clientWidth;
      rowRef.current.scrollTo({ left: scrollTo, behavior: "smooth" });
    }
  };
  return (
    <div className="h-40 space-y-0.5 md:space-y-2">
      <Label toPath={category[type]} title={title} isLink={true}></Label>
      <div className="group relative md:-ml-2">
        <span
          className={`absolute top-0 bottom-0 left-2 z-40 m-auto h-9 w-9 cursor-pointer opacity-0 transition hover:scale-125  group-hover:opacity-100 ${
            !isMoved && "hidden"
          }`}
          onClick={() => handleClick("left")}
        >
          <ChevronLeftIcon></ChevronLeftIcon>
        </span>
        <div
          className="flex items-center space-x-0.5 overflow-x-scroll scrollbar-hide md:space-x-2.5 md:p-2"
          ref={rowRef}
        >
          {movieList &&
            movieList.map((movie) => (
              <Thumbnail key={movie.id} movie={movie} />
            ))}
        </div>
        <span
          className="absolute top-0 bottom-0 right-2 z-40 m-auto h-9 w-9 cursor-pointer opacity-0 transition hover:scale-125 group-hover:opacity-100"
          onClick={() => handleClick("right")}
        >
          <ChevronRightIcon></ChevronRightIcon>
        </span>
      </div>
    </div>
  );
};

export default Row;
