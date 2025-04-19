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
import { RootState } from "./redux/store";
import { useSelector } from "react-redux";

function App() {
  const { isAuth } = useSelector((state: RootState) => state.users);

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
            path="/login"
            element={
              <ProtectedRoute isAuthenticated={!isAuth} redirectPath="/">
                <Login />
              </ProtectedRoute>
            }
          />
          <Route
            path="/register"
            element={
              <ProtectedRoute isAuthenticated={!isAuth} redirectPath="/">
                <Register />
              </ProtectedRoute>
            }
          />

          <Route
            index
            element={
              <ProtectedRoute isAuthenticated={isAuth} redirectPath="/login">
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute isAuthenticated={isAuth} redirectPath="/login">
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile/edit"
            element={
              <ProtectedRoute isAuthenticated={isAuth} redirectPath="/login">
                <EditProfile />
              </ProtectedRoute>
            }
          />
          <Route path="/games" element={<Games />} />
          {/*//TODO "/games/:title/:id" */}
          <Route
            path="/games/:id"
            element={
              <ProtectedRoute isAuthenticated={isAuth} redirectPath="/login">
                <Game />
              </ProtectedRoute>
            }
          />
          <Route
            path="/games/publish"
            element={
              <ProtectedRoute isAuthenticated={isAuth} redirectPath="/login">
                <PublishGame />
              </ProtectedRoute>
            }
          />
          <Route
            path="/membership"
            element={
              <ProtectedRoute isAuthenticated={isAuth} redirectPath="/login">
                <BecomeAMember />
              </ProtectedRoute>
            }
          />
          <Route path="/arts" element={<Arts />} />
          <Route path="/arts/:id" element={<Art />} />
          <Route
            path="/arts/publish"
            element={
              <ProtectedRoute isAuthenticated={isAuth} redirectPath="/login">
                <PublishArt />
              </ProtectedRoute>
            }
          />
          <Route
            path="/jams"
            element={
              <ProtectedRoute isAuthenticated={isAuth} redirectPath="/login">
                <GameJam />
              </ProtectedRoute>
            }
          />
          <Route
            path="/jams/host"
            element={
              <ProtectedRoute isAuthenticated={isAuth} redirectPath="/login">
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
