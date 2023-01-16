import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useRef, useState } from "react";
import { getListMovie } from "../../service/movieService";
import { Thumbnail } from "../Cards";
import { ChevronLeftIcon, ChevronRightIcon } from "../Icon";
import { Title } from "../Text";
import PropTypes from "prop-types";

const Row = ({ title, type }) => {
  const rowRef = useRef(null);
  const [isMoved, setIsMoved] = useState(false);
  const { data, isError, error } = useQuery(["movieList", type], () =>
    getListMovie(type)
  );
  const { detail } = data || {};
  if (isError) {
    return <div>{error.message}</div>;
  }
  if (!detail || !detail.results) return <></>;

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
      <Title title={title} url={`/viewall/${type}`}></Title>
      <div className="group relative md:-ml-2">
        <div
          className={`absolute top-0 bottom-0 left-2 z-40 m-auto h-9 w-9 cursor-pointer opacity-0 transition hover:scale-125  group-hover:opacity-100 ${
            !isMoved && "hidden"
          }`}
          onClick={() => handleClick("left")}
        >
          <span>
            <ChevronLeftIcon></ChevronLeftIcon>
          </span>
        </div>
        <div
          className="flex items-center space-x-0.5 overflow-x-scroll scrollbar-hide md:space-x-2.5 md:p-2"
          ref={rowRef}
        >
          {detail &&
            detail.results?.map((movie) => (
              <Thumbnail key={movie.id} movie={movie} />
            ))}
        </div>
        <div
          className="absolute top-0 bottom-0 right-2 z-40 m-auto h-9 w-9 cursor-pointer opacity-0 transition hover:scale-125 group-hover:opacity-100"
          onClick={() => handleClick("right")}
        >
          <span>
            <ChevronRightIcon></ChevronRightIcon>
          </span>
        </div>
      </div>
    </div>
  );
};
Row.propTypes = {
  title: PropTypes.string,
  type: PropTypes.string.isRequired,
};

export default Row;
