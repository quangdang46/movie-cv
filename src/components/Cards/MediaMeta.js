import React from "react";
import { Navigation, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { v4 } from "uuid";
import { youtubePath } from "../../api/configApi";
import { Iframe } from "../Lazy";
import PropTypes from "prop-types";

const MediaMeta = ({ meta }) => {
  return (
    <div className="meta">
      <Swiper
        spaceBetween={10}
        grabCursor={true}
        pagination={{ clickable: true }}
        navigation={true}
        modules={[Navigation, Pagination]}
        style={{ width: "100%", height: "max-content" }}
      >
        {meta &&
          meta.length > 0 &&
          meta.slice(0,10).map((item, index) => (
            <SwiperSlide key={v4()}>
              <Iframe
                title={item.name}
                lazy_src={youtubePath(item.key)}
              ></Iframe>
            </SwiperSlide>
          ))}
      </Swiper>
    </div>
  );
};
MediaMeta.propTypes = {
  meta: PropTypes.array.isRequired,
};

export default MediaMeta;
