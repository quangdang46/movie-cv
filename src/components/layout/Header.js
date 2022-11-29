import React from "react";

const Header = () => {
  return (
    <nav className="flex space-x-6 text-gray-400 font-medium">
      <a href="/" className="hover:text-gray-700 dark:hover:text-white">
        TV Series
      </a>
      <a href="/" className="text-gray-700 dark:text-white font-semibold">
        Movies
      </a>
      <a href="/" className="hover:text-gray-700 dark:hover:text-white">
        Animes
      </a>
    </nav>
  );
};

export default Header;
