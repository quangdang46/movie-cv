import { createContext, useRef } from "react";

const MovieContext = createContext({});

const MovieProvider = ({ children }) => {
  const prevRef = useRef();
  const nextRef = useRef();

  const values = {
    prevRef,
    nextRef,
  };

  return (
    <MovieContext.Provider value={values}>{children}</MovieContext.Provider>
  );
};

export { MovieContext, MovieProvider };
