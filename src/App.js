import { onAuthStateChanged } from "firebase/auth";
import { doc, onSnapshot } from "firebase/firestore";
import { lazy } from "react";
import { Suspense, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Routes } from "react-router-dom";
import { auth, db } from "./fire-base/firebase-config";
import { currentUser } from "./redux/userSlice";
const AuthenUi = lazy(() => import("./pages/AuthenUi"));
const Bookmarks = lazy(() => import("./pages/Bookmarks"));
const Explore = lazy(() => import("./pages/Explore"));
const ForgotPass = lazy(() => import("./pages/ForgotPass"));
const GlobalUi = lazy(() => import("./pages/GlobalUi"));
const History = lazy(() => import("./pages/History"));
const HomePage = lazy(() => import("./pages/HomePage"));
const MovieDetail = lazy(() => import("./pages/MovieDetail"));
const PageNotFound = lazy(() => import("./pages/PageNotFound"));
const ProfilePage = lazy(() => import("./pages/ProfilePage"));
const SearchPage = lazy(() => import("./pages/SearchPage"));
const SignIn = lazy(() => import("./pages/SignIn"));
const SignUp = lazy(() => import("./pages/SignUp"));
const ViewAllPage = lazy(() => import("./pages/ViewAllPage"));
const WatchMovie = lazy(() => import("./pages/WatchMovie"));
function App() {
  const dispatch = useDispatch();
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <Suspense>
      <Routes>
        <Route path="/" element={<HomePage></HomePage>}></Route>
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
        <Route element={<AuthenUi></AuthenUi>}>
          <Route path="/signin" element={<SignIn></SignIn>}></Route>
          <Route path="/signup" element={<SignUp></SignUp>}></Route>
          <Route path="/forgotpass" element={<ForgotPass></ForgotPass>}></Route>
        </Route>
        <Route path="*" element={<PageNotFound></PageNotFound>}></Route>
      </Routes>
    </Suspense>
  );
}

export default App;
