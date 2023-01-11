import { onAuthStateChanged } from "firebase/auth";
import { doc, onSnapshot } from "firebase/firestore";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import { v4 } from "uuid";
import DashBoard from "./components/Dashboard/DashBoard";
import { auth, db } from "./fire-base/firebase-config";
import {
  Account,
  Explore,
  HomePage,
  SignIn,
  MovieDetail,
  PageNotFound,
  SearchPage,
  WatchMovie,
  SignUp,
} from "./pages";
import ViewAllPage from "./pages/ViewAllPage";
import { currentUser } from "./redux/userSlice";
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
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        onSnapshot(doc(db, "users", user.uid), (doc) => {
          dispatch(currentUser(doc.data()));
        });
      } else {
        dispatch(currentUser(null));
      }
    });
  }, []);
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
        <Route path="/watch/:id" element={<WatchMovie></WatchMovie>}></Route>
        <Route path="/explore" element={<Explore></Explore>}></Route>
        <Route path="/account" element={<Account></Account>}></Route>
        <Route path="/search" element={<SearchPage></SearchPage>}></Route>
        <Route path="/signin" element={<SignIn></SignIn>}></Route>
        <Route path="/signup" element={<SignUp></SignUp>}></Route>
        <Route path="*" element={<PageNotFound></PageNotFound>}></Route>
      </Routes>
    </div>
  );
}

export default App;
