import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { Label } from "../components/Label";
import List from "../components/List/List";
import { useQuery } from "@tanstack/react-query";
import { getListMovie } from "../service/movieService";
import { v4 } from "uuid";
import { Skeleton } from "../components/Skeleton";
const itemsPerPage = 20;
const typex = {
  UPCOMING: "upcoming",
  TOPRATED: "top_rated",
  POPULAR: "popular",
  NOWPLAYING: "now_playing",
  LATEST: "latest",
};
const ViewAllPage = () => {
  const params = window.location.pathname.split("/").filter((item) => item);
  const type = params[0].toUpperCase();

  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const [nextPage, setNextPage] = useState(1);
  const { data, isError, error } = useQuery(["movieList", type, nextPage], () =>
    getListMovie(typex[type], nextPage)
  );
  const { detail } = data || {};
  useEffect(() => {
    if (!detail?.results || !detail?.total_results) return;
    setPageCount(Math.ceil(detail.total_results / itemsPerPage));
  }, [itemOffset, detail?.results, detail?.total_results, detail]);

  if (isError) {
    return <div>{error.message}</div>;
  }
  const handlePageClick = (event) => {
    if (+event.selected > 500) return;
    const newOffset = (event.selected * itemsPerPage) % detail.total_result;
    setItemOffset(newOffset);
    setNextPage(+event.selected + 1);
  };
  return (
    <>
      <Label title={type} isLink={true}></Label>
      {!detail && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 xl:grid-cols-5 gap-2 sm:gap-3 md:gap-5 xl:gap-10">
          {Array(20)
            .fill(0)
            .map((item, index) => (
              <Skeleton
                key={v4()}
                className="w-full h-64 sm:h-80 md:h-96 xl:h-112 block"
              ></Skeleton>
            ))}
        </div>
      )}
      {detail && detail.results && detail.results.length > 0 && (
        <List movies={detail.results}></List>
      )}
      <div className="mt-10">
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
