import { Route, Routes } from "react-router-dom";
import { v4 } from "uuid";
import DashBoard from "./components/Dashboard/DashBoard";
import { Account, HomePage, Login, MovieDetail, PageNotFound } from "./pages";
import ViewAllPage from "./pages/ViewAllPage";
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
    <div className="">
      <Routes>
        <Route element={<DashBoard></DashBoard>}>
          <Route
            path="/"
            element={
              <>
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
        <Route path="/movies/:id" element={<MovieDetail></MovieDetail>}></Route>
        <Route path="/account" element={<Account></Account>}></Route>
        <Route path="/login" element={<Login></Login>}></Route>
        <Route path="*" element={<PageNotFound></PageNotFound>}></Route>
      </Routes>
    </div>
  );
}

export default App;
