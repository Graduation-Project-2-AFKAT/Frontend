import { Routes, Route } from "react-router";
import RootLayout from "./pages/Layout";
import Home from "./pages/Home";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import ErrorHandler from "./components/errors/ErrorHanbdler";
import PageNotFound from "./pages/PageNotFound";
import Profile from "./pages/Profile";
import Games from "./pages/Games";
import "./App.css";
import { ToastContainer, ToastPosition } from "react-toastify";
import EditProfile from "./pages/profile/EditProfile";

const userData = {
  email: "joe@joe.com",
  name: "joe",
  image: "image.webp",
};

function App() {
  const options = {
    theme: "dark",
    autoClose: 2500,
    position: "bottom-right" as ToastPosition,
    newestOnTop: false,
    closeOnClick: true,
    pauseonfocusLoss: true,
    draggable: true,
    pauseOnHover: true,
    hideProgressBar: false,
  };

  return (
    <div>
      <ToastContainer {...options} style={{ marginRight: "2rem" }} />
      <Routes>
        <Route
          path="/"
          element={<RootLayout />}
          errorElement={<ErrorHandler />}
        >
          <Route
            index
            element={
              <ProtectedRoute
                isAuthenticated={true}
                redirectPath="/login"
                data={userData}
              >
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute
                isAuthenticated={true}
                redirectPath="/login"
                data={userData}
              >
                <Profile user={userData} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile/edit"
            element={
              <ProtectedRoute
                isAuthenticated={true}
                redirectPath="/login"
                data={userData}
              >
                <EditProfile />
              </ProtectedRoute>
            }
          />
          <Route path="/games" element={<Games />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>

        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </div>
  );
}

export default App;
