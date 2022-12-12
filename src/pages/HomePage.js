import React from "react";
import { Row } from "../components/Row";

const movies = [
  {
    id: 1,
    title: "Popular Movies",
    type: "popular",
  },
  {
    id: 2,
    title: "Up comming",
    type: "upcoming",
  },
  {
    id: 3,
    title: "Top Rated",
    type: "top_rated",
  },
  {
    id: 4,
    title: "Now Playing",
    type: "now_playing",
  },
  {
    id: 5,
    title: "Latest",
    type: "latest",
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
