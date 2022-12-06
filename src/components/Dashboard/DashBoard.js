import { Outlet } from "react-router-dom";
import Navbarx from "../Navbar/NavBarx";
import Row from "../Navbar/Row";
import Show from "../Navbar/Show";
const DashBoard = () => {
  return (
    <div className="flex">
      <main className="flex-1 w-full">
        <Navbarx></Navbarx>
        <main className="relative pl-4 pb-24 lg:space-y-24 lg:pl-16 ">
          <Show></Show>
          <section className="md:space-y-24">
            <Row title="Trending Now"></Row>
            <Row title="Trending Now"></Row>
          </section>
        </main>
        <Outlet></Outlet>
      </main>
    </div>
  );
};

export default DashBoard;
