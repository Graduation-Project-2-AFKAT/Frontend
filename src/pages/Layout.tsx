import { Outlet } from "react-router";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { AlertMessages } from "../interfaces";
import { loadUser } from "../redux/modules/users";
import { useAppDispatch, useAppSelector } from "../redux/hooks";

const RootLayout = () => {
  const { isLoading, type: loadingType } = useAppSelector(
    (state) => state.loading,
  );
  const { isAuth, user } = useAppSelector((state) => state.users);

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

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [msgs]);

  useEffect(() => {
    if (localStorage.getItem("access_token") && !user) {
      dispatch(loadUser());
      console.log("user loaded - Layout.tsx");
    }
  }, [user, isAuth]);

  useEffect(() => {
    if (user) {
      localStorage.removeItem("username");
      localStorage.removeItem("email");
    }
  }, [user]);

  return (
    <div>
      {isLoading && loadingType !== "games/download" ? (
        <div
          className={`${isAuth && "md:ml-20"} flex h-screen items-center justify-center overflow-y-auto pt-18`}
        >
          <div className="flex flex-col items-center">
            <div className="border-primary h-16 w-16 animate-spin rounded-full border-t-2 border-b-2"></div>
            <p className="mt-4 text-gray-600">Loading...</p>
          </div>
        </div>
      ) : (
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
      )}
    </div>
  );
};

export default RootLayout;
