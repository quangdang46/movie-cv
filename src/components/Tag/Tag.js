import React from "react";
import PropTypes from "prop-types";

const Tag = ({ className, onClick = () => {}, children }) => {
  return (
    <button
      className={`text-lg font-bold cursor-pointer px-4 py-1 border rounded-full opacity-100 hover:opacity-70 transition duration-300 inline-block ${className}`}
      // className="m-1 py-1 px-3 text-lg font-bold border-primary text-secondary border rounded"
      onClick={onClick}
    >
      {children}
    </button>
  );
};
Tag.propTypes = {
  className: PropTypes.string,
  onClick: PropTypes.func,
  children: PropTypes.node,
};

export default Tag;
