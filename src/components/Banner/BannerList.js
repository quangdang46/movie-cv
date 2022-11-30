import React from "react";
import { useFetchMovie } from "../../hooks/useFetchMovie";
import Banner from "./Banner";

const BannerList = () => {
  const { movieList, genreList } = useFetchMovie({ category: "TOP_RATED", page: 1 });
  return (
    <>
      {movieList.length > 0 &&
        movieList.slice(3,4).map((movie) => (
          <Banner key={movie.id} movie={movie} genreList={genreList} />
        ))}
    </>
  );
};

export default BannerList;
