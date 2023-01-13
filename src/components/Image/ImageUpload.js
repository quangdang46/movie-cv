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
    <label
      className={`cursor-pointer flex items-center justify-center border border-dashed w-full min-h-[200px] rounded-lg ${className} relative overflow-hidden group`}
    >
      <input
        type="file"
        name={name}
        className="hidden-input"
        onChange={() => {}}
        {...rest}
      />
      {progress !== 0 && !image && (
        <div className="absolute z-10 w-16 h-16 border-8 border-green-500 rounded-full loading border-t-transparent animate-spin"></div>
      )}
      {!image && progress === 0 && (
        <div className="flex flex-col items-center text-center pointer-events-none">
          <Image
            lazy_src="/img-upload.png"
            alt="upload-img"
            className="max-w-[80px] mb-5"
          ></Image>
          <p className="font-semibold">Choose photo</p>
        </div>
      )}
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
      {!image && (
        <div
          className="absolute bottom-0 left-0 w-10 h-1 transition-all bg-green-400 image-upload-progress"
          style={{
            width: `${Math.ceil(progress)}%`,
          }}
        ></div>
      )}
    </label>
  );
};
ImageUpload.propTypes = {
  name: PropTypes.string,
  className: PropTypes.string,
  progress: PropTypes.number,
  image: PropTypes.string,
};
export default ImageUpload;
