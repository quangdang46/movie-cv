import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { useParams } from "react-router-dom";
import { v4 } from "uuid";
import Label from "../components/Label/Label";
import Header from "../components/layout/Header";
import List from "../components/List/List";
import { Skeleton } from "../components/Skeleton";
import { getListMovie } from "../service/movieService";
import { categories } from "../shared/const";
const itemsPerPage = 20;
const ViewAllPage = () => {
  // get slug
  const { type } = useParams();
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const [nextPage, setNextPage] = useState(1);
  const { data, isError, error } = useQuery(
    ["movieList", type, nextPage],
    () => getListMovie(type, nextPage),
    {
      keepPreviousData: true,
    }
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
      <Header></Header>
      <div className="mt-20 p-3 sm:p-10">
        <div className="p-2">
          <Label
            title={categories.find((item) => item.type === type).title}
          ></Label>
        </div>
        <div className="mt-10">
          {!detail && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 xl:grid-cols-5 gap-4 xl:gap-5">
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
              previousLabel={"Previous"}
              nextLabel={"Next"}
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
        </div>
      </div>
    </>
  );
};

export default ViewAllPage;
