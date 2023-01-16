import React from "react";
import { useNavigate } from "react-router-dom";
import { ChevronRightIcon } from "../Icon";
import PropTypes from "prop-types";

const ViewAll = ({ url = "/" }) => {
  const navigate = useNavigate();

  return (
    <div
      className="flex-shrink-0 sm:relative cursor-pointer flex items-center opacity-1 sm:opacity-0 sm:invisible group-hover:opacity-100 group-hover:visible transition-all duration-1000 "
      onClick={() => navigate(url)}
    >
      <span className="text-base xs:text-xl">View all</span>
      <span className="sm:absolute sm:-translate-x-full group-hover:translate-x-0 left-full transition-all duration-1000">
        <ChevronRightIcon></ChevronRightIcon>
      </span>
    </div>
  );
};
ViewAll.propTypes = {
  url: PropTypes.string,
};
export default ViewAll;
