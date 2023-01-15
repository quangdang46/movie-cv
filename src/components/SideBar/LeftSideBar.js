import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { v4 } from "uuid";
import { useViewportView } from "../../hooks/useViewportView";
import { menus } from "../../shared/const";
import { BuggerIcon } from "../Icon";
import { Image } from "../Lazy";
const LeftSideBar = ({ show, setShow }) => {
  const { width, isMobile } = useViewportView();
  const [open, setOpen] = useState(true);
  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate();
  const cb = (requiredLogin, link) => {
    if (requiredLogin && !user) {
      toast.error("You need to login to access this page");
      return;
    }
    navigate(link);
  };

  useEffect(() => {
    if (width < 1024) {
      setOpen(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [width]);
  return (
    <div
      className={`flex gap-6 shrink-0 md:translate-x-0 md:bg-transparent md:shadow-none -translate-x-full shadow-md transition duration-500 z-50 top-0 ${
        show && "translate-x-0"
      } ${isMobile && "fixed"}`}
    >
      <div
        className={`bg-dark-lighten min-h-screen ${
          open ? "w-60" : "w-16"
        } duration-500 text-gray-100 px-4`}
      >
        <div className="py-3 flex justify-between">
          {open && (
            <Link to="/">
              <Image
                lazy_src={`https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/799px-Netflix_2015_logo.svg.png`}
                className="cursor-pointer object-cover flex-shrink-0"
                width={100}
                height={100}
              ></Image>
            </Link>
          )}
          <BuggerIcon onClick={() => setOpen(!open)} />
        </div>
        <div className="mt-4 flex flex-col gap-4 relative">
          {menus?.map(({ requiredLogin, ...menu }, index) => (
            <div
              // to={`${menu?.link}`}
              onClick={() => cb(requiredLogin, menu?.link)}
              key={v4()}
              className={` ${
                menu?.margin && "mt-7"
              } group flex items-center text-sm cursor-pointer ${
                !open ? "gap-x-0 justify-center" : "gap-x-3"
              } font-medium p-3 hover:bg-gray-800 rounded-md`}
            >
              {menu?.icon}
              <p
                style={{
                  transitionDelay: `${index + 3}00ms`,
                }}
                className={`whitespace-pre duration-500 ${
                  !open && "opacity-0 translate-x-28 overflow-hidden"
                }`}
              >
                {menu?.name}
              </p>
              {!isMobile && (
                <p
                  className={`${
                    open && "hidden"
                  } absolute left-48 bg-white font-semibold whitespace-pre text-gray-900 rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit z-50`}
                >
                  {menu?.name}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LeftSideBar;
