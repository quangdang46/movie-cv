import React from "react";
// fix responsive
const Banner = () => {
  return (
    <div
      className="flex items-center mt-4 bg-black/10 bg-blend-multiply rounded-3xl h-80 overflow-hidden bg-cover bg-center p-5 sm:p-10 text-white relative "
      style={{
        backgroundImage:
          'url("https://i.ytimg.com/vi/a6VVrAZUnsc/maxresdefault.jpg")',
      }}
    >
      <div className="overlay absolute inset-0 bg-gradient-to-t from-[rgba(0,0,0,0.5)] to-[rgba(0,0,0,0.5)] rounded-lg"></div>
      <div className="flex items-center gap-x-[30px] rounded-lg absolute z-50">
        <div className="h-[250px] w-[200px] lg:w-[250px] rounded-lg  hidden md:block">
          <img
            src="https://image.thanhnien.vn/w1024/Uploaded/2022/ygtmjz/2022_05_11/avatar-poster-9275.jpg"
            alt=""
            className="w-full h-full object-cover rounded-lg"
          />
        </div>
        <div className="sm:p-4">
          <h1 className="capitalize text-2xl font-bold">
            Avatar: The Way Of Water
          </h1>
          <p className="mt-2">2022 - 1h 58m</p>
          <p className="mt-2 leading-6 max-w-md hidden sm:block">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor qui
            eveniet vero eum possimus quod modi, iste, nihil similique cum
          </p>
          <div className="mt-2 flex items-center gap-x-2">
            <span className="py-1 px-2 bg-[#cfcfcf5e] rounded-md">Action</span>
            <span className="py-1 px-2 bg-[#cfcfcf5e] rounded-md">Action</span>
            <span className="py-1 px-2 bg-[#cfcfcf5e] rounded-md">Action</span>
          </div>
          <div className="mt-5 flex items-stretch gap-x-3">
            <button className="bg-[#cfcfcf5e] px-6 py-2 xl:px-8 xl:py-3 rounded-lg text-xl font-sans">
              Trailer
            </button>
            <button className="bg-primary px-6 py-2 xl:px-8 xl:py-3 rounded-lg text-xl font-sans">
              Watch Movie
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
