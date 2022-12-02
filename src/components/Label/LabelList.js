import React, { useContext } from "react";
import { Link as RouterLink } from "react-router-dom";

import { MovieContext } from "../../context/MovieContext";
const category = {
  UPCOMING: "upcoming",
  TOP_RATED: "toprated",
  POPULAR: "popular",
  NOW_PLAYING: "nowplaying",
  LATEST: "latest",
};
const LabelList = ({ title, className = "", type, isShowAll = true }) => {
  const { prevRef, nextRef } = useContext(MovieContext);
  console.log(category[type]);
  return (
    <div className={`flex items-center justify-between ${className}`}>
      <RouterLink to={category[type] || "/"}>
        <span className="font-semibold text-gray-700 text-base dark:text-white">
          {title}
        </span>
      </RouterLink>
      {isShowAll && (
        <div className="flex items-center space-x-2 fill-gray-500">
          <span ref={prevRef} className="cursor-pointer">
            <svg
              className="pointer-events-none h-7 w-7 rounded-full border p-1 hover:border-red-600 hover:fill-red-600 dark:fill-white dark:hover:fill-red-600"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path d="M13.293 6.293L7.58 12l5.7 5.7 1.41-1.42 -4.3-4.3 4.29-4.293Z" />
            </svg>
          </span>
          <span ref={nextRef} className="cursor-pointer">
            <svg
              className="pointer-events-none h-7 w-7 rounded-full border p-1 hover:border-red-600 hover:fill-red-600 dark:fill-white dark:hover:fill-red-600"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path d="M10.7 17.707l5.7-5.71 -5.71-5.707L9.27 7.7l4.29 4.293 -4.3 4.29Z" />
            </svg>
          </span>
        </div>
      )}
    </div>
  );
};
export default LabelList;
