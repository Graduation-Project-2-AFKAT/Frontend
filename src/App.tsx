import { Routes, Route } from "react-router";
import RootLayout from "./pages/Layout";
import Home from "./pages/Home";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import ErrorHandler from "./components/errors/ErrorHanbdler";
import PageNotFound from "./pages/PageNotFound";
import { ToastContainer, ToastPosition } from "react-toastify";
import "./App.css";
import Profile from "./pages/Profile";
import EditProfile from "./pages/profile/EditProfile";
import BecomeAMember from "./pages/BecomeAMember";
import Games from "./pages/Games";
import Game from "./pages/Game";
import PublishGame from "./pages/PublishGame";
import Arts from "./pages/Arts";
import Art from "./pages/Art";
import PublishArt from "./pages/PublishArt";
import GameJam from "./pages/GameJam";
import HostJam from "./pages/HostJam";

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
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

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
          {/*//TODO "/games/:title/:id" */}
          <Route path="/game" element={<Game />} />
          <Route
            path="/games/publish"
            element={
              <ProtectedRoute isAuthenticated={true} redirectPath="/login">
                <PublishGame />
              </ProtectedRoute>
            }
          />
          <Route
            path="/membership"
            element={
              <ProtectedRoute isAuthenticated={true} redirectPath="/login">
                <BecomeAMember />
              </ProtectedRoute>
            }
          />
          <Route
            path="/arts"
            element={
              <ProtectedRoute isAuthenticated={true} redirectPath="/login">
                <Arts />
              </ProtectedRoute>
            }
          />
          <Route
            path="/arts/:id"
            element={
              <ProtectedRoute isAuthenticated={true} redirectPath="/login">
                <Art />
              </ProtectedRoute>
            }
          />
          <Route
            path="/arts/publish"
            element={
              <ProtectedRoute isAuthenticated={true} redirectPath="/login">
                <PublishArt />
              </ProtectedRoute>
            }
          />
          <Route
            path="/jams"
            element={
              <ProtectedRoute isAuthenticated={true} redirectPath="/login">
                <GameJam />
              </ProtectedRoute>
            }
          />

          <Route
            path="/jams/host"
            element={
              <ProtectedRoute isAuthenticated={true} redirectPath="/login">
                <HostJam />
              </ProtectedRoute>
            }
          />
        </Route>
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </div>
  );
}

export default App;
