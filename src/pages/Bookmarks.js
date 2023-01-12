import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { MovieCard } from "../components/Cards";
import { CancelIcon, DeleteIcon, EditIcon } from "../components/Icon";
import { doc, updateDoc } from "firebase/firestore";
import { auth, db } from "../fire-base/firebase-config";
import { Image } from "../components/Lazy";
const Bookmarks = () => {
  const user = useSelector((state) => state.auth.user);
  const [movieList, setMovieList] = useState([]);
  const [editMovie, setEditMovie] = useState(false);
  useEffect(() => {
    if (user) {
      if (user.bookmarks && user.bookmarks.length > 0) {
        setMovieList(user.bookmarks);
      }
    }
  }, [user]);

  useEffect(() => {
    localStorage.setItem("deleteList", JSON.stringify([]));
  }, []);

  const handleEdit = () => {
    if (!editMovie) {
      toast.success("Choose a movie to delete", {
        autoClose: 500,
      });
    } else {
      toast.success("UnChoose remove successful", {
        autoClose: 500,
      });
    }
    setEditMovie(!editMovie);
  };
  const handleDelete = async () => {
    const movieStorage = localStorage.getItem("deleteList");
    if (!movieStorage) {
      toast.error("Please choose a movie to delete", {
        autoClose: 500,
      });
    }
    const movieListDelete = JSON.parse(movieStorage);
    if (movieListDelete.length === 0) {
      toast.error("Please choose a movie to delete", {
        autoClose: 500,
      });
    }
    if (user && movieListDelete.length > 0) {
      const colRefUpdate = doc(db, "users", auth.currentUser.uid);
      const newBookmark = movieList.filter(
        ({ id }) => !movieListDelete.includes(id)
      );
      await updateDoc(colRefUpdate, {
        ...user,
        bookmarks: newBookmark,
      });
      toast.success("Delete successful", {
        autoClose: 500,
      });
    }
    localStorage.setItem("deleteList", JSON.stringify([]));
  };
  const handleCancel = () => {
    setEditMovie(false);
    localStorage.setItem("deleteList", JSON.stringify([]));
  };
  return (
    <div className="flex-grow px-10 pt-5">
      <div className="flex items-center justify-between">
        <span className="uppercase text-white font-semibold text-[35px] mb-4">
          My film
        </span>
        {!editMovie && (
          <div
            className="flex items-center gap-x-1 cursor-pointer"
            onClick={handleEdit}
          >
            <EditIcon></EditIcon>
            <span>Edit</span>
          </div>
        )}
        {editMovie && (
          <>
            <div className="flex gap-5">
              <div
                className="cursor-pointer text-lg hover:text-red-500 transition duration-300 flex gap-2 items-center"
                onClick={handleDelete}
              >
                <DeleteIcon></DeleteIcon>
                <p>Delete</p>
              </div>
              <div
                className="cursor-pointer text-lg hover:text-green-700 transition duration-300 flex gap-2 items-center"
                onClick={handleCancel}
              >
                <CancelIcon></CancelIcon>
                <p>Cancel</p>
              </div>
            </div>
          </>
        )}
      </div>
      {movieList && movieList.length > 0 && (
        <div className="grid grid-cols-sm md:grid-cols-lg gap-x-2 md:gap-x-5 gap-y-5 mt-5">
          {movieList.map((movie) => (
            <MovieCard
              detail={movie}
              showGenres={false}
              key={movie.id}
              useDelete={editMovie}
            ></MovieCard>
          ))}
        </div>
      )}
      {movieList.length === 0 && (
        <div className="text-white text-2xl font-semibold w-full">
          You have no movie in your list
          <Image
            lazy_src="https://source.unsplash.com/random"
            alt="no movie"
            className="w-full h-full"
          ></Image>
        </div>
      )}
    </div>
  );
};

export default Bookmarks;
