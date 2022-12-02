import React, { useContext, useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import SimpleBreadcrumbs from "../../Breadcrums/SimpleBreadcrumbs";
import { AppContext } from "../../context/AppContext";
import useDebounce from "../../hooks/useDebounce";
import { useFetchMovie } from "../../hooks/useFetchMovie";
import { LabelList } from "../Label";
import List from "../List/List";
const type = {
  UPCOMING: "upcoming",
  TOP_RATED: "top_rated",
  POPULAR: "popular",
  NOW_PLAYING: "now_playing",
  LATEST: "latest",
};
const itemsPerPage = 20;
const Popular = ({ type }) => {
  const { setIsShowRightSideBar } = useContext(AppContext);

  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const [nextPage, setNextPage] = useState(1);
  const [movies, setMovies] = useState([]);
  const [typeMovie, setTypeMovie] = useState(type || "POPULAR");
  const [filter, setFilter] = useState("");
  const filterDebounce = useDebounce(filter, 500);
  const { movieList, totalPage, totalResults } = useFetchMovie({
    category: typeMovie,
    currPage: nextPage,
  });
  useEffect(() => {
    setTypeMovie(type);
  }, [type]);

  useEffect(() => {
    setIsShowRightSideBar(false);
  }, [setIsShowRightSideBar]);

  useEffect(() => {
    if (!movieList || !totalResults) return;
    setPageCount(Math.ceil(totalResults / itemsPerPage));
  }, [itemOffset, movieList, totalResults]);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % totalResults;
    setItemOffset(newOffset);
    setNextPage(event.selected + 1);
  };
  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };
  return (
    <>
      <div className="flex mb-10">
        <div className="flex-1">
          <input
            type="text"
            className="w-full p-4 bg-slate-800 text-white outline-none"
            placeholder="Type here to search..."
            onChange={handleFilterChange}
          />
        </div>
        <button className="p-4 bg-primary text-white">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </button>
      </div>
      <SimpleBreadcrumbs></SimpleBreadcrumbs>
      <LabelList
        title="Popular movies"
        isShowAll={false}
        className="mt-3"
      ></LabelList>
      <List movies={movieList} className="mt-5"></List>
      <div className="mt-10">
        <ReactPaginate
          breakLabel="..."
          nextLabel="next >"
          onPageChange={handlePageClick}
          pageRangeDisplayed={5}
          pageCount={pageCount}
          previousLabel="< previous"
          renderOnZeroPageCount={null}
          className="pagination"
        />
      </div>
    </>
  );
};

export default Popular;
