import React from "react";
import ViewAll from "./ViewAll";
const ConditionalWrapper = ({ conditional, wrapper, children }) => {
  return conditional ? wrapper(children) : children;
};

const Label = ({ title, url }) => {
  if (!url) {
    return (
      <div className="w-full sm:w-fit group flex sm:gap-x-3 items-baseline justify-between sm:justify-start mb-2 flex-wrap">
        <p className="text-lg xs:text-2xl sm:text-3xl uppercase font-montserrat font-semibold cursor-pointer">
          {title}
        </p>
      </div>
    );
  }
  return (
    <div className="w-full sm:w-fit group flex sm:gap-x-3 items-baseline justify-between sm:justify-start mb-2 flex-wrap">
      <p className="text-lg xs:text-2xl sm:text-3xl uppercase font-montserrat font-semibold cursor-pointer">
        {title}
      </p>
      {/* <div
        className="flex-shrink-0 sm:relative cursor-pointer flex items-center opacity-1 sm:opacity-0 sm:invisible group-hover:opacity-100 group-hover:visible transition-all duration-1000 "
        onClick={() => navigate(toPath)}
      >
        <span className="text-base xs:text-xl">View all</span>
        <span className="sm:absolute sm:-translate-x-full group-hover:translate-x-0 left-full transition-all duration-1000">
          <ChevronRightIcon></ChevronRightIcon>
        </span>
      </div> */}
      <ViewAll url={url}></ViewAll>
    </div>
  );
};
export default Label;
