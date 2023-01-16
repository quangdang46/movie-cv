import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { IMAGE_URL } from "../../api/configApi";
import { BulletIcon, StarIcon } from "../Icon";
import Image from "../Lazy/Image";
import { Skeleton } from "../Skeleton";
import PropTypes from "prop-types";

const RightSideBar = ({
  films,
  name,
  limitNumber,
  isLoading,
  className = "",
}) => {
  const navigate = useNavigate();
  return (
    <div className={className}>
      <p className="mb-6 text-xl font-medium flex justify-between items-center">
        <span className="text-black dark:text-white">{name}</span>
        <BulletIcon></BulletIcon>
      </p>
      <ul className="flex flex-col gap-5">
        {isLoading
          ? new Array(limitNumber).fill("").map((_, index) => (
              <li key={index} className="flex gap-5 items-center h-[156px]">
                <Skeleton className="shrink-0 max-w-[100px] w-full h-full rounded-md" />
                <Skeleton className="flex-grow h-[85%] rounded-md" />
              </li>
            ))
          : films?.slice(0, limitNumber).map((item) => (
              <li key={item.id}>
                <Link
                  to={`/movies/${item.id}`}
                  className="hover:brightness-75 transiton duration-300 flex gap-5 items-center"
                >
                  <div className="shrink-0 max-w-[100px] w-full">
                    <Image
                      lazy_src={
                        item.poster_path
                          ? `${IMAGE_URL}/w500${item.poster_path}`
                          : `${IMAGE_URL}/w500${item.backdrop_path}`
                      }
                      className="w-full h-full object-cover rounded-md"
                      alt="poster"
                    ></Image>
                  </div>
                  <div className="flex-grow">
                    <p className="text-black dark:text-white mb-3 text-lg">
                      {item.title || item.name}
                    </p>
                    <p className="mb-8">
                      {item.release_date || item.first_air_date}
                    </p>
                    <div className="inline-flex gap-2 items-center px-3 py-[2px] rounded-full text-primary border border-primary text-sm">
                      <span>{item.vote_average.toFixed(1)}</span>
                      <StarIcon></StarIcon>
                    </div>
                  </div>
                </Link>
              </li>
            ))}
      </ul>
      <button
        onClick={() => navigate("/explore")}
        className="bg-gray-500 dark:bg-dark-lighten py-2 w-full rounded-full mt-7 hover:brightness-75 transition duration-300 "
      >
        See more
      </button>
    </div>
  );
};
RightSideBar.propTypes = {
  films: PropTypes.array,
  name: PropTypes.string,
  limitNumber: PropTypes.number,
  isLoading: PropTypes.bool,
  className: PropTypes.string,
};

export default RightSideBar;
