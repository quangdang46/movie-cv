import React from "react";
import { Link } from "react-router-dom";
import { IMAGE_URL } from "../../api/configApi";
import { Image } from "../Lazy";
import PropTypes from "prop-types";

const Thumbnail = ({ movie }) => {
  // const [currentMovie, setCurrentMovie] = useState(null);
  // const [showModal, setShowModal] = useState(null);
  return (
    <Link to={`/movies/${movie.id}`}>
      <div className="relative h-28 min-w-[180px] cursor-pointer transition duration-500 ease-out md:h-36 md:min-w-[260px] md:hover:scale-105">
        <Image
          lazy_src={`${IMAGE_URL}/w500${
            movie.poster_path || movie.backdrop_path
          }`}
          className="rounded-sm object-cover md:rounded w-full h-full pointer-events-none"
        ></Image>
      </div>
    </Link>
  );
};
Thumbnail.propTypes = {
  movie: PropTypes.object.isRequired,
};

export default Thumbnail;
