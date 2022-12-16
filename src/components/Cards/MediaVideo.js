import React from "react";
import { Navigation, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { youtubePath } from "../../api/configApi";
import { Iframe } from "../Lazy";
const MediaVideo = ({ videos }) => {
  return (
    <div>
      <Swiper
        spaceBetween={10}
        grabCursor={true}
        pagination={{ clickable: true }}
        navigation={true}
        modules={[Navigation, Pagination]}
        style={{ width: "100%", height: "max-content" }}
      >
        {videos &&
          videos.length > 0 &&
          videos.map((video, index) => (
            <SwiperSlide key={video.id}>
              <Iframe
                title={video.name}
                lazy_src={youtubePath(video.key)}
              ></Iframe>
            </SwiperSlide>
          ))}
      </Swiper>
    </div>
  );
};

export default MediaVideo;
