import { useContext, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { AppContext } from "../../context/AppContext";
import Header from "../layout/Header";
import HeaderMobile from "../layout/HeaderMobile";
import { LeftSideBar } from "../Sidebar";
import RightSideBar from "../Sidebar/RightSideBar";
const DashBoard = () => {
  const { isShowRightSideBar, setIsShowRightSideBar } = useContext(AppContext);
  return (
    <div className="flex page-container">
      <LeftSideBar></LeftSideBar>
      <main className="flex-1 py-10 px-5 w-full">
        <HeaderMobile></HeaderMobile>
        <Header></Header>
        <Outlet></Outlet>
      </main>
      {isShowRightSideBar && <RightSideBar></RightSideBar>}
    </div>
  );
};

export default DashBoard;
