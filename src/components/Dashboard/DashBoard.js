import { InfoOutlined, PlayArrow } from "@mui/icons-material";
import { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Navbarx from "../Navbar/NavBarx";
import "./styles.scss";
const DashBoard = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  window.onscroll = () => {
    setIsScrolled(window.pageYOffset === 0 ? false : true);
    return () => (window.onscroll = null);
  };
  const navigate = useNavigate();

  return (
    <div className="flex">
      <main className="flex-1 w-full">
        <Navbarx isScrolled={isScrolled}></Navbarx>
        <div className="hero">
          <img
            src="https://images.unsplash.com/photo-1670098439947-c65ba4f2b761?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
            alt="background"
            className="background-image"
          />
          <div className="container">
            <div className="logo w-10 h-10">
              <img
                src="https://images.unsplash.com/photo-1670098439947-c65ba4f2b761?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
                alt="Movie Logo"
              />
            </div>
            <div className="buttons flex">
              <button
                onClick={() => navigate("/player")}
                className="flex j-center a-center"
              >
                <PlayArrow />
                Play
              </button>
              <button className="flex j-center a-center">
                <InfoOutlined />
                More Info
              </button>
            </div>
          </div>
        </div>
        <Outlet></Outlet>
      </main>
    </div>
  );
};

export default DashBoard;
