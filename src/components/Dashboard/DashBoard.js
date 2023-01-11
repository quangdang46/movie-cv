import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import { openModal } from "../../redux/modalSlice";
import { fetchMovies } from "../../service/movieService";
import Header from "../layout/Header";
import { MainBanner } from "../MainBanner";
import { CustomModal } from "../Modal";
const DashBoard = () => {
  const showModal = useSelector((state) => state.modal.showModal);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(openModal(false));
  }, []);
  const { data, isError, error } = useQuery(["movieList"], () =>
    fetchMovies("top_rated", 1)
  );
  if (isError) {
    return <div>{error.message}</div>;
  }
  if (!data) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div
      className={`relative h-screen bg-gradient-to-b from-gray-900/10 to-[#010511] lg:h-[140vh] ${
        showModal && "!h-screen overflow-hidden"
      }`}
    >
      <Header></Header>
      <main className="relative pl-4 pr-4 pb-24 lg:space-y-24 lg:pl-16 lg:pr-16">
        <MainBanner randomMovies={data.results}></MainBanner>
        <section className="md:space-y-24">
          <Outlet></Outlet>
        </section>
      </main>
      {showModal && <CustomModal />}
    </div>
  );
};

export default DashBoard;
