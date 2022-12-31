import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { ChevronDownIcon, ChevronRightIcon } from "../components/Icon";
import Footer from "../components/layout/Footer";
import { SearchResult } from "../components/SearchBox";
import SearchBox from "../components/SearchBox/SearchBox";
import { useViewportView } from "../hooks/useViewportView";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import SimpleBreadcrumbs from "../Breadcrums/SimpleBreadcrumbs";
import { LeftSideBar } from "../components/SideBar";
const SearchPage = () => {
  const { isMobile, width } = useViewportView();
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("query");
  const page = searchParams.get("page") || 1;
  const [parent] = useAutoAnimate();
  const [currentTab, setCurrentTab] = useState("multi");
  const [openSearchFilter, setOpenSearchFilter] = useState(true);
  return (
    <>
      <div className="flex min-h-screen flex-col md:flex-row">
        {isMobile && (
          <SimpleBreadcrumbs
            className={"block rounded-none border-none bg-dark-lighten"}
            textLight={true}
          ></SimpleBreadcrumbs>
        )}
        {!isMobile && <LeftSideBar></LeftSideBar>}
        <div className="flex-grow">
          <div
            className={`relative z-30 md:max-w-[50vw] w-full mx-auto translate-y-[120px] transition duration-300 text-xl ${
              query && "!translate-y-0"
            }`}
          >
            <h1
              className={`text-white text-[25px] font-medium text-center absolute md:-top-6 -top-14 left-0 right-0  ${
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
                className="bg-dark-lighten rounded-md shadow-md px-4 pt-3"
              >
                <div className="flex justify-between items-center text-white pb-3">
                  <p className="text-lg ">Search Results</p>
                  <button onClick={() => setOpenSearchFilter((prev) => !prev)}>
                    {openSearchFilter && <ChevronDownIcon></ChevronDownIcon>}
                    {!openSearchFilter && <ChevronRightIcon></ChevronRightIcon>}
                  </button>
                </div>
                {openSearchFilter && (
                  <div className="md:py-6 py-2 border-t border-dark-darken text-white text-lg flex md:flex-col flex-row gap-3">
                    <button
                      onClick={() => {
                        setSearchParams({ query: query || "", page: "1" });
                        setCurrentTab("multi");
                      }}
                      className={`w-full hover:bg-dark-lighten-2  py-1 rounded-md transition duration-300 ${
                        currentTab === "multi" && "bg-dark-lighten-2"
                      }`}
                    >
                      <span>All</span>
                    </button>
                    <button
                      onClick={() => {
                        setSearchParams({ query: query || "", page: "1" });
                        setCurrentTab("movie");
                      }}
                      className={`w-full hover:bg-dark-lighten-2  py-1 rounded-md transition duration-300 ${
                        currentTab === "movie" && "bg-dark-lighten-2"
                      }`}
                    >
                      <span>Movie</span>
                    </button>
                    <button
                      onClick={() => {
                        setSearchParams({ query: query || "", page: "1" });
                        setCurrentTab("tv");
                      }}
                      className={`w-full hover:bg-dark-lighten-2  py-1 rounded-md transition duration-300 ${
                        currentTab === "tv" && "bg-dark-lighten-2"
                      }`}
                    >
                      <span>TV Show</span>
                    </button>
                    <button
                      onClick={() => {
                        setSearchParams({ query: query || "", page: "1" });
                        setCurrentTab("person");
                      }}
                      className={`w-full hover:bg-dark-lighten-2  py-1 rounded-md transition duration-300 ${
                        currentTab === "person" && "bg-dark-lighten-2"
                      }`}
                    >
                      <span>People</span>
                    </button>
                  </div>
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
              className="bg-dark-lighten rounded-md shadow-md px-4 pt-3"
            >
              <div className="flex justify-between items-center text-white pb-3">
                <p className="text-lg ">Search Results</p>
                <button onClick={() => setOpenSearchFilter((prev) => !prev)}>
                  {openSearchFilter && <ChevronDownIcon />}
                  {!openSearchFilter && <ChevronRightIcon />}
                </button>
              </div>
              {openSearchFilter && (
                <div className="md:py-6 py-2 border-t border-dark-darken text-white text-lg flex md:flex-col flex-row gap-3">
                  <button
                    onClick={() => {
                      setSearchParams({ query: query || "", page: "1" });
                      setCurrentTab("multi");
                    }}
                    className={`w-full hover:bg-dark-lighten-2  py-1 rounded-md transition duration-300 ${
                      currentTab === "multi" && "bg-dark-lighten-2"
                    }`}
                  >
                    <span>All</span>
                  </button>
                  <button
                    onClick={() => {
                      setSearchParams({ query: query || "", page: "1" });
                      setCurrentTab("movie");
                    }}
                    className={`w-full hover:bg-dark-lighten-2  py-1 rounded-md transition duration-300 ${
                      currentTab === "movie" && "bg-dark-lighten-2"
                    }`}
                  >
                    <span>Movie</span>
                  </button>
                  <button
                    onClick={() => {
                      setSearchParams({ query: query || "", page: "1" });
                      setCurrentTab("tv");
                    }}
                    className={`w-full hover:bg-dark-lighten-2  py-1 rounded-md transition duration-300 ${
                      currentTab === "tv" && "bg-dark-lighten-2"
                    }`}
                  >
                    <span>TV Show</span>
                  </button>
                  <button
                    onClick={() => {
                      setSearchParams({ query: query || "", page: "1" });
                      setCurrentTab("person");
                    }}
                    className={`w-full hover:bg-dark-lighten-2  py-1 rounded-md transition duration-300 ${
                      currentTab === "person" && "bg-dark-lighten-2"
                    }`}
                  >
                    <span>People</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default SearchPage;
