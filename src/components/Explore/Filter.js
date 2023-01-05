import React from "react";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import ChevronDownIcon from "../Icon/ChevronDownIcon";
import ChevronUpIcon from "../Icon/ChevronUpIcon";
import { useQuery } from "@tanstack/react-query";
import { getGenres } from "../../service/movieService";
import { useSearchParams } from "react-router-dom";
import { useState } from "react";
import { useRef } from "react";
import { useEffect } from "react";
const Filter = () => {
  const MAX_RUNTIME = 200;
  const GAP = 20;
  const { isLoading, data, isError, error } = useQuery(["genres"], getGenres);
  const [parent] = useAutoAnimate();
  const [openFilter, setOpenFilter] = useState(true);

  const [searchParams, setSearchParams] = useSearchParams();
  const [minRuntime, setMinRuntime] = useState(0);
  const [maxRuntime, setMaxRuntime] = useState(200);
  const sliderRangeRef = useRef(null);
  const timeoutRef = useRef(null);
  const handleFilterDate = (e) => {
    if (e.target.name === "from") {
      setSearchParams({
        // ...currentSearchParams,
        from: e.target.value,
      });
    } else {
      setSearchParams({
        // ...currentSearchParams,
        to: e.target.value,
      });
    }
  };
  const updateMinRangeBar = (value) => {
    setMinRuntime(value);
    const leftOffet = (value / MAX_RUNTIME) * 100;
    sliderRangeRef.current.style.left = leftOffet + "%";
  };

  const updateMaxRangeBar = (value) => {
    setMaxRuntime(value);
    const rightOffet = 100 - (value / MAX_RUNTIME) * 100;
    sliderRangeRef.current.style.right = rightOffet + "%";
  };
  useEffect(() => {
    updateMinRangeBar(Number(searchParams.get("minRuntime")) ?? 0);
    updateMaxRangeBar(Number(searchParams.get("maxRuntime")) || 200);

    // eslint-disable-next-line
  }, [location.search]);
  const handleDragSliderRange = (e) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    if (e.target.name === "min-range") {
      updateMinRangeBar(
        maxRuntime - Number(e.target.value) < GAP
          ? maxRuntime - GAP
          : Number(e.target.value)
      );

      timeoutRef.current = setTimeout(() => {
        setSearchParams({
          // ...currentSearchParams,
          minRuntime: e.target.value,
        });
      }, 500);
    } else {
      updateMaxRangeBar(
        Number(e.target.value) - minRuntime < GAP
          ? minRuntime + GAP
          : Number(e.target.value)
      );

      timeoutRef.current = setTimeout(() => {
        setSearchParams({
          // ...currentSearchParams,
          maxRuntime: e.target.value,
        });
      }, 500);
    }
  };
  const chooseGenre = (genreId) => {};
  return (
    <div
      className="bg-dark-lighten rounded-md shadow-md px-4 pt-3"
      ref={parent}
    >
      <div className="flex justify-between items-center text-white pb-3">
        <p className="text-lg ">Filter</p>
        <button onClick={() => setOpenFilter((prev) => !prev)}>
          {openFilter && <ChevronDownIcon />}
          {!openFilter && <ChevronUpIcon />}
        </button>
      </div>
      {openFilter && (
        <div className="py-3 border-t border-dark-darken">
          <p className="text-lg mb-2 mt-8 text-white/80">Release Dates</p>
          <div className="flex flex-col gap-3">
            <div className="flex justify-between items-center">
              <label htmlFor="from">From</label>
              <input
                type="date"
                id="from"
                name="from"
                className="outline-none bg-dark-lighten-2 px-3 py-1 rounded-md"
                onChange={handleFilterDate}
                value={searchParams.get("from") || "2002-11-04"}
              />
            </div>
            <div className="flex justify-between items-center">
              <label htmlFor="from">To</label>
              <input
                type="date"
                id="to"
                name="to"
                className="outline-none bg-dark-lighten-2 px-3 py-1 rounded-md"
                onChange={handleFilterDate}
                value={searchParams.get("to") || "2022-07-28"}
              />
            </div>
          </div>

          <p className="text-lg mb-4 text-white/80">Genres</p>
          <div className="flex gap-3 flex-wrap max-h-[200px] overflow-y-auto">
            {data &&
              data.movieGenres.map((genre) => (
                <div key={genre.id}>
                  <button
                    onClick={() => chooseGenre(String(genre.id))}
                    className={`px-4 py-1 border border-[#989898] rounded-full hover:brightness-75 transition duration-300 inline-block ${
                      // searchParam.getAll("genre").includes(String(genre.id)) &&
                      "bg-dark-lighten-2 text-white"
                    }`}
                  >
                    {genre.name}
                  </button>
                </div>
              ))}
          </div>

          <p className="text-lg mb-2 mt-8 text-white/80">Runtime</p>
          <div>
            <div className="flex justify-between mb-3">
              <div className="flex gap-2 items-center">
                <span>From</span>
                <p className="flex gap-1 items-center">
                  <span className="text-lg font-medium text-white/60">
                    {minRuntime}
                  </span>
                  <span className="text-sm">min</span>
                </p>
              </div>
              <div className="flex gap-2 items-center">
                <span>To</span>
                <p className="flex gap-1 items-center">
                  <span className="text-lg font-medium text-white/60">
                    {maxRuntime}
                  </span>
                  <span className="text-sm">min</span>
                </p>
              </div>
            </div>
            <div className="relative h-[5px] bg-dark-darken rounded-md">
              <div
                ref={sliderRangeRef}
                className="absolute top-0 h-[5px] bg-primary rounded-md"
              ></div>
            </div>
            <div className="relative">
              <input
                className="absolute -top-[5px] left-0 w-full h-[5px] appearance-none [background:none] pointer-events-none tw-slider-range"
                type="range"
                min="0"
                max={MAX_RUNTIME}
                step="10"
                name="min-range"
                value={minRuntime}
                onChange={handleDragSliderRange}
              />
              <input
                className="absolute -top-[5px] left-0 w-full h-[5px] appearance-none [background:none] pointer-events-none tw-slider-range"
                type="range"
                min="0"
                max={MAX_RUNTIME}
                step="10"
                name="max-range"
                value={maxRuntime}
                onChange={handleDragSliderRange}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Filter;
