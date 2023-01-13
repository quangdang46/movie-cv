import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { DeleteIcon } from "../Icon";
import { Image } from "../Lazy";
const ImageUpload = (props) => {
  const {
    name,
    className = "",
    progress = 0,
    image = "",
    handleDeleteImage = () => {},
    ...rest
  } = props;
  return (
    <div className={`${className}`}>
      <div className="group relative h-[200px] sm:h-[300px] w-full rounded-lg bg-white border-dashed border-2 flex items-center justify-center overflow-hidden">
        {image && (
          <Fragment>
            <img src={image} className="object-cover w-full h-full" alt="" />
            <button
              type="button"
              className="absolute z-10 flex items-center justify-center invisible w-16 h-16 text-red-500 transition-all bg-white rounded-full opacity-0 cursor-pointer group-hover:opacity-100 group-hover:visible"
              onClick={handleDeleteImage}
            >
              <DeleteIcon></DeleteIcon>
            </button>
          </Fragment>
        )}
        {progress !== 0 && !image && (
          <div className="absolute z-10 w-16 h-16 border-8 border-green-500 rounded-full loading border-t-transparent animate-spin"></div>
        )}
        {!image && progress === 0 && (
          <div className="flex justify-center bg-white items-center text-center pointer-events-none">
            <Image
              lazy_src="/img-upload.png"
              alt="upload-img"
              className="max-w-[80px] mb-5"
            ></Image>
          </div>
        )}
        {!image && (
          <div
            className="absolute bottom-0 left-0 w-10 h-1 transition-all bg-green-400 image-upload-progress"
            style={{
              width: `${Math.ceil(progress)}%`,
            }}
          ></div>
        )}
      </div>
      <label
        htmlFor={name}
        className="border-none outline-none rounded-full mt-5 uppercase cursor-pointer text-xl w-full px-5 py-2 block text-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"
      >
        Choose a file
        <input
          type="file"
          name={name}
          id={name}
          className="hidden-input"
          onChange={() => {}}
          {...rest}
        />
      </label>
    </div>
  );
};
ImageUpload.propTypes = {
  name: PropTypes.string,
  className: PropTypes.string,
  progress: PropTypes.number,
  image: PropTypes.string,
};
export default ImageUpload;
