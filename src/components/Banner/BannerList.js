import React from "react";
import { useFetchMovie } from "../../hooks/useFetchMovie";
import Banner from "./Banner";
import "./styles.scss";
import Slider from "react-slick";
const BannerList = () => {
  const { movieList, genreList } = useFetchMovie({
    category: "TOP_RATED",
    page: 1,
  });
  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 2,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    arrows: false,
    responsive: [
      {
        breakpoint: 1600,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };
  return (
    <div className="banner-list">
      <Slider {...settings}>
        {movieList.length > 0 &&
          movieList.map((movie) => (
            <Banner key={movie.id} movie={movie} genreList={genreList} />
          ))}
      </Slider>
    </div>
  );
};

export default BannerList;
