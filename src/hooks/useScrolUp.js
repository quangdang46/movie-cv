import { useEffect, useState } from "react";

export const useScrollUp = () => {

  const [isShowScrollUpBtn, setIsShowScrollUpBtn] = useState(false);
  useEffect(() => {
    const checkIfShowScrollUpBtn = () => {
      const scrollOffset = document.documentElement.scrollTop;

      if (scrollOffset > 1000) {
        setIsShowScrollUpBtn(true);
      } else {
        setIsShowScrollUpBtn(false);
      }
    };

    window.addEventListener("scroll", checkIfShowScrollUpBtn);

    return () => window.removeEventListener("scroll", checkIfShowScrollUpBtn);
  }, []);
    const scrollToTop = () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    };
  return {
    isShowScrollUpBtn,
    setIsShowScrollUpBtn,
    scrollToTop,
  };
};
