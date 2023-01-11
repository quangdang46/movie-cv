import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import SimpleBreadcrumbs from "../Breadcrums/SimpleBreadcrumbs";
import { ExploreResults, Filter, Sort } from "../components/Explore";
import { ChevronUpIcon } from "../components/Icon";
import { LeftSideBar } from "../components/SideBar";
import { useScrollUp } from "../hooks/useScrolUp";
import { useViewportView } from "../hooks/useViewportView";

const Explore = () => {
  const { isMobile } = useViewportView();
  const { isShowScrollUpBtn, scrollToTop } = useScrollUp();

  const [searchParams, setSearchParams] = useSearchParams();

  const [config, setConfig] = useState({});

  useEffect(() => {
    const sortType = searchParams.get("sort_by") || "popularity.desc";
    const fromDate = searchParams.get("from") || "1999-01-01";
    const toDate = searchParams.get("to") || "2022-04-06";
    const genres = searchParams.getAll("genre") || [];
    const minRuntime = searchParams.get("minRuntime") || 0;
    const maxRuntime = searchParams.get("maxRuntime") || 400;
    const voting = searchParams.get("vote") || 250;
    const keywords = searchParams.get("keywords") || "";

    setConfig({
      sort_by: sortType,
      "primary_release_date.gte": fromDate,
      "primary_release_date.lte": toDate,
      with_genres: genres.toString(),
      "with_runtime.gte": Number(minRuntime),
      "with_runtime.lte": Number(maxRuntime),
      "vote_count.gte": Number(voting),
      with_keywords: keywords,
      // query: keywords,
    });
  }, [searchParams]);
  return (
    <>
      {isShowScrollUpBtn && (
        <button
          onClick={scrollToTop}
          className={`fixed bottom-[30px] right-[30px] z-10 transition duration-500 ${
            isShowScrollUpBtn ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="w-[35px] h-[35px] rounded-full flex items-center justify-center bg-slate-700">
            <ChevronUpIcon />
          </div>
        </button>
      )}
      <div className="flex min-h-screen flex-col md:flex-row">
        {isMobile && (
          <SimpleBreadcrumbs
            className={"block rounded-none border-none bg-dark-lighten"}
            textLight={true}
          ></SimpleBreadcrumbs>
        )}
        {!isMobile && <LeftSideBar></LeftSideBar>}
        {isMobile && (
          <div className="mt-3 xs:m-4">
            <Sort></Sort>
            <Filter></Filter>
          </div>
        )}
        <div className="flex-grow">
          <ExploreResults config={config}></ExploreResults>
        </div>
        {!isMobile && (
          <div className="shrink-0 md:max-w-[310px] w-full pt-4 px-3">
            <Sort></Sort>
            <Filter></Filter>
          </div>
        )}
      </div>
    </>
  );
};

export default Explore;
