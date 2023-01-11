import React from "react";

const Tag = ({ className, onClick = () => {}, children }) => {
  return (
    <button
      className={`text-lg font-bold cursor-pointer px-4 py-1 border rounded-full hover:brightness-75 transition duration-300 inline-block ${className}`}
      // className="m-1 py-1 px-3 text-lg font-bold border-primary text-secondary border rounded"
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Tag;
