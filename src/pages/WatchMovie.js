import React from "react";
import { Link } from "react-router-dom";
import SimpleBreadcrumbs from "../Breadcrums/SimpleBreadcrumbs";
import { CalendarIcon } from "../components/Icon";
import StarIcon from "../components/Icon/StarIcon";
import Footer from "../components/layout/Footer";
import Header from "../components/layout/Header";
import ReadMore from "../components/ReadMore/ReadMore";
import SearchBox from "../components/SearchBox/SearchBox";
import RightSideBar from "../components/SideBar/RightSideBar";

const WatchMovie = () => {
  const detail = null;
  return (
    <>
      <Header></Header>

      <div className="flex flex-col md:flex-row pl-4 pr-4 pb-24 lg:pl-16 lg:pr-16 mt-10">
        <div className="flex-grow px-[2vw] md:pt-11 pt-5">
          <SimpleBreadcrumbs></SimpleBreadcrumbs>
          <div className="relative h-0 pb-[56.25%] mt-5">
            {/* {!detail && (
              <Skeleton className="absolute top-0 left-0 w-full h-full rounded-sm" />
            )} */}
            <iframe
              className="absolute w-full h-full top-0 left-0"
              src={`https://www.youtube.com/embed/YnvvoTeoMDQ`}
              title="Film Video Player"
              allowFullScreen
            ></iframe>
          </div>
          <div className="mt-5 pb-8">
            <div className="flex justify-between md:text-base text-sm">
              <div className="flex-1">
                {/* {!detail && <Skeleton className="h-8 w-[400px]" />} */}
                <h1 className="text-white md:text-3xl text-xl font-medium">
                  <Link
                    to={`/`}
                    className="hover:brightness-75 transition duration-300"
                  >
                    {"Name"}
                  </Link>
                </h1>
                {/* {!detail && <Skeleton className="w-[100px] h-[23px] mt-5" />} */}
                <div className="flex gap-5 mt-5">
                  <div className="flex gap-2 items-center">
                    <StarIcon className={"text-primary"}></StarIcon>
                    <span>{"Rating"}</span>
                  </div>
                  <div className="flex gap-2 items-center">
                    <CalendarIcon className={"text-primary"}></CalendarIcon>
                    <p>{"Release Date"}</p>
                  </div>
                </div>
                {/* {!detail && <Skeleton className="w-[100px] h-[23px] mt-2" />} */}
                <ul className="flex gap-2 flex-wrap mt-3">
                  {detail?.genres.map((genre) => (
                    <li key={genre.id} className="mb-2">
                      <Link
                        to={`/explore?genre=${genre.id}`}
                        className="px-3 py-1 bg-dark-lighten rounded-full hover:brightness-75 duration-300 transition"
                      >
                        {/* {genre.name}
                         */}
                        "Genre name"
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="md:text-xl text-lg font-medium text-white mt-5">
              Overview:
            </div>
            {/* {!detail && <Skeleton className="h-[84px] mt-2" />} */}
            <ReadMore
              limitTextLength={300}
              className="md:text-lg text-base mt-1"
            >
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Lorem
              ipsum, dolor sit amet consectetur adipisicing elit. Officia,
              quidem est sit saepe vero optio id. Optio sequi soluta sed earum?
              Ab, impedit aut. Cupiditate consequuntur quo ex velit facilis.
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Lorem
              ipsum, dolor sit amet consectetur adipisicing elit. Officia,
              quidem est sit saepe vero optio id. Optio sequi soluta sed earum?
              Ab, impedit aut. Cupiditate consequuntur quo ex velit facilis.
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Lorem
              ipsum, dolor sit amet consectetur adipisicing elit. Officia,
              quidem est sit saepe vero optio id. Optio sequi soluta sed earum?
              Ab, impedit aut. Cupiditate consequuntur quo ex velit facilis.
            </ReadMore>
          </div>
          {/* <Comment media_type={media_type} id={detail?.id} /> */}
        </div>
        <div className="shrink-0 md:max-w-[400px] w-full relative px-6">
          <SearchBox />
          <RightSideBar
            name="Recommendations"
            // films={recommendations?.filter((item) => item.id !== detail?.id)}
            limitNumber={4}
            // isLoading={!recommendations}
            className="md:mt-24 mt-0"
          />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default WatchMovie;
