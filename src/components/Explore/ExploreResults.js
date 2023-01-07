import React from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getExploreMovie } from "../../service/movieService";
import { Image } from "../Lazy";
import { v4 } from "uuid";
import InfiniteScroll from "react-infinite-scroll-component";
import FilmItem from "../Cards/FilmItem";

const ExploreResults = ({ config }) => {
  const {
    data: movies,
    error,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery(
    ["explore-result-movie", config],
    ({ pageParam = 1 }) => getExploreMovie(pageParam, config),
    {
      getNextPageParam: (lastPage) => {
        if (lastPage.page < lastPage.total_pages) {
          return lastPage.page + 1;
        }
        return undefined;
      },
    }
  );
  if (movies?.pages.length === 0) {
    return (
      <div className="grid grid-cols-sm md:grid-cols-lg gap-x-3 md:gap-x-8 gap-y-10 mt-5">
        {Array(20)
          .fill(0)
          .map((i, _) => (
            <Image
              lazy_src="https://source.unsplash.com/random"
              key={v4()}
            ></Image>
          ))}
      </div>
    );
  }
  return (
    <InfiniteScroll
      dataLength={movies?.pages.length || 0}
      next={() => fetchNextPage()}
      hasMore={Boolean(hasNextPage)}
      loader={<div>Loading...</div>}
      endMessage={<></>}
    >
      <div className="grid grid-cols-sm md:grid-cols-lg gap-x-3 md:gap-x-8 gap-y-10 mt-5">
        {movies?.pages.length > 0 &&
          movies?.pages.map((page, index) =>
            page.results.map((item, _) => (
              <FilmItem item={item} key={v4()}></FilmItem>
            ))
          )}
      </div>
    </InfiniteScroll>
  );
};

export default ExploreResults;
