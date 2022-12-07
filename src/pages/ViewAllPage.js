import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import SimpleBreadcrumbs from "../Breadcrums/SimpleBreadcrumbs";
import useDebounce from "../hooks/useDebounce";
import { useFetchMovie } from "../hooks/useFetchMovie";
import { Label } from "../components/Label";
import List from "../components/List/List";
const category = {
  UPCOMING: "upcoming",
  TOPRATED: "top_rated",
  POPULAR: "popular",
  NOWPLAYING: "now_playing",
  LATEST: "latest",
};
const itemsPerPage = 20;
const ViewAllPage = () => {
  const params = window.location.pathname.split("/").filter((item) => item);
  const type = params[0].toUpperCase();

  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const [nextPage, setNextPage] = useState(1);
  const [typeMovie, setTypeMovie] = useState(type || "POPULAR");
  // const [filter, setFilter] = useState("");
  // const filterDebounce = useDebounce(filter, 500);
  const { movieList, totalPage, totalResults, genreList } = useFetchMovie({
    category: typeMovie,
    currPage: nextPage,
  });
  useEffect(() => {
    setTypeMovie(type);
  }, [type]);

  useEffect(() => {
    if (!movieList || !totalResults) return;
    setPageCount(Math.ceil(totalResults / itemsPerPage));
  }, [itemOffset, movieList, totalResults]);

  const handlePageClick = (event) => {
    if (+event.selected > 500) return;
    const newOffset = (event.selected * itemsPerPage) % totalResults;
    setItemOffset(newOffset);
    setNextPage(event.selected + 1);
  };
  // const handleFilterChange = (e) => {
  //   setFilter(e.target.value);
  // };
  return (
    <>
      {/* <div className="flex mb-10">
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
      </div> */}
      <SimpleBreadcrumbs></SimpleBreadcrumbs>
      <Label title={type} isLink={true}></Label>
      <List movies={movieList} genreList={genreList}></List>
      <div className="mt-10">
        <ReactPaginate
          breakLabel="..."
          nextLabel="next >"
          onPageChange={handlePageClick}
          pageRangeDisplayed={5}
          pageCount={pageCount > 500 ? 500 : pageCount}
          previousLabel="< previous"
          renderOnZeroPageCount={null}
          className="pagination"
        />
      </div>
    </>
  );
};

export default ViewAllPage;
