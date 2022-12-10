import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BasicMenu } from "../BasicMenu";
import { RingIcon, SearchIcon } from "../Icon";
import { Image } from "../Image";
const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  const links = [
    { name: "Home", link: "/" },
    { name: "TV Shows", link: "/tv" },
    { name: "Movies", link: "/movies" },
    { name: "My List", link: "/mylist" },
  ];
  return (
    <header className={`${isScrolled && "bg-[#141414]"}`}>
      <div className="flex items-center space-x-2 md:space-x-10">
        <Image
          lazy_src={`https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/799px-Netflix_2015_logo.svg.png`}
          className="cursor-pointer object-contain"
          width={100}
          height={100}
        ></Image>
        <BasicMenu></BasicMenu>
        <ul className="hidden space-x-4 md:flex">
          {links.map(({ name, link }) => {
            return (
              <li
                key={name}
                className="cursor-pointer text-sm font-light text-[#e5e5e5] transition duration-[.4s] hover:text-[#b3b3b3]"
              >
                <Link to={link}>{name}</Link>
              </li>
            );
          })}
        </ul>
      </div>
      <div className="flex items-center space-x-4 text-sm font-light">
        <SearchIcon onClick={() => navigate("/search")}></SearchIcon>
        <p className="hidden lg:inline">Kids</p>
        <RingIcon></RingIcon>
        <Link href="/account">
          <Image
            lazy_src={`https://occ-0-1190-2774.1.nflxso.net/dnm/api/v6/K6hjPJd6cR6FpVELC5Pd6ovHRSk/AAAABbme8JMz4rEKFJhtzpOKWFJ_6qX-0y5wwWyYvBhWS0VKFLa289dZ5zvRBggmFVWVPL2AAYE8xevD4jjLZjWumNo.png?r=a41`}
            className="cursor-pointer rounded w-5 h-5"
          ></Image>
        </Link>
      </div>
    </header>
  );
};

export default Header;
