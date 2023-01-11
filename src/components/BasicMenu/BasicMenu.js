import React from "react";
import { useState } from "react";
import { links } from "../../shared/routeLink";
import { v4 } from "uuid";
import { Link } from "react-router-dom";

const BasicMenu = () => {
  const [open, setOpen] = useState(false);

  const handleClick = (event) => {
    setOpen(!open);
  };

  return (
    <div className="md:!hidden">
      <button
        className="items-center rounded text-white inline-flex text-sm font-medium justify-center leading-6 text-center capitalize"
        onClick={handleClick}
      >
        Browse
      </button>
      {open && (
        <div className="relative">
          <ul className="m-0 p-0 absolute pt-2 pb-2 outline-none list-none flex flex-col bg-white rounded transition-all font-medium">
            {links
              .filter(({ link }) => !window.location.pathname.includes(link))
              .map(({ name, link }, _) => (
                <Link
                  to={link}
                  key={v4()}
                  className="text-base px-4 py-2 font-sans capitalize min-w-max text-slate-800 hover:bg-[rgba(0,0,0,0.04)]"
                >
                  {name}
                </Link>
              ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default BasicMenu;
