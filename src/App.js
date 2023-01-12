import { onAuthStateChanged } from "firebase/auth";
import { doc, onSnapshot } from "firebase/firestore";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import DashBoard from "./components/Dashboard/DashBoard";
import { auth, db } from "./fire-base/firebase-config";
import {
  GlobalUi,
  Explore,
  HomePage,
  SignIn,
  MovieDetail,
  PageNotFound,
  SearchPage,
  WatchMovie,
  SignUp,
  ViewAllPage,
  ProfilePage,
  Bookmarks,
  History,
} from "./pages";
import { currentUser } from "./redux/userSlice";
function App() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        onSnapshot(doc(db, "users", user.uid), (doc) => {
          dispatch(
            currentUser({
              ...doc.data(),
            })
          );
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
        </Route>
        <Route path="/movies/:id" element={<MovieDetail></MovieDetail>}></Route>
        <Route path="/watch/:id" element={<WatchMovie></WatchMovie>}></Route>
        <Route
          path="/viewall/:type"
          element={<ViewAllPage></ViewAllPage>}
        ></Route>
        <Route element={<GlobalUi></GlobalUi>}>
          <Route path="/explore" element={<Explore></Explore>}></Route>
          <Route path="/profile" element={<ProfilePage></ProfilePage>}></Route>
          <Route path="/bookmarks" element={<Bookmarks></Bookmarks>}></Route>
          <Route path="/history" element={<History></History>}></Route>
          <Route path="/search" element={<SearchPage></SearchPage>}></Route>
        </Route>
        {/* <Route path="/search" element={<SearchPage></SearchPage>}></Route> */}

        <Route path="/signin" element={<SignIn></SignIn>}></Route>
        <Route path="/signup" element={<SignUp></SignUp>}></Route>
        <Route path="*" element={<PageNotFound></PageNotFound>}></Route>
      </Routes>
    </div>
  );
}

export default App;
