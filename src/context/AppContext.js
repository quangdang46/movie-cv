import { createContext, useState } from "react";

const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [isShowRightSideBar, setIsShowRightSideBar] = useState(true);


  const values = {
    isShowRightSideBar,
    setIsShowRightSideBar,
  }
  return <AppContext.Provider value={values}>{children}</AppContext.Provider>;
};

export { AppContext, AppProvider };
