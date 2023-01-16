import React from "react";
import { Link as RouterLink, useLocation } from "react-router-dom";
import { v4 } from "uuid";
import { BreadcrumbsIcon, HomeIcon } from "../components/Icon";
import PropTypes from "prop-types";

const SimpleBreadcrumbs = ({ className = "", textLight = false }) => {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);
  return (
    <div
      className={`hidden px-5 py-3 text-gray-700 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-800 dark:border-gray-700 xs:inline-block ${className}`}
    >
      <ol className="flex items-center gap-x-1 md:gap-x-3 flex-wrap">
        <li className="flex items-center">
          <RouterLink
            to="/"
            style={{
              fontSize: "0.875rem",
              lineHeight: "1.25rem",
              fontWeight: "500",
            }}
          >
            <div
              className={`inline-flex items-center text-gray-700 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white ${
                textLight ? "text-white hover:text-cyan-100" : ""
              }`}
            >
              <HomeIcon></HomeIcon>
              <span>Home</span>
            </div>
          </RouterLink>
        </li>
        {pathnames.map((value, index) => {
          const last = index === pathnames.length - 1;
          const to = `/${pathnames.slice(0, index + 1).join("/")}`;
          value = value.charAt(0).toUpperCase() + value.slice(1);
          return last ? (
            <li className="flex items-center" key={v4()}>
              <BreadcrumbsIcon></BreadcrumbsIcon>
              <span
                className={`ml-1 text-sm font-medium text-gray-500 md:ml-2 dark:text-gray-400 ${
                  textLight ? "text-white hover:text-cyan-100" : ""
                }`}
              >
                {value}
              </span>
            </li>
          ) : (
            <li className="flex items-center" key={v4()}>
              <BreadcrumbsIcon></BreadcrumbsIcon>
              <RouterLink
                to={to}
                style={{
                  fontSize: "0.875rem",
                  lineHeight: "1.25rem",
                  fontWeight: "500",
                }}
              >
                <span
                  className={`ml-1 text-gray-700 hover:text-gray-900 md:ml-2 dark:text-gray-400 dark:hover:text-white ${
                    textLight ? "text-white hover:text-cyan-100" : ""
                  }`}
                >
                  {value}
                </span>
              </RouterLink>
            </li>
          );
        })}
      </ol>
    </div>
  );
};
SimpleBreadcrumbs.propTypes = {
  className: PropTypes.string,
  textLight: PropTypes.bool,
};
export default SimpleBreadcrumbs;
