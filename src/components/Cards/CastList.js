import React from "react";
import CastCard from "./CastCard";

const CastList = ({ credits = [], className = "" }) => {
  return (
    <div
      className={`grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 ${className}`}
    >
      {credits &&
        credits.length > 0 &&
        credits
          .slice(0, 10)
          .map((item) => <CastCard key={item.id} data={item}></CastCard>)}
    </div>
  );
};

export default CastList;
