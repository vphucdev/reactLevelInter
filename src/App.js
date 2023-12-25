import "./App.scss";
import { useRef } from "react";
import { ToastContainer } from "react-toastify";
import { Route, Routes } from "react-router-dom";
import MainLayout from "./layouts/MainLayout/MainLayout";
import Home from "./pages/Home";
import Users from "./pages/Users";

function App() {
  // const ref = useRef();

  return (
    <div className="App">
      <Routes>
        <Route
          path="/"
          element={
            <MainLayout>
              <Home />
            </MainLayout>
          }
        />
        <Route
          path="/users"
          element={
            <MainLayout>
                <Users />
            </MainLayout>
          }
        />
      </Routes>

      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </div>
    // bọc Container ben ngoai để TableUsers không bị dính sát vào 2 bên lề
  );
}

export default App;
