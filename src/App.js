import { Route, Routes } from "react-router-dom";
import { BannerList } from "./components/Banner";
import { DashBoard } from "./components/Dashboard";
import { Popular } from "./components/layout";
import { PageNotFound } from "./components/PageNotFound";
import { HomePage } from "./pages";

function App() {
  return (
    <div className="page-container">
      <Routes>
        <Route element={<DashBoard></DashBoard>}>
          <Route
            path="/"
            element={
              <>
                <BannerList></BannerList>
                <HomePage></HomePage>
              </>
            }
          ></Route>
          <Route
            path="/popular"
            element={<Popular type={"POPULAR"}></Popular>}
          ></Route>
        </Route>
        <Route path="*" element={<PageNotFound></PageNotFound>}></Route>
      </Routes>
    </div>
  );
}

export default App;
