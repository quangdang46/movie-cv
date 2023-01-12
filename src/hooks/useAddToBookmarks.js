import { useQuery } from "@tanstack/react-query";
import { doc, updateDoc } from "firebase/firestore";
import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { auth, db } from "../fire-base/firebase-config";
import { getMovieFullDetail } from "../service/movieService";

export const useAddToBookmarks = (id) => {
  const { data, isError, error } = useQuery(["movieDetail", id], () =>
    getMovieFullDetail(id)
  );

  const user = useSelector((state) => state.auth.user);
  const [addedToList, setAddedToList] = useState(false);
  useEffect(() => {
    if (user) {
      const isAdded =
        (user.bookmarks.length > 0 &&
          user.bookmarks?.find((movie) => movie.id === +id)) ||
        false;
      if (isAdded) {
        setAddedToList(true);
      } else {
        setAddedToList(false);
      }
    }
  }, [id, user]);
  if (error || !data) {
    return {
      error,
      isError,
      addedToList,
      handleList: () => {},
    };
  }

  const { detail } = data;
  const handleList = async () => {
    if (user) {
      const colRefUpdate = doc(db, "users", auth.currentUser.uid);
      // update to firebase
      if (!addedToList) {
        await updateDoc(colRefUpdate, {
          ...user,
          // add bookmarks
          bookmarks: [
            ...user.bookmarks.filter((movie) => movie.id !== detail.id),
            {
              ...detail,
            },
          ],
        });
        // succes
        toast.success("Added to list successfully");
      } else {
        await updateDoc(colRefUpdate, {
          ...user,
          // remove bookmarks
          bookmarks: user.bookmarks.filter((movie) => movie.id !== detail.id),
        });
        // succes
        toast.success("Removed from list successfully");
      }
    } else {
      toast.error("Please login to add to list");
    }
  };
  return {
    addedToList,
    setAddedToList,
    data,
    handleList,
  };
};
