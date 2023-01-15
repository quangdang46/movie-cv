import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Header from "../components/layout/Header";
import { MainBanner } from "../components/MainBanner";
import { CustomModal } from "../components/Modal";
import { Row } from "../components/Row";
import { openModal } from "../redux/modalSlice";
import { getTrending } from "../service/movieService";
import { categories } from "../shared/const";
const HomePage = () => {
  const showModal = useSelector((state) => state.modal.showModal);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(openModal(false));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const { data, isError, error } = useQuery(["movieList"], () => getTrending());
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
      <main className="relative pl-4 pr-4 pb-24 lg:space-y-24 lg:pl-10 lg:pr-10">
        <MainBanner randomMovies={data.results}></MainBanner>
        <section className="md:space-y-24">
          {categories &&
            categories.map((movie) => (
              <Row title={movie.title} key={movie.id} type={movie.type}></Row>
            ))}
        </section>
      </main>
      {showModal && <CustomModal />}
    </div>
  );
};

export default HomePage;
