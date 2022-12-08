import React from "react";
import { Link } from "react-router-dom";
import { IMAGE_URL } from "../../api/configApi";
import { Image } from "../Image";
const Thumbnail = ({ movie }) => {
  // const [currentMovie, setCurrentMovie] = useState(null);
  // const [showModal, setShowModal] = useState(null);
  return (
    <Link to={`/movies/${movie.id}`}>
      <div
        className={`relative h-28 min-w-[180px] cursor-pointer transition duration-200 ease-out md:h-36 md:min-w-[260px] md:hover:scale-105`}
      >
        <Image
          lazy_src={`${IMAGE_URL}/w500${
            movie.backdrop_path || movie.poster_path
          }`}
          className="rounded-sm object-cover md:rounded w-full h-full pointer-events-none"
        ></Image>
      </div>
    </Link>
  );
};

export default Thumbnail;
