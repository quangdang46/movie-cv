import React from "react";
import { Link } from "react-router-dom";

const Label = ({ title, className = "", toPath = "/", isLink = false }) => {
  if (!isLink) {
    return (
      <h2 className="select-none w-56 text-sm font-semibold text-[#e5e5e5] transition duration-200 hover:text-white md:text-2xl">
        {title || "Title"}
      </h2>
    );
  }
  return (
    <Link to={toPath}>
      <h2 className="select-none w-56 cursor-pointer text-sm font-semibold text-[#e5e5e5] transition duration-200 hover:text-white md:text-2xl">
        {title || "Title"}
      </h2>
    </Link>
  );
};
export default Label;