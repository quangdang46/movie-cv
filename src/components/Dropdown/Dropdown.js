import React, { useState } from "react";
import { ChevronDownIcon, ChevronUpIcon } from "../Icon";
import PropTypes from "prop-types";

const Dropdown = ({ options, onChange }) => {
  const [open, setOpen] = useState(false);
  const [selection, setSelection] = useState(options[0]);

  const toggle = () => setOpen(!open);

  const handleOnChange = (option) => {
    setSelection(option);
    setOpen(false);
    onChange(option);
  };

  return (
    <div className="relative inline-block text-left">
      <button
        className="relative z-10 h-8 w-full shadow-sm flex items-center gap-x-1"
        onClick={toggle}
      >
        <span className="block truncate">{selection.label}</span>
        {!open ? (
          <ChevronDownIcon></ChevronDownIcon>
        ) : (
          <ChevronUpIcon></ChevronUpIcon>
        )}
      </button>
      {open && (
        <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg">
          <div className="rounded-md bg-white shadow-xs">
            <ul className="py-1 divide-y divide-gray-200">
              {options.map((option) => (
                <li
                  key={option.value}
                  className="cursor-pointer block px-3 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:bg-gray-100 focus:text-gray-900"
                  onClick={() => handleOnChange(option)}
                >
                  {option.label}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};
Dropdown.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
    })
  ).isRequired,
  onChange: PropTypes.func.isRequired,
};

export default Dropdown;
