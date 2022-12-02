import { Breadcrumbs, Typography } from "@mui/material";
import React from "react";
import { Link as RouterLink, useLocation } from "react-router-dom";

const SimpleBreadcrumbs = () => {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);
  return (
    <div className="mt-9">
      <Breadcrumbs separator=">" aria-label="breadcrumb">
        <RouterLink to="/">Home</RouterLink>
        {pathnames.map((value, index) => {
          const last = index === pathnames.length - 1;
          const to = `/${pathnames.slice(0, index + 1).join("/")}`;
          value = value.charAt(0).toUpperCase() + value.slice(1);
          return last ? (
            <Typography sx={{ color: "#00adb5" }} key={to}>
              {value}
            </Typography>
          ) : (
            <RouterLink to={to} key={to}>
              {value}
            </RouterLink>
          );
        })}
      </Breadcrumbs>
    </div>
  );
};

export default SimpleBreadcrumbs;
