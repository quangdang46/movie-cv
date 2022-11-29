import { Route, Routes } from "react-router-dom";
import { DashBoard } from "./components/Dashboard";


function App() {
  return (
    <div className="page-container">
      <Routes>
        <Route path="/" element={<DashBoard></DashBoard>}>
          {/* <Route
            path="/"
            element={
              <>
                <Header></Header>
                <Banner></Banner>
                <HomePage></HomePage>
              </>
            }
          ></Route> */}
        </Route>
      </Routes>
    </div>
  );
}

export default App;
