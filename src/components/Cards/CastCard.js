import React from 'react';

const CastCard = () => {
  return (
    <div className="relative rounded-xl overflow-hidden">
      <img
        src="https://www.jolie.de/sites/default/files/styles/image_gallery360w/public/2020-02/leonardo-dicaprio-oscars.jpg?h=64dbc2fc&itok=EH0B3oo4"
        className="object-cover h-full w-full -z-10"
        alt=""
      />
      <div className="absolute top-0 h-full w-full bg-gradient-to-t from-black/50 p-3 flex flex-col justify-between">
        <a
          href="/"
          className="p-2.5 bg-gray-800/80 bg-white rounded-lg text-white self-end hover:bg-red-600/80"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
              clipRule="evenodd"
            />
          </svg>
        </a>
        <div className="self-center flex flex-col items-center space-y-2">
          <span className="capitalize text-white font-medium drop-shadow-md">
            Leonardo DiCaprio
          </span>
          <span className="text-gray-100 text-xs">+12 Movies</span>
        </div>
      </div>
    </div>
  );
};

export default CastCard;