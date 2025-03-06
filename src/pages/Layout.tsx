import { Outlet, useLocation } from "react-router";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { useState } from "react";

const RootLayout = () => {
  const location = useLocation();
  const authorized =
    location.pathname !== "/login" && location.pathname !== "/register";

  const [showSidebar, setShowSidebar] = useState(window.innerWidth >= 1024);
  const [expandSidebar, setExpandSidebar] = useState(false);
  const [showMiniNav, setShowMiniNav] = useState(false);

  return (
    <div className="w-screen">
      <Navbar
        showSidebar={showSidebar}
        setShowSidebar={setShowSidebar}
        showMiniNav={showMiniNav}
        setShowMiniNav={setShowMiniNav}
        setExpandSidebar={setExpandSidebar}
      />
      {authorized && (
        <Sidebar
          showSidebar={showSidebar}
          setShowSidebar={setShowSidebar}
          expandSidebar={expandSidebar}
          setExpandSidebar={setExpandSidebar}
        />
      )}
      {/* //TODO Refactor responsive outlet */}
      {/* <div className="flex justify-center">
        <Outlet />
      </div> */}
    </div>
  );
};

export default RootLayout;
