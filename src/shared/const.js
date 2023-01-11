const links = [
  { name: "Home", link: "/" },
  { name: "TV Shows", link: "/tv" },
  { name: "Movies", link: "/movies" },
  { name: "Explore", link: "/explore" },
  { name: "Search", link: "/search" },
];

const categories = [
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

module.exports = {
  links,
  categories,
};
