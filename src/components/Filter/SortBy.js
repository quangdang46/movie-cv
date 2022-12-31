import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import ChevronDownIcon from "../Icon/ChevronDownIcon";
import ChevronUpIcon from "../Icon/ChevronUpIcon";
import "./style.css";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { useEffect } from "react";

const SortBy = () => {
  const [parent] = useAutoAnimate();
  const [openSort, setOpenSort] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const sort_by = searchParams.get("sort_by");
    if (sort_by) {
      setSearchParams((prev) => {
        const clone = new URLSearchParams(prev);
        clone.set("sort_by", sort_by);
        return clone;
      });
    }
  }, [setSearchParams]);

  const options = [
    { value: "popularity.desc", label: "Popularity Descending" },
    { value: "popularity.asc", label: "Popularity Ascending" },
    { value: "vote_average.desc", label: "Rating Descending" },
    { value: "vote_average.asc", label: "Rating Ascending" },
    { value: "release_date.desc", label: "Release Date Descending" },
    { value: "release_date.asc", label: "Release Date Ascending" },
    { value: "title.desc", label: "Title(A-Z)" },
    { value: "title.asc", label: "Title(Z-A)" },
  ];

  const chooseSort = (option) => {
    setSearchParams((prev) => {
      const clone = new URLSearchParams(prev);
      clone.set("sort_by", option.target.value);
      return clone;
    });
  };
  const sortType = searchParams.get("sort_by") || "popularity.desc";
  return (
    <>
      <div
        className="bg-dark-lighten rounded-md shadow-md px-4 pt-3"
        ref={parent}
      >
        <div className="flex justify-between items-center text-white pb-3">
          <p className="text-lg ">Sort</p>
          <button onClick={() => setOpenSort((prev) => !prev)}>
            {openSort && <ChevronDownIcon />}
            {!openSort && <ChevronUpIcon />}
          </button>
        </div>
        {openSort && (
          <div className="py-3 border-t border-dark-darken">
            <p className="text-lg mb-2 text-white/80">Sort results by </p>
            <div className="select-container">
              <select
                value={options.find((option) => option.value === sortType)}
                onChange={chooseSort}
              >
                {options.map((option) => (
                  <option value={option.value} key={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        )}
      </div>
      <div
        className="bg-dark-lighten rounded-md shadow-md px-4 pt-3"
        ref={parent}
      >
        <div className="flex justify-between items-center text-white pb-3">
          <p className="text-lg ">Filter</p>
          <button onClick={() => setOpenSort((prev) => !prev)}>
            {openSort && <ChevronDownIcon />}
            {!openSort && <ChevronUpIcon />}
          </button>
        </div>
        {/* {openSort && (
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
            <div
              // @ts-ignore
              className="flex gap-3 flex-wrap max-h-[200px] overflow-y-auto"
            >
              {data.movieGenres.map((genre) => (
                <div key={genre.id}>
                  <button
                    onClick={() => chooseGenre(String(genre.id))}
                    className={`px-4 py-1 border border-[#989898] rounded-full hover:brightness-75 transition duration-300 inline-block ${
                      searchParam.getAll("genre").includes(String(genre.id)) &&
                      "bg-primary text-white"
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
        )} */}
      </div>
    </>
  );
};

export default SortBy;
