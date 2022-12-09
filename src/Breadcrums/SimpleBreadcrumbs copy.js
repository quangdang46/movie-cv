import React from "react";
import { Link as RouterLink, useLocation } from "react-router-dom";

const SimpleBreadcrumbs = () => {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);
  return (
    // breadcrumb and use tailwindcss css operator
    <div className="mt-2">
      <RouterLink to="/">Home</RouterLink>
      {pathnames.map((value, index) => {
        const last = index === pathnames.length - 1;
        const to = `/${pathnames.slice(0, index + 1).join("/")}`;
        return last ? (
          <span key={to} className="text-gray-500">
            {" "}
            / {value}
          </span>
        ) : (
          <RouterLink key={to} to={to} className="text-gray-500">
            {" "}
            / {value}
          </RouterLink>
        );
      })}
    </div>
  );
};

export default SimpleBreadcrumbs;
