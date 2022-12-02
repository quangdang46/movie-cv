import React from "react";
import { v4 } from "uuid";
import { MovieList } from "../components/Cards";
import { LabelList } from "../components/Label";
import { Wrapper } from "../components/Wrapper";
import { MovieProvider } from "../context/MovieContext";
const movies = [
  {
    id: 1,
    title: "Popular Movies",
    type: "POPULAR",
  },
  {
    id: 2,
    title: "Up comming",
    type: "UPCOMING",
  },
  {
    id: 3,
    title: "Top Rated",
    type: "TOP_RATED",
  },
  {
    id: 4,
    title: "Now Playing",
    type: "NOWPLAYING",
  },
];
const HomePage = () => {
  return (
    <>
      {movies &&
        movies.length > 0 &&
        movies.map((movie) => (
          <Wrapper className={"mt-9 relative h-[450px]"} key={v4()}>
            <MovieProvider>
              <LabelList title={movie.title} type={movie.type}></LabelList>
              <MovieList category={movie.type}></MovieList>
            </MovieProvider>
          </Wrapper>
        ))}
    </>
  );
};

export default HomePage;
