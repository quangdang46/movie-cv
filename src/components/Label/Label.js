import React from "react";
import { Link } from "react-router-dom";
const Label = ({ title, className = "", toPath = "/", isLink = false }) => {
  if (!isLink) {
    return (
      <h1 className="select-none w-56 text-sm font-semibold text-[#e5e5e5] transition duration-200 hover:text-white md:text-2xl">
        {title}
      </h1>
    );
  }
  return (
    <Link to={toPath} className="cursor-pointer inline-block">
      <h1 className="select-none w-56 text-sm font-semibold text-[#e5e5e5] transition duration-200 hover:text-white md:text-2xl">
        {title}
      </h1>
    </Link>
  );
};
export default Label;
