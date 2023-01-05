import { useSearchParams } from "react-router-dom";
import ChevronDownIcon from "../Icon/ChevronDownIcon";
import ChevronUpIcon from "../Icon/ChevronUpIcon";
import "./style.css";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { useEffect } from "react";
import { useState } from "react";

const Sort = () => {
  const [parent] = useAutoAnimate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [openSort, setOpenSort] = useState(true);

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
      <div className="mt-5"></div>
    </>
  );
};

export default Sort;
