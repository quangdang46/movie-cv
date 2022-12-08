import { useState } from "react";
import { Outlet } from "react-router-dom";
import { useFetchMovie } from "../../hooks/useFetchMovie";
import Header from "../layout/Header";
import { MainBanner } from "../MainBanner";
import { CustomModal } from "../Modal";
const DashBoard = () => {
  const [showModal, setShowModal] = useState(false);
  // showModal is a boolean value that is used to show or hide the modal
  const { movieList } = useFetchMovie({
    category: "UPCOMING",
    currPage: 2,
  });
  return (
    <div
      className={`relative h-screen bg-gradient-to-b from-gray-900/10 to-[#010511] lg:h-[140vh] ${
        showModal && "!h-screen overflow-hidden"
      }`}
    >
      <Header></Header>
      <main className="relative pl-4 pr-4 pb-24 lg:space-y-24 lg:pl-16 lg:pr-16">
        <MainBanner randomMovies={movieList}></MainBanner>
        <section className="md:space-y-24">
          <Outlet></Outlet>
        </section>
      </main>
      {showModal && <CustomModal />}
    </div>
  );
};

export default DashBoard;
