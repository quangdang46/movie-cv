import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import MovieCard from "./MovieCard";
import SwiperCore, { Navigation } from "swiper";
import { useViewportView } from "../../hooks/useViewportView";
import { useParams } from "react-router-dom";
import { v4 } from "uuid";
import PropTypes from "prop-types";

const Similar = ({ similar }) => {
  SwiperCore.use([Navigation]);
  const { id } = useParams();
  const { width } = useViewportView();

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
    <div className="similar">
      <Swiper
        navigation
        grabCursor={true}
        spaceBetween={20}
        slidesPerView={item}
      >
        {similar
          ?.filter((p) => p.id !== id)
          .map((item) => (
            <SwiperSlide key={v4()}>
              <MovieCard detail={item}></MovieCard>
            </SwiperSlide>
          ))}
      </Swiper>
    </div>
  );
};
Similar.propTypes = {
  similar: PropTypes.array.isRequired,
};

export default Similar;
