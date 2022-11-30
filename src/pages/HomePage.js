import React from "react";
import { CastList, MovieList } from "../components/Cards";
import { LabelList } from "../components/Label";

const HomePage = () => {
  return (
    <>
      <section className="mt-9">
        <LabelList title={"Popular movies"}></LabelList>
        <MovieList></MovieList>
      </section>
      <section className="mt-9">
        <LabelList title={"Now playing"}></LabelList>
        <MovieList category={"NOW_PLAYING"}></MovieList>
      </section>
    </>
  );
};

export default HomePage;
