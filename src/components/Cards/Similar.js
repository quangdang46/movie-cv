import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { fetchMovieMeta } from "../../service/movieService";
import MovieCard from "./MovieCard";
import SwiperCore, { Navigation } from "swiper";
import { useViewportView } from "../../hooks/useViewportView";
const Similar = ({ id }) => {
  SwiperCore.use([Navigation]);
  const [movie, setMovie] = useState([]);
  const { width } = useViewportView();

  useEffect(() => {
    const fetchMovie = async () => {
      const { data } = await fetchMovieMeta(id, "similar");
      setMovie(data.results);
    };
    fetchMovie();
  }, [id]);
  let item = 1;

  if (width >= 1280) {
    item = 5;
  } else if (width >= 1024) {
    item = 4;
  } else if (width >= 768) {
    item = 3;
  } else if (width >= 640) {
    item = 2;
  }
  return (
    <div className="mt-5">
      <Swiper
        navigation
        grabCursor={true}
        spaceBetween={20}
        slidesPerView={item}
      >
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
