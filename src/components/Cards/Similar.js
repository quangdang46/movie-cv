import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { fetchMovieMeta } from "../../service/movieService";
import MovieCard from "./MovieCard";

const Similar = ({ id }) => {
  const [movie, setMovie] = useState([]);
  const [width, setWidth] = useState(window.innerWidth);
  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [width]);

  useEffect(() => {
    const fetchMovie = async () => {
      const { data } = await fetchMovieMeta(id, "similar");
      setMovie(data.results);
    };
    fetchMovie();
  }, [id]);
  let item=2;

  if (width >= 1024) {
    item = 5;
  } else if (width < 1024 && width >= 740) {
    item = 4;
  } else if (width < 740 && width >= 500) {
    item = 3;
  }
  return (
    <div className="mt-5 similar">
      <Swiper grabCursor={"true"} spaceBetween={40} slidesPerView={"auto"}>
        {movie
          ?.filter((p) => p.id !== id)
          .map((item) => (
            <SwiperSlide key={item.id}>
              <MovieCard movie={item} id={item.id}></MovieCard>
            </SwiperSlide>
          ))}
      </Swiper>
    </div>
  );
};

export default Similar;
