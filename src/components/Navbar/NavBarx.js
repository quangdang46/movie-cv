import { Button, Menu, MenuItem } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
const Navbarx = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
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
        <img
          src="https://images.unsplash.com/photo-1601158935942-52255782d322?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=736&q=80"
          width={100}
          height={100}
          className="cursor-pointer object-contain w-10 h-10"
          alt=""
        />

        {/* <BasicMenu />
         */}
        <div className="md:!hidden">
          <Button
            id="basic-button"
            aria-controls={open ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
            className="!capitalize !text-white"
          >
            Browse
          </Button>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            className="menu"
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            <MenuItem onClick={handleClose}>Home</MenuItem>
            <MenuItem onClick={handleClose}>TV Shows</MenuItem>
            <MenuItem onClick={handleClose}>Movies</MenuItem>
            <MenuItem onClick={handleClose}>New & Popular</MenuItem>
            <MenuItem onClick={handleClose}>My List</MenuItem>
          </Menu>
        </div>

        {/*  */}

        <ul className="hidden space-x-4 md:flex">
          {links.map(({ name, link }) => {
            return (
              <li key={name} className="headerLink">
                <Link to={link}>{name}</Link>
              </li>
            );
          })}
        </ul>
      </div>
      <div className="flex items-center space-x-4 text-sm font-light">
        <span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="sm hidden h-6 w-6 sm:inline"
          >
            <path
              fillRule="evenodd"
              d="M10.5 3.75a6.75 6.75 0 100 13.5 6.75 6.75 0 000-13.5zM2.25 10.5a8.25 8.25 0 1114.59 5.28l4.69 4.69a.75.75 0 11-1.06 1.06l-4.69-4.69A8.25 8.25 0 012.25 10.5z"
              clipRule="evenodd"
            />
          </svg>
        </span>
        <p className="hidden lg:inline">Kids</p>
        <span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-6 h-6"
          >
            <path
              fillRule="evenodd"
              d="M5.25 9a6.75 6.75 0 0113.5 0v.75c0 2.123.8 4.057 2.118 5.52a.75.75 0 01-.297 1.206c-1.544.57-3.16.99-4.831 1.243a3.75 3.75 0 11-7.48 0 24.585 24.585 0 01-4.831-1.244.75.75 0 01-.298-1.205A8.217 8.217 0 005.25 9.75V9zm4.502 8.9a2.25 2.25 0 104.496 0 25.057 25.057 0 01-4.496 0z"
              clipRule="evenodd"
            />
          </svg>
        </span>
        <Link href="/account">
          <img
            src="https://images.unsplash.com/photo-1481349518771-20055b2a7b24?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1539&q=80"
            alt=""
            className="cursor-pointer rounded w-5 h-5"
          />
        </Link>
      </div>
    </header>
  );
};

export default Navbarx;
