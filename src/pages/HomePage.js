import React from "react";
import { Row } from "../components/Row";

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
    type: "TOPRATED",
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
          <Row title={movie.title} key={movie.id} type={movie.type}></Row>
        ))}
    </>
  );
};

export default HomePage;
