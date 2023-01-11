import React from "react";
import { Row } from "../components/Row";
import { categories } from "../shared/const";

const HomePage = () => {
  return (
    <>
      {categories &&
        categories.map((movie) => (
          <Row title={movie.title} key={movie.id} type={movie.type}></Row>
        ))}
    </>
  );
};

export default HomePage;
