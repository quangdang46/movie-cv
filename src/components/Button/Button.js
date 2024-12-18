import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import PropTypes from "prop-types";

const Button = ({
  id,
  className,
  content = "Watch Movie",
  isWatching = false,
}) => {
  const navigate = useNavigate();
  return (
    <button
      className={`2xl:w-auto w-full cursor-pointer bg-secondary px-6 py-2 xl:px-8 xl:py-3 rounded-lg text-xl font-sans mt-auto ${className}`}
      onClick={() => navigate(isWatching ? `/watch/${id}` : `/movies/${id}`)}
    >
      {content}
    </button>
  );
};
Button.propTypes = {
  id: PropTypes.string,
  className: PropTypes.string,
  content: PropTypes.string,
  isWatching: PropTypes.bool,
};

export default Button;
