import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import SimpleBreadcrumbs from "../Breadcrums/SimpleBreadcrumbs";
import { Button } from "../components/Button";
import { v4 } from "uuid";
import StarRatings from "react-star-ratings";
import { IMAGE_URL } from "../api/configApi";
import { Tag } from "../components/Tag";
import {
  CastList,
  InfiniteSlide,
  MediaMeta,
  Similar,
} from "../components/Cards";
import Label from "../components/Label/Label";
import { Image } from "../components/Lazy";
import ReadMore from "../components/ReadMore/ReadMore";
import { useQuery } from "@tanstack/react-query";
import { getMovieFullDetail } from "../service/movieService";
import { Skeleton } from "../components/Skeleton";
import { ReviewBox } from "../components/ReviewBox";
const MovieDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data, isError, error } = useQuery(["movieDetail", id], () =>
    getMovieFullDetail(id)
  );
  if (isError) {
    return <div>{error.message}</div>;
  }
  if (!data) {
    return <div>Loading...</div>;
  }
  const { detail, credits, reviews, similar, videos, posters } = data;

  return (
    <div
      style={{
        backgroundImage: detail.backdrop_path
          ? `url(` + IMAGE_URL + "/original" + detail.backdrop_path + `)`
          : `url(` + IMAGE_URL + "/original" + detail.poster_path + `)`,
      }}
      className="bg-cover bg-center bg-no-repeat bg-fixed min-h-screen text-white "
    >
      <div className="overlay absolute inset-0 bg-gradient-to-t from-[rgba(0,0,0,0.5)] to-[rgba(0,0,0,0.2)] rounded-lg z-10"></div>
      <div className="absolute z-50 inset-0 py-10 2xl:max-w-screen-2xl 2xl:mx-auto px-2 sm:px-10 2xl:px-0">
        <div className="2xl:flex gap-x-5 items-stretch">
          <div className="hidden 2xl:block 2xl:shrink-0 w-full h-[600px] 2xl:h-auto 2xl:max-w-[400px] rounded-lg">
            {!detail && (
              <Skeleton className="w-full h-ful rounded-lg"></Skeleton>
            )}
            {detail && (
              <Image
                lazy_src={`${IMAGE_URL}/w500${
                  detail.poster_path || detail.backdrop_path
                }`}
                className="w-full h-full object-cover rounded-lg"
              ></Image>
            )}
          </div>
          <div className="">
            <SimpleBreadcrumbs></SimpleBreadcrumbs>
            <div className="mt-5 flex justify-between text-center 2xl:text-start">
              <div style={{ width: "-webkit-fill-available" }}>
                {!detail && (
                  <Skeleton className="w-[600px] h-[200px]">
                    <Skeleton className="w-[200px] h-[300px]"></Skeleton>
                  </Skeleton>
                )}
                {detail && (
                  <p className="text-2xl sm:text-5xl md:text-8xl font-bold text-shadow-lg">
                    {detail.title}
                    <span className="text-xl sm:text-3xl md:text-5xl text-shadow-lg overflow-hidden">
                      {`(${new Date(detail.release_date).getFullYear()})`}
                    </span>
                  </p>
                )}
                <div className="block w-auto h-[300px] sm:h-[500px] md:h-[700px] xl:h-[900px] 2xl:h-auto 2xl:hidden rounded-lg p-3 sm:p-5 lg:p-10">
                  {!detail && (
                    <Skeleton className="w-full h-ful rounded-lg"></Skeleton>
                  )}
                  {detail && (
                    <Image
                      lazy_src={`${IMAGE_URL}/w500${
                        detail.poster_path || detail.backdrop_path
                      }`}
                      className="w-full h-full object-cover rounded-lg"
                    ></Image>
                  )}
                </div>
                {!detail && (
                  <Skeleton className="mt-6 w-[200px] h-[300px]"></Skeleton>
                )}
                {detail && (
                  <ReadMore
                    limitTextLength={200}
                    className="mt-6 text-2xl text-shadow-lg"
                  >
                    Tagline: {detail.tagline || "No tagline"}
                  </ReadMore>
                )}
                {!detail && (
                  <Skeleton className="mt-4 w-[300px] h-[100px]"></Skeleton>
                )}
                {detail && (
                  <p className="mt-4 text-2xl line-clamp-1 sm:line-clamp-none text-shadow-lg">
                    Runtime: {`0${(detail.runtime / 60) ^ 0}`.slice(-2)}h{" "}
                    {`0${detail.runtime % 60}`.slice(-2)}m
                  </p>
                )}
              </div>
              <div className="hidden 2xl:flex flex-col gap-y-2 justify-center text-orange-500 px-5 text-shadow w-auto box">
                {!detail && (
                  <Skeleton className="flex items-center gap-x-4">
                    <Skeleton className="w-20 h-20"></Skeleton>
                    <Skeleton className="flex flex-col">
                      <Skeleton className="w-20 h-10"></Skeleton>
                      <Skeleton className="w-20 h-5"></Skeleton>
                    </Skeleton>
                  </Skeleton>
                )}
                {detail && (
                  <div className="flex items-center gap-x-4">
                    <span className="text-7xl font-bold">
                      {detail.vote_average / 2}
                    </span>
                    <div className="flex flex-col">
                      <span className="text-4xl">/5</span>
                      <span className="text-lg mt-1">
                        {detail.vote_count} votes
                      </span>
                    </div>
                  </div>
                )}
                {!detail && (
                  <Skeleton className="flex items-center gap-x-2">
                    <Skeleton className="w-20 h-5"></Skeleton>
                    <Skeleton className="w-20 h-5"></Skeleton>
                  </Skeleton>
                )}
                {detail && (
                  <div className="flex items-center gap-x-2">
                    <span className="text-lg flex-shrink-0">Rated this</span>
                    <div className="flex-1 flex-shrink-0">
                      <StarRatings
                        rating={detail.vote_average / 2 || 5}
                        starRatedColor="#e74c3c"
                        numberOfStars={5}
                        name="rating"
                        starDimension="20px"
                        starSpacing="2px"
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
            {!detail && <Skeleton className="mt-6 w-full h-[300px]"></Skeleton>}
            {detail && (
              <ReadMore
                limitTextLength={300}
                className="mt-6 text-lg leading-8"
              >
                {"Story: " + detail.overview}
              </ReadMore>
            )}
            {!detail && (
              <Skeleton className="mt-6 w-[200px] h-[300px]"></Skeleton>
            )}
            {detail && (
              <p className="mt-6 text-lg text-shadow-lg">
                Spoken language:{" "}
                {detail.spoken_languages.map((lang) => lang.name).join(", ")}
              </p>
            )}
            <div className="flex items-center gap-x-5 mt-5 flex-wrap justify-center 2xl:justify-start">
              {!detail &&
                Array(3)
                  .fill(0)
                  .map((_, index) => (
                    <Skeleton
                      key={v4()}
                      className="mt-6 w-[200px] h-[300px]"
                    ></Skeleton>
                  ))}
              {detail &&
                detail.genres.length > 0 &&
                detail.genres.map((genre, index) => (
                  <Tag
                    key={v4()}
                    onClick={() => navigate(`/explore?genre=${genre.id}`)}
                    className="border-primary text-secondary"
                  >
                    {genre.name}
                  </Tag>
                ))}
            </div>
            {!detail && (
              <Skeleton className="mt-6 w-[500px] h-[300px]"></Skeleton>
            )}
            {detail && (
              <div className="flex 2xl:hidden items-center justify-center gap-x-3 mt-2">
                <StarRatings
                  rating={detail.vote_average / 2 || 5}
                  starRatedColor="#e74c3c"
                  numberOfStars={5}
                  name="rating"
                  starDimension="20px"
                  starSpacing="2px"
                />
                <div className="leading-normal text-shadow-lg">{`(${
                  detail.vote_count || 0
                } vote)`}</div>
              </div>
            )}
            {detail && (
              <div className="mt-4">
                <Button
                  content={"Watch now"}
                  isWatching={true}
                  id={id}
                ></Button>
              </div>
            )}
          </div>
        </div>
        <div className="mt-10">
          <Label title={"Cast"} isLink={false}></Label>
          {!detail &&
            Array(10)
              .fill(0)
              .map((_, index) => (
                <Skeleton
                  key={v4()}
                  className="mt-6 w-[200px] h-[300px]"
                ></Skeleton>
              ))}
          {detail && <CastList credits={credits} className={"mt-5"}></CastList>}
        </div>

        <div className="mt-10">
          <Label title={"Video"} isLink={false}></Label>
          {detail && <MediaMeta meta={videos}></MediaMeta>}
        </div>
        <div className="mt-10">
          <Label title={"Poster"} isLink={false}></Label>
          {detail && <InfiniteSlide meta={posters}></InfiniteSlide>}
        </div>
        <div className="mt-10">
          <Label title={"Similar movies"} isLink={false}></Label>
          {!detail &&
            Array(10)
              .fill(0)
              .map((_, index) => (
                <Skeleton
                  key={v4()}
                  className="mt-6 w-[200px] h-[300px]"
                ></Skeleton>
              ))}
          {detail && <Similar similar={similar}></Similar>}
        </div>

        <div className="mt-10">
          <Label title={"Review"} isLink={false}></Label>
          {!detail &&
            Array(10)
              .fill(0)
              .map((_, index) => (
                <Skeleton
                  key={v4()}
                  className="mt-6 w-[200px] h-[300px]"
                ></Skeleton>
              ))}
          {detail && <ReviewBox reviews={reviews}></ReviewBox>}
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;
