import { useQuery } from "@tanstack/react-query";
import React from "react";
import { Link, useParams } from "react-router-dom";
import { EMBED_TO } from "../api/configApi";
import SimpleBreadcrumbs from "../Breadcrums/SimpleBreadcrumbs";
import Comments from "../components/Comment/Comments";
import { CalendarIcon } from "../components/Icon";
import StarIcon from "../components/Icon/StarIcon";
import Footer from "../components/layout/Footer";
import Header from "../components/layout/Header";
import { Iframe } from "../components/Lazy";
import ReadMore from "../components/ReadMore/ReadMore";
import SearchBox from "../components/SearchBox/SearchBox";
import RightSideBar from "../components/SideBar/RightSideBar";
import { Skeleton } from "../components/Skeleton";
import { useViewportView } from "../hooks/useViewportView";
import { getWatchMovie } from "../service/movieService";

const WatchMovie = () => {
  const { id } = useParams();
  const { isMobile } = useViewportView();
  const { data, isLoading, isError } = useQuery(["movie", id], () =>
    getWatchMovie(id)
  );
  if (isError) return <div>Something went wrong</div>;
  if (isLoading) return <div>Loading...</div>;
  const { detail, recommendations } = data || {};
  if (!detail || !recommendations) return <div>Not found</div>;
  return (
    <>
      <Header isSearch={false}></Header>
      <div className="flex flex-col md:flex-row pl-4 pr-4 pb-24 lg:pl-16 lg:pr-16 mt-10">
        <div className="flex-grow px-[2vw] md:pt-11 pt-5">
          {!isMobile && <SimpleBreadcrumbs></SimpleBreadcrumbs>}
          <div className="relative h-0 pb-[56.25%] mt-5">
            {!detail && (
              <Skeleton className="absolute top-0 left-0 w-full h-full rounded-sm" />
            )}
            <Iframe
              className="absolute w-full h-full top-0 left-0"
              lazy_src={`${EMBED_TO}/movie?id=${detail?.id}`}
              title="Film Video Player"
              allowFullScreen
            ></Iframe>
          </div>
          <div className="mt-5 pb-8">
            <div className="flex justify-between md:text-base text-sm">
              <div className="flex-1">
                {!detail && <Skeleton className="h-8 w-[400px]" />}
                <h1 className="text-white md:text-3xl text-xl font-medium">
                  <Link
                    to={`/movies/${detail?.id}`}
                    className="hover:brightness-75 transition duration-300"
                  >
                    {detail?.title || detail?.name}
                  </Link>
                </h1>
                {!detail && <Skeleton className="w-[100px] h-[23px] mt-5" />}
                {detail && (
                  <div className="flex gap-5 mt-5">
                    <div className="flex gap-2 items-center">
                      <span>{detail?.vote_average}</span>
                      <StarIcon className={"text-primary"}></StarIcon>
                    </div>
                    <div className="flex gap-2 items-center">
                      <CalendarIcon className={"text-primary"}></CalendarIcon>
                      <p>
                        {new Date(detail?.release_date).getFullYear() ||
                          new Date(detail?.first_air_date).getFullYear()}
                      </p>
                    </div>
                  </div>
                )}
                {!detail && <Skeleton className="w-[100px] h-[23px] mt-2" />}
                {detail && (
                  <ul className="flex gap-2 flex-wrap mt-3">
                    {detail?.genres.map((genre) => (
                      <li key={genre.id} className="mb-2">
                        <Link
                          to={`/explore?genre=${genre.id}`}
                          className="px-3 py-1 bg-dark-lighten rounded-full hover:brightness-75 duration-300 transition"
                        >
                          {genre.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
            <div className="md:text-xl text-lg font-medium text-white mt-5">
              Overview:
            </div>
            {!detail && <Skeleton className="h-[84px] mt-2" />}
            {detail && (
              <ReadMore
                limitTextLength={300}
                className="md:text-lg text-base mt-1"
              >
                {detail?.overview || detail?.tagline}
              </ReadMore>
            )}
          </div>
          <Comments></Comments>
        </div>
        <div className="shrink-0 md:max-w-[400px] w-full relative px-6">
          {!isMobile && <SearchBox />}
          <RightSideBar
            name="Recommendations"
            films={recommendations?.filter((item) => item.id !== detail?.id)}
            limitNumber={4}
            isLoading={!recommendations}
            className="md:mt-24 mt-0"
          />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default WatchMovie;
