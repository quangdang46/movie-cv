import React from "react";
import { MovieList } from "../components/Cards";
import { LabelList } from "../components/Label";
import { Wrapper } from "../components/Wrapper";
import { MovieProvider } from "../context/MovieContext";

const HomePage = () => {
  return (
    <>
      <Wrapper className={"mt-9"}>
        <MovieProvider>
          <LabelList title={"Popular movies"}></LabelList>
          <MovieList></MovieList>
        </MovieProvider>
      </Wrapper>
      <Wrapper className={"mt-9"}>
        <MovieProvider>
          <LabelList title={"Now playing"}></LabelList>
          <MovieList category={"NOW_PLAYING"}></MovieList>
        </MovieProvider>
      </Wrapper>
    </>
  );
};

export default HomePage;
