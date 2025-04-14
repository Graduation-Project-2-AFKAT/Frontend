import { Outlet, useLocation } from "react-router";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { toast } from "react-toastify";
import { AlertMessages } from "../interfaces";

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
      const errorsMsgs = alerts.msgs as AlertMessages;

      Object.keys(errorsMsgs).forEach((key) => {
        const msg = errorsMsgs[key];

        if (msg) {
          msg.forEach((message: string) => {
            toast(message, {
              type: alerts.type as
                | "info"
                | "success"
                | "warning"
                | "error"
                | "default",
            });
          });
        }
      });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [alerts.msgs]);

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
      <div
        className={`${authorized && "md:ml-20"} flex h-screen justify-center overflow-y-auto pt-18`}
        id="main-elem"
      >
        <Outlet />
      </div>
    </div>
  );
};

export default RootLayout;
