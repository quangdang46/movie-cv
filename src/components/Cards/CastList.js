import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { fetchMovieMeta } from "../../service/movieService";
import CastCard from "./CastCard";

const CastList = ({ id, className = "" }) => {
  const [cast, setCast] = useState([]);
  useEffect(() => {
    const fetchCast = async () => {
      const { data } = await fetchMovieMeta(id, "credits");
      setCast(data.cast);
    };
    fetchCast();
  }, [id]);
  console.log(cast);
  return (
    <div
      className={`grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 ${className}`}
    >
      {cast &&
        cast.length > 0 &&
        cast
          .slice(0, 10)
          .map((item) => <CastCard key={item.id} data={item}></CastCard>)}
    </div>
  );
};

export default CastList;
