import { Modal } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import ReactPlayer from "react-player/lazy";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { youtubePath } from "../../api/configApi";
import { useAddToBookmarks } from "../../hooks/useAddToBookmarks";
import { openModal } from "../../redux/modalSlice";
import { getMovieFullDetail } from "../../service/movieService";
import { formatDate } from "../../utils/func";
import { PlayIcon, PlusIcon, VolumeOff, VolumeUp, XIcon } from "../Icon";
import ReadMore from "../ReadMore/ReadMore";
const CustomModal = () => {
  //
  const movieTrailer = localStorage.getItem("movieTrailer");
  const navigate = useNavigate();
  const showModal = useSelector((state) => state.modal.showModal);
  const dispatch = useDispatch();
  const [muted, setMuted] = useState(true);
  const { addedToList, handleList } = useAddToBookmarks(movieTrailer);
  const handleClose = () => {
    dispatch(openModal(false));
  };

  if (!movieTrailer) {
    handleClose();
  }
  const { data, isError, error } = useQuery(["movieDetail", movieTrailer], () =>
    getMovieFullDetail(movieTrailer)
  );

  if (isError) {
    return <div>{error.message}</div>;
  }
  if (!data) {
    return <div>Loading...</div>;
  }
  const { detail, videos } = data;

  const handleClickPlay = () => {
    navigate(`/watch/${detail.id}`);
  };

  return (
    <Modal
      open={showModal}
      onClose={handleClose}
      className="fixed !top-7 left-0 right-0 z-50 mx-auto w-full max-w-5xl overflow-hidden overflow-y-scroll rounded-md scrollbar-hide"
    >
      <>
        <button
          className="absolute right-5 top-5 !z-40 flex h-11 w-11 items-center justify-center rounded-full border-2 border-[gray] bg-[#2a2a2a]/60 transition hover:border-white hover:bg-white/10"
          onClick={handleClose}
        >
          <XIcon></XIcon>
        </button>

        <div className="relative pt-[56.25%]">
          <ReactPlayer
            url={youtubePath(videos[0].key)}
            width="100%"
            height="100%"
            style={{ position: "absolute", top: "0", left: "0" }}
            playing={true}
            muted={muted}
          />
          <div className="absolute bottom-10 flex w-full items-center justify-between px-10">
            <div className="flex space-x-2">
              <button
                className="flex items-center gap-x-2 rounded bg-white px-8 text-xl font-bold text-black transition hover:bg-[#e6e6e6]"
                onClick={handleClickPlay}
              >
                <PlayIcon></PlayIcon>
                <span>Play</span>
              </button>
              <button
                className="flex h-11 w-11 items-center justify-center rounded-full border-2 border-[gray] bg-[#2a2a2a]/60 transition hover:border-white hover:bg-white/10"
                onClick={handleList}
              >
                {addedToList ? <XIcon></XIcon> : <PlusIcon></PlusIcon>}
              </button>
            </div>
            <button
              className="flex h-11 w-11 items-center justify-center rounded-full border-2 border-[gray] bg-[#2a2a2a]/60 transition hover:border-white hover:bg-white/10"
              onClick={() => setMuted(!muted)}
            >
              {muted ? <VolumeOff></VolumeOff> : <VolumeUp></VolumeUp>}
            </button>
          </div>
        </div>
        <div className="flex space-x-16 rounded-b-md bg-[#181818] p-8">
          <div className="space-y-6 text-lg">
            <div className="flex items-center space-x-2 text-sm">
              <p className="font-semibold text-green-400">
                {(detail?.vote_average * 10).toFixed(2)}% Match
              </p>
              <p className="font-light">
                {formatDate(detail?.release_date) ||
                  formatDate(detail?.first_air_date)}
              </p>
              <div className="flex h-4 items-center justify-center rounded border border-white/40 px-1.5 text-xs">
                HD
              </div>
            </div>
            <div className="flex flex-col gap-x-8 gap-y-4 font-light md:flex-row">
              <ReadMore limitTextLength={200} className="w-5/6">
                {detail?.overview}
              </ReadMore>
              <div className="flex flex-col space-y-3 text-sm">
                <div>
                  <span className="text-[gray]">Genres:</span>{" "}
                  {detail.genres.map((genre) => genre.name).join(", ")}
                </div>

                <div>
                  <span className="text-[gray]">Original language:</span>{" "}
                  {detail?.original_language
                    .toLowerCase()
                    .replace(/\b(\w)/g, (s) => s.toUpperCase())}
                </div>

                <div>
                  <span className="text-[gray]">Total votes:</span>{" "}
                  {detail?.vote_count}
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
