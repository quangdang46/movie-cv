import React, { useContext, useEffect, useState } from "react";
import { useFetchMovie } from "../../hooks/useFetchMovie";
import MovieCard from "./MovieCard";
import { Navigation, Pagination, Scrollbar, A11y, Controller } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { MovieContext } from "../../context/MovieContext";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
const MovieList = ({ category = "TOP_RATED" }) => {
  const [currPage, setCurrPage] = useState(1);
  const { movieList, genreList } = useFetchMovie({
    category,
    currPage,
  });
  // <div className="mt-4 grid grid-cols-4 gap-3">
  const [swiper, setSwiper] = useState();
  const { prevRef, nextRef } = useContext(MovieContext);

  useEffect(() => {
    if (swiper) {
      console.log("Swiper instance:", swiper);
      swiper.params.navigation.prevEl = prevRef?.current;
      swiper.params.navigation.nextEl = nextRef?.current;
      swiper.navigation.init();
      swiper.navigation.update();
    }
  }, [nextRef, prevRef, swiper]);
  return (
    <div className="movie-list mt-4 w-full absolute">
      <Swiper
        modules={[Navigation, Pagination, Scrollbar, A11y, Controller]}
        className="external-buttons"
        spaceBetween={20}
        slidesPerView={4}
        navigation={{
          prevEl: prevRef?.current,
          nextEl: nextRef?.current,
        }}
        updateOnWindowResize
        observer
        observeParents
        initialSlide={1}
        onSwiper={setSwiper}
      >
        {movieList.map((movie) => (
          <SwiperSlide key={movie.id}>
            <MovieCard movie={movie} genreList={genreList}></MovieCard>
          </SwiperSlide>
        ))}
      </Swiper>

    </div>
  );
};

export default MovieList;
