import { Routes, Route } from "react-router";
import RootLayout from "./pages/Layout";
import Home from "./pages/Home";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import ErrorHandler from "./components/errors/ErrorHanbdler";
import PageNotFound from "./pages/PageNotFound";
import "./App.css";
import Profile from "./pages/Profile";

const userData = {
  email: "joe@joe.com",
  name: "joe",
  image: "image.webp",
};

function App() {
  return (
    <div>
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
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>

        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </div>
  );
}

export default App;
