import React from "react";
import { Link } from "react-router-dom";
import { ToggleDarkMode } from "../Button";
import { BuggerIcon } from "../Icon";
import { Image } from "../Lazy";

const TopSideBar = ({ onClick = () => {} }) => {
  return (
    <div className="flex md:hidden justify-between items-center px-5 my-5">
      <Link to="/">
        <Image
          lazy_src={`https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/799px-Netflix_2015_logo.svg.png`}
          className="cursor-pointer object-contain"
          width={100}
          height={100}
        ></Image>
      </Link>
      <div className="flex items-center gap-x-2">
        <ToggleDarkMode></ToggleDarkMode>
        <button onClick={onClick} className="w-7 h-7">
          <BuggerIcon />
        </button>
      </div>
    </div>
  );
};

export default TopSideBar;
