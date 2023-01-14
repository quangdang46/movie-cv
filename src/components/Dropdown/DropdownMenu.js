import { useRef, useState } from "react";
import { CSSTransition } from "react-transition-group";
import { ChevronLeftIcon, UserIcon, ChevronDownIcon } from "../Icon";
const DropdownMenu = () => {
  const [activeMenu, setActiveMenu] = useState("main");
  const dropdownRef = useRef(null);

  function DropdownItem(props) {
    return (
      <a
        href={props.link}
        className="hover:bg-dark-lighten-2 h-12 flex items-center rounded-md p-2"
        style={{
          transition: "all 500ms ease",
        }}
        onClick={() => props.goToMenu && setActiveMenu(props.goToMenu)}
      >
        <span className="p-2 hover:filter-none hidden xs:block">
          {props.leftIcon}
        </span>
        {props.children}
        <span className="ml-auto">{props.rightIcon}</span>
      </a>
    );
  }

  return (
    <div
      className="font-montserrat absolute top-10 right-0 w-40 xs:w-80 bg-dark-darken rounded-lg p-4 overflow-hidden transition-all z-[999]"
      style={{
        transition: "all 500ms ease",
      }}
      ref={dropdownRef}
    >
      <CSSTransition
        in={activeMenu === "main"}
        timeout={500}
        classNames="menu-primary"
        unmountOnExit
      >
        <div className="w-full">
          <DropdownItem leftIcon={<UserIcon />} link="/account">
            My Profile
          </DropdownItem>
          <DropdownItem
            leftIcon={<UserIcon />}
            rightIcon={<ChevronDownIcon />}
            goToMenu="settings"
          >
            Settings
          </DropdownItem>
        </div>
      </CSSTransition>

      <CSSTransition
        in={activeMenu === "settings"}
        timeout={500}
        classNames="menu-secondary"
        unmountOnExit
      >
        <div className="w-full">
          <DropdownItem goToMenu="main" leftIcon={<ChevronLeftIcon />}>
            <h2>My Tutorial</h2>
          </DropdownItem>
          <DropdownItem leftIcon={<UserIcon />} link="/user">
            HTML
          </DropdownItem>
          <DropdownItem leftIcon={<UserIcon />}>CSS</DropdownItem>
        </div>
      </CSSTransition>
    </div>
  );
};
export default DropdownMenu;
