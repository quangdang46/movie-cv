import React from "react";
import { Link } from "react-router-dom";
const Label = ({ title, className = "", toPath = "/", isLink = false }) => {
  if (!isLink) {
    return (
      <h1 className="select-none text-[#e5e5e5] md:text-3xl text-xl font-medium transition duration-200 hover:text-white">
        {title}
      </h1>
    );
  }
  return (
    <Link to={toPath} className="cursor-pointer inline-block">
      <h1 className="select-none text-[#e5e5e5] md:text-3xl text-xl font-medium transition duration-200 hover:text-white">
        {title}
      </h1>
    </Link>
  );
};
export default Label;
