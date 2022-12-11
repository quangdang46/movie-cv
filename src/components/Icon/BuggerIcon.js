import React from "react";

const BuggerIcon = ({ size, onClick = () => {} }) => {
  return (
    <div onClick={onClick} className="cursor-pointer w-[26px] h-[26px]">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-26 h-26 pointer-events-none"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25H12"
        />
      </svg>
    </div>
  );
};

export default BuggerIcon;
