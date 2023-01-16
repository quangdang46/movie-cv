import { useAutoAnimate } from "@formkit/auto-animate/react";
import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { ChevronDownIcon, ChevronRightIcon } from "../components/Icon";
import { SearchResult } from "../components/SearchBox";
import SearchBox from "../components/SearchBox/SearchBox";
import { useViewportView } from "../hooks/useViewportView";
const SearchPage = () => {
  const { isMobile, width } = useViewportView();
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("query");
  const page = searchParams.get("page") || 1;
  const [parent] = useAutoAnimate();
  const [currentTab, setCurrentTab] = useState("multi");
  const [openSearchFilter, setOpenSearchFilter] = useState(true);

  const QueryBox = ({ query, currentTab }) => {
    return (
      <div className="md:py-6 py-2 border-t border-gray-800 dark:border-dark-darken text-black dark:text-white text-lg flex md:flex-col flex-row gap-3">
        <button
          onClick={() => {
            setSearchParams({ query: query || "", page: "1" });
            setCurrentTab("multi");
          }}
          className={`w-full hover:bg-gray-600 dark:hover:bg-dark-lighten-2  py-1 rounded-md transition duration-300 ${
            currentTab === "multi" && "bg-gray-600 dark:bg-dark-lighten-2"
          }`}
        >
          <span>All</span>
        </button>
        <button
          onClick={() => {
            setSearchParams({ query: query || "", page: "1" });
            setCurrentTab("movie");
          }}
          className={`w-full hover:bg-gray-600 dark:hover:bg-dark-lighten-2  py-1 rounded-md transition duration-300 ${
            currentTab === "movie" && "bg-gray-600 dark:bg-dark-lighten-2"
          }`}
        >
          <span>Movie</span>
        </button>
        {/* <button
          onClick={() => {
            setSearchParams({ query: query || "", page: "1" });
            setCurrentTab("tv");
          }}
          className={`w-full hover:bg-gray-600 dark:hover:bg-dark-lighten-2  py-1 rounded-md transition duration-300 ${
            currentTab === "tv" && "bg-gray-600 dark:bg-dark-lighten-2"
          }`}
        >
          <span>TV Show</span>
        </button> */}
        <button
          onClick={() => {
            setSearchParams({ query: query || "", page: "1" });
            setCurrentTab("person");
          }}
          className={`w-full hover:bg-gray-600 dark:hover:bg-dark-lighten-2  py-1 rounded-md transition duration-300 ${
            currentTab === "person" && "bg-gray-600 dark:bg-dark-lighten-2"
          }`}
        >
          <span>People</span>
        </button>
      </div>
    );
  };

  return (
    <>
      <div className="flex-grow">
        <div
          className={`relative z-30 md:max-w-[50vw] w-full mx-auto translate-y-[120px] transition duration-300 text-xl ${
            query && "!translate-y-0"
          }`}
        >
          <h1
            className={`text-black dark:text-white text-[25px] font-medium text-center absolute md:-top-6 -top-14 left-0 right-0  ${
              query ? "opacity-0 invisible" : "opacity-100 visible"
            } transition duration-500`}
          >
            Find your favourite movies, TV shows, people and more
          </h1>
          <SearchBox autoFocus />
        </div>

        {isMobile && query && (
          <div className="shrink-0 md:max-w-[310px] w-full md:pt-32 pt-[104px] px-3">
            <div
              ref={parent}
              className="bg-gray-500 dark:bg-dark-lighten rounded-md shadow-md px-4 pt-3"
            >
              <div className="flex justify-between items-center text-black dark:text-white pb-3">
                <p className="text-lg ">Search Results</p>
                <button onClick={() => setOpenSearchFilter((prev) => !prev)}>
                  {openSearchFilter && <ChevronDownIcon></ChevronDownIcon>}
                  {!openSearchFilter && <ChevronRightIcon></ChevronRightIcon>}
                </button>
              </div>
              {openSearchFilter && (
                <QueryBox currentTab={currentTab} query={query}></QueryBox>
              )}
            </div>
          </div>
        )}
        {query && (
          <SearchResult
            currentTab={currentTab}
            query={query}
            page={Number(page)}
          />
        )}
      </div>
      {!isMobile && (
        <div className="shrink-0 md:max-w-[310px] w-full md:pt-32 pt-4 px-3">
          <div
            ref={parent}
            className="bg-gray-500 dark:bg-dark-lighten rounded-md shadow-md px-4 pt-3"
          >
            <div className="flex justify-between items-center text-black dark:text-white pb-3">
              <p className="text-lg ">Search Results</p>
              <button onClick={() => setOpenSearchFilter((prev) => !prev)}>
                {openSearchFilter && <ChevronDownIcon />}
                {!openSearchFilter && <ChevronRightIcon />}
              </button>
            </div>
            {openSearchFilter && (
              <QueryBox currentTab={currentTab} query={query}></QueryBox>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default SearchPage;
