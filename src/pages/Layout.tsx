import { Outlet } from "react-router";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { AlertMessages } from "../interfaces";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { resetAlertMsg } from "../redux/modules/alerts";

const RootLayout = () => {
  const { isAuth } = useAppSelector((state) => state.users);

  const { show, msgs, type } = useAppSelector((state) => state.alerts);
  const dispatch = useAppDispatch();

  const [showSidebar, setShowSidebar] = useState(window.innerWidth >= 768);
  const [expandSidebar, setExpandSidebar] = useState(false);
  const [showMiniNav, setShowMiniNav] = useState(false);

  useEffect(() => {
    if (show) {
      const errorsMsgs = msgs as AlertMessages;

      if (typeof errorsMsgs === "string") {
        toast(errorsMsgs, {
          type: type as "info" | "success" | "warning" | "error" | "default",
        });
      } else if (errorsMsgs) {
        Object.keys(errorsMsgs).forEach((key) => {
          const msg = errorsMsgs[key];

          if (msg) {
            if (Array.isArray(msg)) {
              msg.forEach((message: string) => {
                toast(message, {
                  type: type as
                    | "info"
                    | "success"
                    | "warning"
                    | "error"
                    | "default",
                });
              });
            }
          }
        });
      }
    }

    if (show) {
      dispatch(resetAlertMsg());
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [msgs, show]);

  return (
    <div>
      <div>
        <Navbar
          showSidebar={showSidebar}
          setShowSidebar={setShowSidebar}
          showMiniNav={showMiniNav}
          setShowMiniNav={setShowMiniNav}
          setExpandSidebar={setExpandSidebar}
        />

        {isAuth && (
          <Sidebar
            showSidebar={showSidebar}
            setShowSidebar={setShowSidebar}
            expandSidebar={expandSidebar}
            setExpandSidebar={setExpandSidebar}
          />
        )}
        <div
          className={`${isAuth && "md:ml-20"} flex h-screen justify-center overflow-y-auto pt-18`}
          id="main-elem"
        >
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default RootLayout;
