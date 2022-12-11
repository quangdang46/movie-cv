import React, { useState } from "react";
import { Link } from "react-router-dom";
import { v4 } from "uuid";
import {
  BookmarkIcon,
  BuggerIcon,
  ExploreIcon,
  HistoryIcon,
  HomeIcon,
  LogIcon,
  SearchIcon,
} from "../Icon";

const Home = () => {
  const [open, setOpen] = useState(true);
  const menus = [
    {
      name: "Home",
      link: "/",
      icon: <HomeIcon className="!w-6 !h-6 mr-0"></HomeIcon>,
    },
    { name: "Explore", link: "/explore", icon: <ExploreIcon></ExploreIcon> },
    { name: "Search", link: "/search", icon: <SearchIcon></SearchIcon> },
    { name: "Bookmark", link: "/", icon: <BookmarkIcon></BookmarkIcon> },
    {
      name: "History",
      link: "/",
      icon: <HistoryIcon></HistoryIcon>,
    },
    {
      name: "Login",
      link: "/login",
      icon: <LogIcon></LogIcon>,
      margin: true,
    },
  ];
  return (
    <section className="flex gap-6">
      <div
        className={`bg-[#141414] min-h-screen ${
          open ? "w-60" : "w-16"
        } duration-500 text-gray-100 px-4`}
      >
        <div className="py-3 flex justify-end">
          <BuggerIcon onClick={() => setOpen(!open)} />
        </div>
        <div className="mt-4 flex flex-col gap-4 relative">
          {menus?.map((menu, index) => (
            <Link
              to={menu?.link}
              key={v4()}
              className={` ${
                menu?.margin && "mt-5"
              } group flex items-center text-sm ${
                !open ? "gap-x-0" : "gap-x-3"
              } font-medium p-2 hover:bg-gray-800 rounded-md`}
            >
              {menu?.icon}
              <h2
                style={{
                  transitionDelay: `${index + 3}00ms`,
                }}
                className={`whitespace-pre duration-500 ${
                  !open && "opacity-0 translate-x-28 overflow-hidden"
                }`}
              >
                {menu?.name}
              </h2>
              <h2
                className={`${
                  open && "hidden"
                } absolute left-48 bg-white font-semibold whitespace-pre text-gray-900 rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit`}
              >
                {menu?.name}
              </h2>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Home;
