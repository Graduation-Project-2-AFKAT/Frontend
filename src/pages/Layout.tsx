import { Outlet, useLocation } from "react-router";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { useState } from "react";

const RootLayout = () => {
  const location = useLocation();
  const authorized =
    location.pathname !== "/login" && location.pathname !== "/register";

  const [showSidebar, setShowSidebar] = useState(window.innerWidth >= 768);
  const [showHeaders, setShowHeaders] = useState(
    window.innerWidth >= 768 && window.innerWidth < 1024,
  );

  return (
    <div className="w-screen">
      <Navbar
        setShowSidebar={setShowSidebar}
        setShowHeaders={setShowHeaders}
        showHeaders={showHeaders}
      />
      {authorized && (
        <Sidebar showSidebar={showSidebar} setShowSidebar={setShowSidebar} />
      )}
      {/* //TODO Refactor responsive outlet */}
      {/* <div className="flex justify-center">
        <Outlet />
      </div> */}
    </div>
  );
};

export default RootLayout;
