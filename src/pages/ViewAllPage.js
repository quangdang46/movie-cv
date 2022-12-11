import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { useFetchMovie } from "../hooks/useFetchMovie";
import { Label } from "../components/Label";
import List from "../components/List/List";
const itemsPerPage = 20;
const ViewAllPage = () => {
  const params = window.location.pathname.split("/").filter((item) => item);
  const type = params[0].toUpperCase();

  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const [nextPage, setNextPage] = useState(1);
  const [typeMovie, setTypeMovie] = useState(type || "POPULAR");

  const { movieList,totalResults, genreList } = useFetchMovie({
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

  return (
    <>
      <Label title={type} isLink={true}></Label>
      <List movies={movieList} genreList={genreList}></List>
      <div className="mt-10">
        {/* <ReactPaginate
          breakLabel="..."
          nextLabel="next >"
          onPageChange={handlePageClick}
          pageRangeDisplayed={5}
          pageCount={pageCount > 500 ? 500 : pageCount}
          previousLabel="< previous"
          renderOnZeroPageCount={null}
          className="pagination"
        /> */}
        <ReactPaginate
          previousLabel={"previous"}
          nextLabel={"next"}
          breakLabel={"..."}
          breakClassName={"break-me"}
          pageCount={pageCount > 500 ? 500 : pageCount}
          marginPagesDisplayed={2}
          pageRangeDisplayed={2}
          onPageChange={handlePageClick}
          containerClassName={"pagination"}
          subContainerClassName={"pages pagination"}
          className="pagination"
        />
      </div>
    </>
  );
};

export default ViewAllPage;
