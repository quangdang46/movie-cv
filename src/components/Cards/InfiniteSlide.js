import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper";
import { Image } from "../Lazy";
import { IMAGE_URL } from "../../api/configApi";
import { v4 } from "uuid";
import { useViewportView } from "../../hooks/useViewportView";
import PropTypes from "prop-types";

const InfiniteSlide = ({ meta }) => {
  const { width } = useViewportView();
  let item = 1;
  if (width >= 1280) {
    item = 3;
  } else if (width >= 1024) {
    item = 2;
  }

  return (
    <div className="mt-5 image-slide">
      <Swiper
        slidesPerView={item}
        spaceBetween={10}
        slidesPerGroup={3}
        loop={true}
        loopFillGroupWithBlank={true}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Pagination, Navigation]}
      >
        {meta &&
          meta.length > 0 &&
          meta.map((item, index) => (
            <SwiperSlide key={v4()}>
              <Image
                lazy_src={
                  item.file_path
                    ? `${IMAGE_URL}/w500${item.file_path}`
                    : "https://images.unsplash.com/photo-1671127310220-509dcf216e20?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
                }
                className="w-full h-full object-cover block rounded-lg"
              ></Image>
            </SwiperSlide>
          ))}
      </Swiper>
    </div>
  );
};
InfiniteSlide.propTypes = {
  meta: PropTypes.array.isRequired,
};

export default InfiniteSlide;
