import { Outlet, useLocation } from "react-router";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { toast } from "react-toastify";

const RootLayout = () => {
  const location = useLocation();
  const authorized =
    location.pathname !== "/login" && location.pathname !== "/register";
  const alerts = useSelector((state: RootState) => state.alerts);
  const [showSidebar, setShowSidebar] = useState(window.innerWidth >= 768);
  const [expandSidebar, setExpandSidebar] = useState(false);
  const [showMiniNav, setShowMiniNav] = useState(false);

  useEffect(() => {
    if (alerts.show) {
      toast(alerts.msg, {
        type: alerts.type as
          | "info"
          | "success"
          | "warning"
          | "error"
          | "default",
      });
    }
  }, [alerts.show]);

  return (
    <div>
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
      <div className="flex h-screen justify-center pt-18 md:ml-20">
        <Outlet />
      </div>
    </div>
  );
};

export default RootLayout;
