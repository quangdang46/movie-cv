import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import ReactPaginate from "react-paginate";
import { useNavigate } from "react-router-dom";
import { getSearchResult } from "../../service/movieService";
import { MovieCard } from "../Cards";
import Image from "../Lazy/Image";
import Skeleton from "../Skeleton/Skeleton";

const SearchResult = ({ currentTab, query, page }) => {
  const navigate = useNavigate();
  const { data, error, isPreviousData } = useQuery(
    ["search-result", currentTab, query, page],
    () => getSearchResult(currentTab, query, page),
    {
      keepPreviousData: true,
    }
  );
  if (error) return <div>ERROR: ${error.message}</div>;

  const changePageHandler = (e) => {
    if (isPreviousData) return "";
    navigate(
      `/search?query=${encodeURIComponent(query)}&page=${+e.selected + 1}`
    );
  };

  return (
    <div className="md:mt-32 mt-7 px-[2vw]">
      <p className="text-black dark:text-white md:text-xl text-lg mb-10">
        Search results for "{query}" ({data?.total_results} results found)
      </p>
      {data && data.results?.length === 0 && (
        <div className="flex flex-col items-center mb-12">
          <Image
            lazy_src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRuHWK06y8c81VfuX3R5sNXDfKWxWIOqH8C2g&usqp=CAU"
            className="w-[600px] opacity-60"
          ></Image>
          <p className="text-black dark:text-white text-3xl mt-5">There is no such films</p>
        </div>
      )}
      <ul className="grid grid-cols-sm md:grid-cols-lg gap-x-3 md:gap-x-8 gap-y-10">
        {data &&
          data.results.map((item) => (
            <li key={item.id}>
              <MovieCard detail={item} showGenres={false}></MovieCard>
            </li>
          ))}
        {!data &&
          [...new Array(15)].map((_, index) => (
            <li key={index}>
              <Skeleton className="h-0 pb-[160%]" />
            </li>
          ))}
      </ul>
      {data && (
        <ReactPaginate
          previousLabel={"Previous"}
          nextLabel={"Next"}
          breakLabel={"..."}
          breakClassName={"break-me"}
          pageCount={data.total_pages}
          marginPagesDisplayed={2}
          pageRangeDisplayed={2}
          onPageChange={changePageHandler}
          containerClassName={"pagination"}
          subContainerClassName={"pages pagination"}
          className="pagination"
        />
      )}
    </div>
  );
};
export default SearchResult;
