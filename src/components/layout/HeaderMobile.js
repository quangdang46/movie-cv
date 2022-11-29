import React from "react";
import { Logo } from "../Logo";
import { Search } from "../Search";
import { Toggle } from "../Toggle";

const HeaderMobile = () => {
  return (
    <header className="font-bold text-lg flex items-center gap-x-3 md:hidden mb-12">
      <Toggle></Toggle>
      <Logo></Logo>
      <Search></Search>
    </header>
  );
};

export default HeaderMobile;
