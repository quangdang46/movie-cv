

import HomePage from "../../pages/HomePage";
import { BannerList } from "../Banner";
import Banner from "../Banner/Banner";
import Header from "../layout/Header";
import HeaderMobile from "../layout/HeaderMobile";
import { LeftSideBar } from "../Sidebar";
import RightSideBar from "../Sidebar/RightSideBar";
const DashBoard = () => {


  return (
    <div className="flex">
      <LeftSideBar></LeftSideBar>
      <main className="flex-1 py-10 px-5 sm:px-10">
        <HeaderMobile></HeaderMobile>
        <Header></Header>
        <BannerList></BannerList>
        <HomePage></HomePage>
      </main>
      <RightSideBar></RightSideBar>
    </div>
  );
};

export default DashBoard;
