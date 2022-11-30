import React from "react";

const Wrapper = ({ className, children }) => {
  return <section className={className}>{children}</section>;
};

export default Wrapper;
