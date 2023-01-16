import React from "react";
import { useEffect } from "react";
import { useRef } from "react";
import { useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { getSearchKeyword } from "../../service/movieService";
import { SearchIcon } from "../Icon";
import PropTypes from "prop-types";

let isInitial = true;
const SearchBox = ({ autoFocus = false }) => {
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const [searchInput, setSearchInput] = useState(
    searchParams.get("query") || ""
  );
  const timeoutRef = useRef(null);
  const [suggestions, setSuggestions] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    setSuggestions([]);

    if (!searchInput.trim()) return;

    timeoutRef.current = setTimeout(async () => {
      const keywords = await getSearchKeyword(searchInput.trim());
      setSuggestions(keywords);
      if (isInitial) {
        isInitial = false;
        setSuggestions([]);
      }
    }, 300);

    return () => clearTimeout(timeoutRef.current);
  }, [searchInput]);

  const searchSubmitHandler = (e) => {
    e.preventDefault();
    if (!searchInput.trim()) return;
    navigate(`/search?query=${encodeURIComponent(searchInput.trim())}`);
    clearTimeout(timeoutRef.current);
    setSuggestions([]);
  };

  useEffect(() => {
    setSuggestions([]);
    clearTimeout(timeoutRef.current);
  }, [location.search]);

  return (
    <div
      className={`absolute z-30 shadow-md left-6 right-6 top-12 xs:top-10 group bg-gray-500 dark:bg-dark-lighten rounded-full ${
        suggestions?.length > 0 && "!rounded-3xl"
      }`}
    >
      <form className="relative" onSubmit={searchSubmitHandler}>
        <button className="absolute top-1/2 -translate-y-1/2 left-5">
          <SearchIcon></SearchIcon>
        </button>
        <input
          className="w-full pl-14 pr-7 outline-none bg-transparent py-3 placeholder-gray-800 dark:placeholder-gray-500 text-black dark:text-white"
          type="text"
          placeholder="Enter keyword"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          autoFocus={autoFocus}
        />
      </form>

      {suggestions?.length > 0 && (
        <ul className="hidden group-focus-within:flex flex-col gap-3 py-3 relative after:absolute after:top-0 after:h-[2px]  after:bg-[#19191b] after:left-[5%] after:right-[5%]">
          {suggestions.map((suggestion, index) => (
            <li
              key={index}
              className="focus:bg-red-500 outline-none"
              tabIndex={index - 1}
            >
              <button
                onClick={() => {
                  navigate(`/search?query=${encodeURIComponent(suggestion)}`);
                  setSuggestions([]);
                  setSearchInput(suggestion);
                }}
                className="flex items-center gap-3 ml-5 hover:text-white transition duration-300"
              >
                <SearchIcon></SearchIcon>
                <span>{suggestion}</span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
SearchBox.propTypes = {
  autoFocus: PropTypes.bool,
};

export default SearchBox;
