import { Outlet, useLocation } from "react-router";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

const RootLayout = () => {
  const location = useLocation();
  const authorized =
    location.pathname !== "/login" && location.pathname !== "/register";

  return (
    <div className="w-screen">
      <Navbar />
      {authorized && <Sidebar />}
      {/* //TODO Refactor responsive outlet */}
      {/* <div className="flex justify-center">
        <Outlet />
      </div> */}
    </div>
  );
};

export default RootLayout;
