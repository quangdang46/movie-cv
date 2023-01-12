import React from "react";
import { Link } from "react-router-dom";
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
      <button onClick={onClick}>
        <BuggerIcon size={25} />
      </button>
    </div>
  );
};

export default TopSideBar;
