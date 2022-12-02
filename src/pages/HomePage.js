import React from "react";
import { MovieList } from "../components/Cards";
import { LabelList } from "../components/Label";
import { Wrapper } from "../components/Wrapper";
import { MovieProvider } from "../context/MovieContext";

const HomePage = () => {
  return (
    <>
      <Wrapper className={"mt-9 relative h-[450px]"}>
        <MovieProvider>
          <LabelList title={"Popular movies"} type={"POPULAR"}></LabelList>
          <MovieList category={"POPULAR"}></MovieList>
        </MovieProvider>
      </Wrapper>
      <Wrapper className={"mt-9 relative h-[450px]"}>
        <MovieProvider>
          <LabelList title={"Now playing"} type={"NOW_PLAYING"}></LabelList>
          <MovieList category={"NOW_PLAYING"}></MovieList>
        </MovieProvider>
      </Wrapper>
    </>
  );
};

export default HomePage;
