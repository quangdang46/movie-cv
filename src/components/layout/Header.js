import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { BasicMenu } from "../BasicMenu";
import { LogIcon, SearchIcon, UserIcon } from "../Icon";
import { Image } from "../Lazy";
import { useViewportView } from "../../hooks/useViewportView";
import useClickOutSide from "../../hooks/useClickOutSide";
import { auth } from "../../fire-base/firebase-config";
import { signOut } from "firebase/auth";
import { links } from "../../shared/const";
const Header = ({ isSearch = true }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);
  const { isMobile } = useViewportView();
  const { show, setShow, nodeRef } = useClickOutSide();
  const {
    show: showBox,
    setShow: setShowBox,
    nodeRef: boxRef,
  } = useClickOutSide();

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
  // if (!user.payload) {
  //   return;
  // }

  return (
    <header className={`${isScrolled && "bg-[#141414]"}`}>
      <div className="flex items-center space-x-2 md:space-x-10">
        <Link to="/">
          <Image
            lazy_src={`https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/799px-Netflix_2015_logo.svg.png`}
            className="cursor-pointer object-contain"
            width={100}
            height={100}
          ></Image>
        </Link>
        <BasicMenu></BasicMenu>
        <ul className="hidden space-x-4 md:flex">
          {links
            .filter(({ link }) => !window.location.pathname.includes(link))
            .map(({ name, link }) => {
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
        {isSearch && (
          <SearchIcon onClick={() => navigate("/search")}></SearchIcon>
        )}
        {!user && (
          <div
            className="relative cursor-pointer"
            ref={nodeRef}
            onClick={() => setShow(!show)}
          >
            <UserIcon></UserIcon>
            {!isMobile && show && (
              <div className="absolute right-0 top-10 bg-dark-darken flex flex-col gap-2 p-3 min-w-max rounded z-30">
                <button
                  className="py-2 px-10 text-xl rounded leading-none border hover:bg-dark-lighten"
                  onClick={() => {
                    navigate("/signin");
                  }}
                >
                  Sign in
                </button>
                <button
                  className="py-2 px-10 text-xl rounded leading-none border hover:bg-dark-lighten"
                  onClick={() => {
                    navigate("/signup");
                  }}
                >
                  Sign up
                </button>
              </div>
            )}
          </div>
        )}

        {user && (
          <>
            <p className="hidden lg:inline">{user.name}</p>
            <div
              className="relative cursor-pointer"
              ref={boxRef}
              onClick={() => setShowBox(!showBox)}
            >
              <Image
                lazy_src={
                  user.photoURL
                    ? user.photoURL
                    : `https://occ-0-1190-2774.1.nflxso.net/dnm/api/v6/K6hjPJd6cR6FpVELC5Pd6ovHRSk/AAAABbme8JMz4rEKFJhtzpOKWFJ_6qX-0y5wwWyYvBhWS0VKFLa289dZ5zvRBggmFVWVPL2AAYE8xevD4jjLZjWumNo.png?r=a41`
                }
                className="cursor-pointer rounded w-5 h-5 pointer-events-none"
              ></Image>

              {showBox && !isMobile && (
                <div className="absolute right-0 top-10 bg-dark-darken flex flex-col gap-2 p-3 min-w-max rounded z-30">
                  <button
                    className="py-2 px-10 text-xl rounded leading-none border hover:bg-dark-lighten flex gap-4 items-center justify-center"
                    onClick={() => {
                      navigate("/account");
                    }}
                  >
                    <UserIcon></UserIcon>
                    <span>Account</span>
                  </button>
                  <button
                    className="py-2 px-10 text-xl rounded leading-none border hover:bg-dark-lighten flex gap-4 items-center justify-center"
                    onClick={() => {
                      signOut(auth);
                    }}
                  >
                    <LogIcon></LogIcon>
                    <span>Logout</span>
                  </button>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
