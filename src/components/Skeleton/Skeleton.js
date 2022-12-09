import React from "react";

const Skeleton = ({ className, children, ...others }) => {
  return (
    <div
      className={`${className} animate-pulse bg-[#989898] rounded-md `}
      {...others}
    >
      {children}
    </div>
  );
};

export default Skeleton;
