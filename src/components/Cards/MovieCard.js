import React from "react";

const MovieCard = () => {
  return (
    <div className="flex flex-col dark:border-zinc-600 p-4 bg-slate-100 rounded-xl">
      <div className="h-[200px]">
        <img
          src="https://www.wdwinfo.com/wp-content/uploads/2022/10/avatar-way-of-water.jpeg"
          alt=""
          className="w-full h-full object-cover rounded-xl"
        />
      </div>
      <div className="mt-3 text-center">
        <p className="font-bold text-sm">Avatar: The Way Of Water</p>
        <div className="mt-2 flex items-center gap-x-1 justify-center">
          <span className="px-2 py-1 border-2 rounded-xl text-xs font-bold">
            Action
          </span>
          <span className="px-2 py-1 border-2 rounded-xl text-xs font-bold">
            Action
          </span>
          <span className="px-2 py-1 border-2 rounded-xl text-xs font-bold">
            Action
          </span>
        </div>
        <div className="flex items-center justify-center mt-2 gap-x-1 text-yellow-500">
          <span className="font-bold text-base">9.8</span>
          <span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-4 h-4"
            >
              <path
                fillRule="evenodd"
                d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                clipRule="evenodd"
              />
            </svg>
          </span>
        </div>
        <button className="bg-secondary px-6 py-2 xl:px-8 xl:py-3 rounded-lg text-xl font-sans mt-2">
          Watch Movie
        </button>
      </div>
    </div>
  );
};

export default MovieCard;
