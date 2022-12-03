import React from "react";
import { useParams } from "react-router-dom";
import SimpleBreadcrumbs from "../Breadcrums/SimpleBreadcrumbs";
import { Button } from "../components/Button";
import StarIcon from "../components/Icon/StarIcon";
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
// import required modules
import { Pagination, Navigation } from "swiper";
import { v4 } from "uuid";
import "./styles.scss";
const MovieDetail = () => {
  const { id } = useParams();
  return (
    <div
      style={{
        backgroundImage:
          'url("https://vtv1.mediacdn.vn/thumb_w/640/2019/4/3/568192382702538005773084275735552188171608n-1554266472791390104356.jpg")',
      }}
      className="bg-cover bg-center bg-no-repeat bg-fixed bg-gray-900 min-h-screen text-white"
    >
      {/* <div className="overlay absolute inset-0 bg-gradient-to-t from-[rgba(0,0,0,0.5)] to-[rgba(0,0,0,0.2)] rounded-lg z-10"></div> */}
      <div className="py-10 2xl:max-w-screen-2xl 2xl:mx-auto px-10 2xl:px-0">
        <div className="2xl:flex gap-x-5 items-stretch">
          <div className="hidden 2xl:block 2xl:shrink-0 w-full h-[600px] 2xl:h-auto 2xl:max-w-[400px] rounded-lg">
            <img
              src="https://www.joblo.com/wp-content/uploads/2019/08/joker-poster-main2-1.jpg"
              alt=""
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
          <div className="">
            <div className="bg-violet-500">
              <SimpleBreadcrumbs></SimpleBreadcrumbs>
            </div>
            <div className="mt-5 flex justify-between text-center 2xl:text-start">
              <div className="flex-1">
                <p className="text-8xl font-bold">
                  Joker<span className="text-5xl">(2019)</span>
                </p>
                <div className="block w-full h-[600px] 2xl:hidden rounded-lg sm:p-5 lg:p-10">
                  <img
                    src="https://www.joblo.com/wp-content/uploads/2019/08/joker-poster-main2-1.jpg"
                    alt=""
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>
                <p className="mt-6 text-2xl">Direction:asdddddd</p>
                <p className="mt-4 text-2xl">Cast:reportWebVitals,Wjn Juwa</p>
              </div>
              <div className="hidden 2xl:flex flex-col gap-2 justify-center pl-8 pr-5 bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-200 rounded-xl rounded-l-full">
                <div className="flex items-center gap-x-4">
                  <span className="text-7xl font-bold">8.5</span>
                  <div className="flex flex-col">
                    <span className="text-4xl">/10</span>
                    <span className="text-base mt-1">332434,3242</span>
                  </div>
                </div>
                <div className="flex items-center gap-x-2">
                  <span className="text-lg ">Rated this</span>
                  <div className="flex items-center gap-x-1">
                    {Array(10)
                      .fill()
                      .map((_, i) => (
                        <StarIcon key={i}></StarIcon>
                      ))}
                  </div>
                </div>
              </div>
            </div>
            <p className="mt-6 text-lg leading-8">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero,
              fugiat magni, modi voluptatem recusandae itaque sequi nam
              distinctio esse nisi eaque id ad est eveniet unde ab ullam
              repellendus fuga? Lorem ipsum dolor sit amet consectetur
              adipisicing elit. Libero, fugiat magni, modi voluptatem recusandae
              itaque sequi nam distinctio esse nisi eaque id ad est eveniet unde
              ab ullam repellendus fuga? Lorem ipsum dolor sit amet consectetur
              adipisicing elit. Libero, fugiat magni, modi voluptatem recusandae
              itaque sequi nam distinctio esse nisi eaque id ad est eveniet unde
              ab ullam repellendus fuga?
            </p>
            <div className="flex items-center gap-x-5 mt-5 flex-wrap justify-center 2xl:justify-start">
              <span className="py-1 px-3 text-lg font-bold border-primary text-secondary border rounded">
                Tagáđasađa
              </span>
              <span className="py-1 px-3 text-lg font-bold border-primary text-secondary border rounded">
                Tag
              </span>
              <span className="py-1 px-3 text-lg font-bold border-primary text-secondary border rounded">
                Tag
              </span>
            </div>
            <div className="mt-4">
              <Button content={"Watch now"}></Button>
            </div>
          </div>
        </div>
        <div className="">
          <p className="font-bold text-2xl uppercase mt-10">Cast</p>
          {/* <div className="grid gap-5 grid-cols-5 mt-2">
            {Array(5)
              .fill()
              .map((_, i) => (
                <div className="w-full h-full p-3 bg-slate-800 rounded-lg">
                  <img
                    src="https://www.joblo.com/wp-content/uploads/2019/08/joker-poster-main2-1.jpg"
                    alt=""
                    className="w-full h-[300px] object-cover rounded-lg"
                  />
                  <p className="text-center font-montserrat text-xl mt-3">
                    Name AppContext
                  </p>
                </div>
              ))}
          </div> */}
          <div className="mt-2 cast-list">
            <Swiper
              slidesPerView={3}
              spaceBetween={30}
              slidesPerGroup={3}
              loop={true}
              loopFillGroupWithBlank={true}
              pagination={{
                clickable: true,
              }}
              navigation={true}
              modules={[Pagination, Navigation]}
              className="mySwiper"
            >
              {Array(10)
                .fill()
                .slice(0, 8)
                .map((_, i) => (
                  <SwiperSlide key={v4()}>
                    <div className="w-full h-full p-3 bg-slate-800 rounded-lg">
                      <img
                        src="https://www.joblo.com/wp-content/uploads/2019/08/joker-poster-main2-1.jpg"
                        alt=""
                        className="w-full h-[300px] object-cover rounded-lg"
                      />
                      <p className="text-center font-montserrat text-xl mt-3">
                        Name AppContext
                      </p>
                    </div>
                  </SwiperSlide>
                ))}
            </Swiper>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;
