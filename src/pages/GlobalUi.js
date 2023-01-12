import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Outlet } from "react-router-dom";
import { LeftSideBar, TopSideBar } from "../components/SideBar";
import { useViewportView } from "../hooks/useViewportView";
const GlobalUi = () => {
  const [isShowSideBar, setIsShowSideBar] = useState(true);
  const { isMobile } = useViewportView();
  useEffect(() => {
    if (isMobile) {
      setIsShowSideBar(false);
    } else {
      setIsShowSideBar(true);
    }
  }, [isMobile]);
  return (
    <>
      <TopSideBar
        onClick={() => {
          setIsShowSideBar(!isShowSideBar);
        }}
      ></TopSideBar>
      <div className="flex min-h-screen flex-col md:flex-row gap-x-2">
        <LeftSideBar
          show={isShowSideBar}
          setShow={setIsShowSideBar}
        ></LeftSideBar>
        <Outlet></Outlet>
      </div>
    </>
  );
};

export default GlobalUi;
