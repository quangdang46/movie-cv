import { useState, useEffect } from "react";
import { useLocation, useHistory } from "react-router-dom";
import ChevronDownIcon from "../Icon/ChevronDownIcon";
import ChevronUpIcon from "../Icon/ChevronUpIcon";
import "./style.css";
function useSearchParams() {
  const location = useLocation();
  const history = useHistory();
  const [searchParams, setSearchParams] = useState(
    new URLSearchParams(location.search)
  );

  useEffect(() => {
    const searchString = searchParams.toString();
    history.pushState({}, "", `${location.pathname}?${searchString}`);
  }, [searchParams]);

  return [searchParams, setSearchParams];
}

const SortBy = () => {
  const [openSort, setOpenSort] = useState(true);

  const [searchParams, setSearchParams] = useSearchParams();

  const options = [
    { value: "popularity.desc", label: "Most popular" },
    { value: "vote_average.desc", label: "Most rating" },
    { value: "release_date.desc", label: "Most recent" },
  ];

  const customStyles = {
    control: (styles) => ({
      ...styles,
      backgroundColor: "#49494b",
      boxShadow: "none",
      border: 0,
    }),
    option: (styles, { data, isDisabled, isFocused, isSelected }) => ({
      ...styles,
      backgroundColor: isSelected ? "#989898" : "#49494b",
    }),

    singleValue: (provided) => ({
      ...provided,
      color: "white",
    }),

    menu: (styles) => ({
      ...styles,
      backgroundColor: "#49494b",
    }),
  };
  const chooseSort = (option) => {
    const sortValue = option?.value || "";
    setSearchParams(
      new URLSearchParams({ ...searchParams, sort_by: sortValue })
    );
  };

  const sortType = searchParams.get("sort_by") || "popularity.desc";
  return (
    <div className="bg-dark-lighten rounded-md shadow-md px-4 pt-3">
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
          <Select
            options={options}
            styles={customStyles}
            defaultValue={options[0]}
            value={options.find((option) => option.value === sortType)}
            onChange={chooseSort}
          />
        </div>
      )}
    </div>
  );
};
const Select = ({ options, styles, defaultValue, value, onChange }) => (
  <div className="select-container" style={styles.control}>
    <select
      defaultValue={defaultValue}
      value={value}
      onChange={onChange}
      style={styles.select}
    >
      {options.map((option) => (
        <option
          value={option.value}
          key={option.value}
          style={option.value === value ? styles.optionSelected : styles.option}
        >
          {option.label}
        </option>
      ))}
    </select>
  </div>
);
Select.defaultProps = {
  styles: {
    control: {},
    select: {},
    option: {},
    optionSelected: {},
  },
};
export default SortBy;
