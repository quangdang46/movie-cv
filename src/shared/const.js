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
  },
  {
    name: "Explore",
    link: "/explore",
    icon: <ExploreIcon></ExploreIcon>,
    requiredLogin: true,
  },
  {
    name: "Search",
    link: "/search",
    icon: <SearchIcon></SearchIcon>,
    requiredLogin: false,
  },
  {
    name: "Bookmark",
    link: "/bookmarks",
    icon: <BookmarkIcon></BookmarkIcon>,
    requiredLogin: true,
  },
  {
    name: "History",
    link: "/history",
    icon: <HistoryIcon></HistoryIcon>,
    requiredLogin: true,
  },
  {
    name: "User",
    link: "/profile",
    icon: <UserIcon></UserIcon>,
    requiredLogin: true,
  },
  {
    name: "Login",
    link: "/login",
    icon: <LogIcon></LogIcon>,
    margin: true,
  },
];
