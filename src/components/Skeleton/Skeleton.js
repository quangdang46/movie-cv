import React from "react";
import PropTypes from "prop-types";

const Skeleton = ({ className, children, ...others }) => {
  return (
    <div className={`${className} skeleton rounded-md `} {...others}>
      {children}
    </div>
  );
};
Skeleton.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
};

export default Skeleton;
