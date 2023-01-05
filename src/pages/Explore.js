import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { v4 } from "uuid";
import SimpleBreadcrumbs from "../Breadcrums/SimpleBreadcrumbs";
import { Filter, Sort } from "../components/Explore";
import { ChevronUpIcon } from "../components/Icon";
import { Image } from "../components/Lazy";
import { LeftSideBar } from "../components/SideBar";
import { useViewportView } from "../hooks/useViewportView";

const Explore = () => {
  const { isMobile } = useViewportView();
  const [isShowScrollUpBtn, setIsShowScrollUpBtn] = useState(false);
  useEffect(() => {
    const checkIfShowScrollUpBtn = () => {
      const scrollOffset = document.documentElement.scrollTop;
      if (scrollOffset > 1000) {
        setIsShowScrollUpBtn(true);
      } else {
        setIsShowScrollUpBtn(false);
      }
    };

    window.addEventListener("scroll", checkIfShowScrollUpBtn);

    return () => window.removeEventListener("scroll", checkIfShowScrollUpBtn);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const [searchParams, setSearchParams] = useSearchParams();
  // const initialConfig = {} as { [key: string]: string };

  // queryParams.forEach((value, key) => (initialConfig[key] = value));

  const [config, setConfig] = useState({});

  useEffect(() => {
    // const changeConfig = (key: string, value: string) => {
    //   const clone = JSON.parse(JSON.stringify(config));
    //   clone[key] = value;
    //   setConfig(clone);
    // };

    // setConfig((prevConfig) => ({
    //   ...prevConfig,
    //   sort_by: sortType,
    //   with_genres: genreType.toString(),
    // }));

    const changeConfig = (key, value) => {
      setConfig((prevConfig) => ({
        ...prevConfig,
        [key]: value,
      }));
    };

    const sortType = searchParams.get("sort_by") || "popularity.desc";
    changeConfig("sort_by", sortType);

    const genreType = searchParams.getAll("genre") || [];
    changeConfig("with_genres", genreType.toString());

    const minRuntime = Number(searchParams.get("minRuntime")) || 0;
    const maxRuntime = Number(searchParams.get("maxRuntime")) || 200;
    changeConfig("with_runtime.gte", minRuntime);
    changeConfig("with_runtime.lte", maxRuntime);

    const releaseFrom = searchParams.get("from") || "2002-11-04";
    const releaseTo = searchParams.get("to") || "2022-07-28";
    changeConfig("primary_release_date.gte", releaseFrom);
    changeConfig("primary_release_date.lte", releaseTo);
    changeConfig("air_date.gte", releaseFrom);
    changeConfig("air_date.lte", releaseTo);

    // eslint-disable-next-line
  }, [location.search]);
  return (
    <>
      {isShowScrollUpBtn && (
        <button
          onClick={scrollToTop}
          className={`fixed bottom-[30px] right-[30px] z-10 transition duration-500 ${
            isShowScrollUpBtn ? "opacity-100" : "opacity-0"
          }`}
        >
          <ChevronUpIcon
            size={35}
            className="text-primary hover:brightness-75 transition duration-300"
          />
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
          <div className="m-4">
            <Sort></Sort>
            <Filter></Filter>
          </div>
        )}
        <div className="flex-grow">
          <div className="grid grid-cols-sm md:grid-cols-lg gap-x-3 md:gap-x-8 gap-y-10">
            {Array(100)
              .fill(0)
              .map((i, _) => (
                <Image
                  lazy_src="https://source.unsplash.com/random"
                  key={v4()}
                ></Image>
              ))}
          </div>
        </div>
        {!isMobile && (
          <div className="shrink-0 md:max-w-[310px] w-full md:pt-20 pt-4 px-3">
            <Sort></Sort>
            <Filter></Filter>
          </div>
        )}
      </div>
    </>
  );
};

export default Explore;
