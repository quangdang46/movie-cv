import { Modal } from "@mui/material";
import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import ReactPlayer from "react-player/lazy";
import {
  CheckIcon,
  LikeIcon,
  PlayIcon,
  PlusIcon,
  VolumeOff,
  VolumeUp,
  XIcon,
} from "../Icon";
const CustomModal = () => {
  const [movie, setMovie] = useState([]);
  const [trailer, setTrailer] = useState("");
  //
  const [showModal, setShowModal] = useState(false);
  const [muted, setMuted] = useState(true);
  const [genres, setGenres] = useState([]);
  const [addedToList, setAddedToList] = useState(false);
  const [movies, setMovies] = useState([]);

  const toastStyle = {
    background: "white",
    color: "black",
    fontWeight: "bold",
    fontSize: "16px",
    padding: "15px",
    borderRadius: "9999px",
    maxWidth: "1000px",
  };
  const handleClose = () => {
    setShowModal(false);
    setMovie(null);
    toast.dismiss();
  };
  const handleList = () => {};
  return (
    <Modal
      open={showModal}
      onClose={handleClose}
      className="fixed !top-7 left-0 right-0 z-50 mx-auto w-full max-w-5xl overflow-hidden overflow-y-scroll rounded-md scrollbar-hide"
    >
      <>
        <Toaster position="bottom-center" />
        <button
          className="modalButton absolute right-5 top-5 !z-40 h-9 w-9 border-none bg-[#181818] hover:bg-[#181818]"
          onClick={handleClose}
        >
          <XIcon></XIcon>
        </button>

        <div className="relative pt-[56.25%]">
          <ReactPlayer
            // url={`https://www.youtube.com/watch?v=${trailer}`}
            url="https://www.youtube.com/watch?v=ZlAU_w7-Xp8"
            width="100%"
            height="100%"
            style={{ position: "absolute", top: "0", left: "0" }}
            playing
            muted={muted}
          />
          <div className="absolute bottom-10 flex w-full items-center justify-between px-10">
            <div className="flex space-x-2">
              <button className="flex items-center gap-x-2 rounded bg-white px-8 text-xl font-bold text-black transition hover:bg-[#e6e6e6]">
                <PlayIcon></PlayIcon>
                <span>Play</span>
              </button>
              <button className="modalButton" onClick={handleList}>
                {addedToList ? <CheckIcon></CheckIcon> : <PlusIcon></PlusIcon>}
              </button>
              <button className="modalButton">
                <LikeIcon></LikeIcon>
              </button>
            </div>
            <button className="modalButton" onClick={() => setMuted(!muted)}>
              {muted ? <VolumeOff></VolumeOff> : <VolumeUp></VolumeUp>}
            </button>
          </div>
        </div>
        <div className="flex space-x-16 rounded-b-md bg-[#181818] px-10 py-8">
          <div className="space-y-6 text-lg">
            <div className="flex items-center space-x-2 text-sm">
              <p className="font-semibold text-green-400">
                {movie?.vote_average * 10}% Match
              </p>
              <p className="font-light">
                {movie?.release_date || movie?.first_air_date}
              </p>
              <div className="flex h-4 items-center justify-center rounded border border-white/40 px-1.5 text-xs">
                HD
              </div>
            </div>
            <div className="flex flex-col gap-x-10 gap-y-4 font-light md:flex-row">
              <p className="w-5/6">{movie?.overview}</p>
              <div className="flex flex-col space-y-3 text-sm">
                <div>
                  <span className="text-[gray]">Genres:</span>{" "}
                  {genres.map((genre) => genre.name).join(", ")}
                </div>

                <div>
                  <span className="text-[gray]">Original language:</span>{" "}
                  {movie?.original_language}
                </div>

                <div>
                  <span className="text-[gray]">Total votes:</span>{" "}
                  {movie?.vote_count}
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    </Modal>
  );
};

export default CustomModal;
