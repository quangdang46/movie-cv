import { useState } from "react";
import Header from "../layout/Header";
import { MainBanner } from "../MainBanner";
import { CustomModal } from "../Modal";
import { Row } from "../Row";
const DashBoard = () => {
  const [showModal, setShowModal] = useState(false);
  return (
    <div
      className={`relative h-screen bg-gradient-to-b from-gray-900/10 to-[#010511] lg:h-[140vh] ${
        showModal && "!h-screen overflow-hidden"
      }`}
    >
      <Header></Header>
      <main className="relative pl-4 pb-24 lg:space-y-24 lg:pl-16 ">
        <MainBanner></MainBanner>
        <section className="md:space-y-24">
          <Row title="Trending Now"></Row>
          <Row title="Trending Now"></Row>
        </section>
      </main>
      {showModal && <CustomModal />}
    </div>
  );
};

export default DashBoard;
