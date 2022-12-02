import { Route, Routes } from "react-router-dom";
import { v4 } from "uuid";
import { BannerList } from "./components/Banner";
import { DashBoard } from "./components/Dashboard";
import { ViewAllPage } from "./components/layout";
import { PageNotFound } from "./components/PageNotFound";
import { HomePage } from "./pages";
const routes = [
  {
    path: "/popular",
    element: <ViewAllPage />,
  },
  {
    path: "/nowplaying",
    element: <ViewAllPage />,
  },
  {
    path: "/toprated",
    element: <ViewAllPage />,
  },
  {
    path: "/upcoming",
    element: <ViewAllPage />,
  },
];

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
          {routes.map((route, index) => {
            return (
              <Route
                key={v4()}
                path={route.path}
                element={route.element}
              ></Route>
            );
          })}
        </Route>
        <Route path="*" element={<PageNotFound></PageNotFound>}></Route>
      </Routes>
    </div>
  );
}

export default App;
