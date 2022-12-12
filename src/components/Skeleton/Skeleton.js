import React from "react";

const Skeleton = ({ className, children, ...others }) => {
  return (
    <div className={`${className} skeleton rounded-md `} {...others}>
      {children}
    </div>
  );
};

export default Skeleton;
