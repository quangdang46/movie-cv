import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { BasicMenu } from "../BasicMenu";
import { ChevronLeftIcon, LogIcon, SearchIcon, UserIcon } from "../Icon";
import { Image } from "../Lazy";
import { auth } from "../../fire-base/firebase-config";
import { signOut } from "firebase/auth";
import { links, menus } from "../../shared/const";
import { currentUser } from "../../redux/userSlice";
import { useRef } from "react";
import { CSSTransition } from "react-transition-group";
import { v4 } from "uuid";
import { ToggleDarkMode } from "../Button";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const [activeMenu, setActiveMenu] = useState("main");
  const dropdownRef = useRef(null);
  const [show, setShow] = useState(false);
  const handleClick = (props) => {
    props.goToMenu && setActiveMenu(props.goToMenu);
    if (props.cb) {
      props.cb();
    }
  };
  function DropdownItem(props) {
    return (
      <a
        href={props.link}
        className="hover:bg-slate-100 dark:hover:bg-dark-lighten-2 h-12 flex items-center rounded-md p-2 cursor-pointer transition-all duration-500"
        onClick={() => handleClick(props)}
      >
        <span className="p-2 hover:filter-none hidden xs:block">
          {props.leftIcon}
        </span>
        {props.children}
        <span className="ml-auto">{props.rightIcon}</span>
      </a>
    );
  }

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

  const handleSignOut = () => {
    signOut(auth);
    dispatch(currentUser(null));
  };

  return (
    <header
      className={`${
        // isScrolled
        //   ? "bg-[#141414]"
        //   : "bg-gradient-to-tr from-[rgba(0,0,0,0.1)] to-[rgba(0,0,0,0.05)]"
        isScrolled && "bg-gray-500 dark:bg-[#141414]"
      }`}
    >
      <div className="flex items-center space-x-2 md:space-x-10">
        <Link to="/">
          <Image
            lazy_src={`https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/799px-Netflix_2015_logo.svg.png`}
            className="cursor-pointer object-cover flex-shrink-0"
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
                  className="cursor-pointer text-sm font-light text-black dark:text-white transition duration-[.4s] hover:text-gray-200 dark:hover:text-[#b3b3b3]"
                >
                  <Link to={link}>{name}</Link>
                </li>
              );
            })}
        </ul>
      </div>
      <div className="flex items-center gap-x-1 xs:gap-x-3 text-sm font-light">
        <ToggleDarkMode></ToggleDarkMode>
        <p
          onClick={() => navigate("/search")}
          className="cursor-pointer hidden xs:block"
        >
          <SearchIcon></SearchIcon>
        </p>
        {!user && (
          <>
            <div className="cursor-pointer p-1" onClick={() => setShow(!show)}>
              <UserIcon></UserIcon>
            </div>
            <div className="relative">
              <div
                className={`font-montserrat absolute top-10 right-0 w-40 xs:w-80 bg-gray-400 dark:bg-dark-darken rounded-lg p-4 overflow-hidden transition-all duration-500 z-[999] ${
                  show ? "block" : "hidden"
                }`}
                ref={dropdownRef}
              >
                <CSSTransition
                  in={activeMenu === "main"}
                  timeout={500}
                  classNames="menu-primary"
                  unmountOnExit
                >
                  <div className="w-full">
                    <DropdownItem link="/signin">Sign in</DropdownItem>
                    <DropdownItem link="/signup">Sign up</DropdownItem>
                  </div>
                </CSSTransition>
              </div>
            </div>
          </>
        )}
        {user && (
          <>
            <p className="hidden lg:inline">{user.username || user.name}</p>
            <div onClick={() => setShow(!show)} className="p-1">
              <Image
                lazy_src={
                  user.photoURL
                    ? user.photoURL
                    : `https://occ-0-1190-2774.1.nflxso.net/dnm/api/v6/K6hjPJd6cR6FpVELC5Pd6ovHRSk/AAAABbme8JMz4rEKFJhtzpOKWFJ_6qX-0y5wwWyYvBhWS0VKFLa289dZ5zvRBggmFVWVPL2AAYE8xevD4jjLZjWumNo.png?r=a41`
                }
                className="cursor-pointer rounded w-5 h-5 flex-shrink-0"
              ></Image>
            </div>

            <div className="relative">
              <div
                className={`font-montserrat absolute top-10 right-0 w-40 xs:w-80 bg-gray-400 dark:bg-dark-darken rounded-lg p-4 overflow-hidden transition-all duration-500 z-[999] ${
                  show ? "block" : "hidden"
                }`}
                ref={dropdownRef}
              >
                <CSSTransition
                  in={activeMenu === "main"}
                  timeout={500}
                  classNames="menu-primary"
                  unmountOnExit
                >
                  <div className="w-full">
                    <DropdownItem
                      leftIcon={<UserIcon></UserIcon>}
                      goToMenu="account"
                    >
                      Account
                    </DropdownItem>
                    <DropdownItem
                      onClick={handleSignOut}
                      leftIcon={<LogIcon></LogIcon>}
                      cb={handleSignOut}
                    >
                      Logout
                    </DropdownItem>
                  </div>
                </CSSTransition>

                <CSSTransition
                  in={activeMenu === "account"}
                  timeout={500}
                  classNames="menu-secondary"
                  unmountOnExit
                >
                  <div className="w-full">
                    <DropdownItem
                      leftIcon={<ChevronLeftIcon></ChevronLeftIcon>}
                      goToMenu="main"
                    >
                      Back
                    </DropdownItem>
                    {menus.slice(1, menus.length - 1).map((item, _) => (
                      <DropdownItem
                        leftIcon={item.icon}
                        link={item.link}
                        key={v4()}
                      >
                        {item.name}
                      </DropdownItem>
                    ))}
                  </div>
                </CSSTransition>
              </div>
            </div>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
