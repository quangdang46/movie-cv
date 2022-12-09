import React from "react";
import { useParams } from "react-router-dom";
import SimpleBreadcrumbs from "../Breadcrums/SimpleBreadcrumbs";
import { Button } from "../components/Button";
import { v4 } from "uuid";
import StarRatings from "react-star-ratings";
import useGetMovie from "../hooks/useGetMovie";
import { IMAGE_URL } from "../api/configApi";
import { CastList, Similar } from "../components/Cards";
import Label from "../components/Label/Label";
import { Image } from "../components/Image";
const MovieDetail = () => {
  const { id } = useParams();
  const {
    backdropPath,
    title,
    voteAverage,
    overview,
    releaseDate,
    runtime,
    tagline,
    genres,
    posterPath,
    voteCount,
  } = useGetMovie({ id });
  return (
    <div
      style={{
        backgroundImage:
          `url(` + IMAGE_URL + "/original" + backdropPath || posterPath + `)`,
      }}
      className="bg-cover bg-center bg-no-repeat bg-fixed min-h-screen text-white "
    >
      <div className="overlay absolute inset-0 bg-gradient-to-t from-[rgba(0,0,0,0.5)] to-[rgba(0,0,0,0.2)] rounded-lg z-10"></div>
      <div className="absolute z-50 inset-0 py-10 2xl:max-w-screen-2xl 2xl:mx-auto px-2 sm:px-10 2xl:px-0">
        <div className="2xl:flex gap-x-5 items-stretch">
          <div className="hidden 2xl:block 2xl:shrink-0 w-full h-[600px] 2xl:h-auto 2xl:max-w-[400px] rounded-lg">
            <Image
              lazy_src={`${IMAGE_URL}/w500${posterPath || backdropPath}`}
              className="w-full h-full object-cover rounded-lg"
            ></Image>
          </div>
          <div className="">
            <SimpleBreadcrumbs></SimpleBreadcrumbs>
            <div className="mt-5 flex justify-between text-center 2xl:text-start">
              <div style={{ width: "-webkit-fill-available" }}>
                <p className="text-2xl sm:text-5xl md:text-8xl font-bold text-shadow-lg">
                  {title}
                  <span className="text-xl sm:text-3xl md:text-5xl text-shadow-lg overflow-hidden">
                    {`(${new Date(releaseDate).getFullYear()})`}
                  </span>
                </p>
                <div className="block w-auto h-[300px] sm:h-[500px] md:h-[700px] xl:h-[900px] 2xl:h-auto 2xl:hidden rounded-lg p-3 sm:p-5 lg:p-10">
                  <Image
                    lazy_src={`${IMAGE_URL}/w500${posterPath || backdropPath}`}
                    className="w-full h-full object-cover rounded-lg"
                  ></Image>
                </div>
                <p className="mt-6 text-2xl line-clamp-1 sm:line-clamp-none text-shadow-lg">
                  {tagline || "No tagline"}
                </p>
                <p className="mt-4 text-2xl line-clamp-1 sm:line-clamp-none text-shadow-lg">
                  {`0${(runtime / 60) ^ 0}`.slice(-2)}h{" "}
                  {`0${runtime % 60}`.slice(-2)}m
                </p>
              </div>
              <div className="hidden 2xl:flex flex-col gap-y-2 justify-center text-yellow-500 bg-slate-600 px-5 rounded-lg text-shadow w-auto">
                <div className="flex items-center gap-x-4">
                  <span className="text-7xl font-bold">{voteAverage}</span>
                  <div className="flex flex-col">
                    <span className="text-4xl">/10</span>
                    <span className="text-lg mt-1">{voteCount} votes</span>
                  </div>
                </div>
                <div className="flex items-center gap-x-2">
                  <span className="text-lg flex-shrink-0">Rated this</span>
                  <div className="flex-1">
                    <StarRatings
                      rating={voteAverage || 10}
                      starRatedColor="#e74c3c"
                      numberOfStars={10}
                      name="rating"
                      starDimension="20px"
                      starSpacing="2px"
                    />
                  </div>
                </div>
              </div>
            </div>
            <p className="mt-6 text-lg leading-8 line-clamp-4 sm:line-clamp-4 md:line-clamp-none">
              {overview}
            </p>
            <div className="flex items-center gap-x-5 mt-5 flex-wrap justify-center 2xl:justify-start">
              {genres &&
                genres.map((genre, index) => (
                  <span
                    key={v4()}
                    className="m-1 py-1 px-3 text-lg font-bold border-primary text-secondary border rounded"
                  >
                    {genre.name}
                  </span>
                ))}
            </div>
            <div className="flex 2xl:hidden items-center justify-center gap-x-3 mt-2">
              <StarRatings
                rating={voteAverage || 10}
                starRatedColor="#e74c3c"
                numberOfStars={10}
                name="rating"
                starDimension="20px"
                starSpacing="2px"
              />
              <div className="leading-normal text-shadow-lg">{`(${
                voteCount || 0
              } vote)`}</div>
            </div>
            <div className="mt-4">
              <Button content={"Watch now"} isWatching={true} id={id}></Button>
            </div>
          </div>
        </div>
        <div className="mt-10">
          <Label title={"Cast"} isLink={false}></Label>
          <CastList id={id} className={"mt-5"}></CastList>
        </div>
        <div className="mt-10">
          <Label title={"Similar movies"} isLink={false}></Label>
          <Similar id={id}></Similar>
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;
