import { lazy, Suspense, useEffect } from "react";
import { Route, Routes } from "react-router";

const RootLayout = lazy(() => import("./pages/Layout"));
const ErrorHandler = lazy(() => import("./components/errors/ErrorHanbdler"));
const ProtectedRoute = lazy(() => import("./components/auth/ProtectedRoute"));
const Login = lazy(() => import("./pages/auth/Login"));
const Register = lazy(() => import("./pages/auth/Register"));
const Home = lazy(() => import("./pages/Home"));
const SinglePost = lazy(() => import("./pages/SinglePost"));
const Profile = lazy(() => import("./pages/Profile"));
const EditProfile = lazy(() => import("./pages/profile/EditProfile"));
const BecomeAMember = lazy(() => import("./pages/BecomeAMember"));
const Achievements = lazy(() => import("./pages/Achievements"));
const Leaderboards = lazy(() => import("./pages/Leaderboards"));
const LeaderboardDetails = lazy(() => import("./pages/LeaderboardDetails"));
const Games = lazy(() => import("./pages/Games"));
const Game = lazy(() => import("./pages/Game"));
const PublishGame = lazy(() => import("./pages/PublishGame"));
const Arts = lazy(() => import("./pages/Arts"));
const Art = lazy(() => import("./pages/Art"));
const PublishArt = lazy(() => import("./pages/PublishArt"));
const GameJam = lazy(() => import("./pages/GameJam"));
const HostJam = lazy(() => import("./pages/HostJam"));
const PageNotFound = lazy(() => import("./pages/PageNotFound"));

import { useSelector } from "react-redux";
import { ToastContainer, ToastPosition } from "react-toastify";
import "./App.css";
import { useAppDispatch } from "./redux/hooks";
import { loadMyUser } from "./redux/modules/users";
import { RootState } from "./redux/store";
import EditArt from "./components/Arts/EditArt";
import EditGame from "./components/games/EditGame";

const LoadingFallback = ({ isAuth }: { isAuth: boolean }) => (
  <div
    className={`${isAuth && "md:ml-20"} flex h-screen items-center justify-center overflow-y-auto pt-18`}
  >
    <div className="flex flex-col items-center">
      <div className="border-primary h-16 w-16 animate-spin rounded-full border-t-2 border-b-2" />
      <p className="mt-4 text-gray-600">Loading...</p>
    </div>
  </div>
);

function App() {
  const { user, isAuth } = useSelector((state: RootState) => state.users);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (localStorage.getItem("access_token") && !user) {
      // Make sure your loadMyUser action creator properly sets and clears loading state
      dispatch(loadMyUser());
      console.log("user loaded - Layout");
    }
  }, [user, dispatch]);

  useEffect(() => {
    if (user) {
      localStorage.removeItem("username");
      localStorage.removeItem("email");
    }
  }, [user]);

  const toastOptions = {
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
    <div className="min-h-screen">
      <ToastContainer {...toastOptions} style={{ marginRight: "2rem" }} />
      <Suspense fallback={<LoadingFallback isAuth={isAuth} />}>
        <Routes>
          <Route
            path="/"
            element={<RootLayout />}
            errorElement={<ErrorHandler />}
          >
            <Route
              index
              element={
                <ProtectedRoute isAuthenticated={isAuth} redirectPath="/login">
                  <Home />
                </ProtectedRoute>
              }
            />
            <Route
              path="/post/:id"
              element={
                <ProtectedRoute isAuthenticated={isAuth} redirectPath="/login">
                  <SinglePost />
                </ProtectedRoute>
              }
            />
            <Route
              path="/login"
              element={
                <ProtectedRoute
                  isAuthenticated={!isAuth}
                  redirectPath="/"
                  isAuthRoute={true}
                >
                  <Login />
                </ProtectedRoute>
              }
            />
            <Route
              path="/register"
              element={
                <ProtectedRoute
                  isAuthenticated={!isAuth}
                  redirectPath="/"
                  isAuthRoute={true}
                >
                  <Register />
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
              path="/profile/:id"
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
            <Route
              path="/membership"
              element={
                <ProtectedRoute isAuthenticated={isAuth} redirectPath="/login">
                  <BecomeAMember />
                </ProtectedRoute>
              }
            />
            <Route
              path="/achievements"
              element={
                <ProtectedRoute isAuthenticated={isAuth} redirectPath="/login">
                  <Achievements />
                </ProtectedRoute>
              }
            />
            <Route
              path="/leaderboards"
              element={
                <ProtectedRoute isAuthenticated={isAuth} redirectPath="/login">
                  <Leaderboards />
                </ProtectedRoute>
              }
            />
            <Route
              path="/leaderboards/:id"
              element={
                <ProtectedRoute isAuthenticated={isAuth} redirectPath="/login">
                  <LeaderboardDetails />
                </ProtectedRoute>
              }
            />
            <Route path="/games" element={<Games />} />
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
              path="/games/:id/edit"
              element={
                <ProtectedRoute isAuthenticated={isAuth} redirectPath="/login">
                  <EditGame />
                </ProtectedRoute>
              }
            />

            <Route path="/arts" element={<Arts />} />
            <Route
              path="/arts/:id"
              element={
                <ProtectedRoute isAuthenticated={isAuth} redirectPath="/login">
                  <Art />
                </ProtectedRoute>
              }
            />
            <Route
              path="/arts/publish"
              element={
                <ProtectedRoute isAuthenticated={isAuth} redirectPath="/login">
                  <PublishArt />
                </ProtectedRoute>
              }
            />
            <Route
              path="/arts/:id/edit"
              element={
                <ProtectedRoute isAuthenticated={isAuth} redirectPath="/login">
                  <EditArt />
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
      </Suspense>
    </div>
  );
}

export default App;
