import { ToggleDarkMode } from "../components/Button";

const {
  HomeIcon,
  ExploreIcon,
  SearchIcon,
  BookmarkIcon,
  HistoryIcon,
  LogIcon,
  UserIcon,
} = require("../components/Icon");

export const links = [
  { name: "Home", link: "/" },
  // { name: "TV Shows", link: "/tv" },
  // { name: "Movies", link: "/movies" },
  { name: "Explore", link: "/explore" },
  { name: "Search", link: "/search" },
];

export const categories = [
  {
    id: 1,
    title: "Popular Movies",
    type: "popular",
  },
  {
    id: 2,
    title: "Up comming",
    type: "upcoming",
  },
  {
    id: 3,
    title: "Top Rated",
    type: "top_rated",
  },
  {
    id: 4,
    title: "Now Playing",
    type: "now_playing",
  },
  {
    id: 5,
    title: "Latest",
    type: "latest",
  },
];

export const menus = [
  {
    name: "Home",
    link: "/",
    icon: <HomeIcon className="!w-6 !h-6 !mr-0"></HomeIcon>,
    requiredLogin: "home",
  },
  {
    name: "Explore",
    link: "/explore",
    icon: <ExploreIcon></ExploreIcon>,
    requiredLogin: "search",
  },
  {
    name: "Search",
    link: "/search",
    icon: <SearchIcon></SearchIcon>,
    requiredLogin: "search",
  },
  {
    name: "Bookmark",
    link: "/bookmarks",
    icon: <BookmarkIcon></BookmarkIcon>,
  },
  {
    name: "History",
    link: "/history",
    icon: <HistoryIcon></HistoryIcon>,
  },
  {
    name: "User",
    link: "/profile",
    icon: <UserIcon></UserIcon>,
  },
  {
    name: "Dark mode",
    link: "#",
    icon: <ToggleDarkMode></ToggleDarkMode>,
    margin: true,
  },
  {
    name: "Log",
    link: "#",
    requiredLogin: "login",
    icon: <LogIcon></LogIcon>,
    margin: true,
  },
];
