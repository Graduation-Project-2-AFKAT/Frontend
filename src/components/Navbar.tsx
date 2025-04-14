import { useState } from "react";
import Divider from "./ui/Divider";
import { NavLink, useLocation } from "react-router";
import { LogOut } from "lucide-react";

interface IProps {
  showSidebar: boolean;
  setShowSidebar: React.Dispatch<React.SetStateAction<boolean>>;
  showMiniNav: boolean;
  setShowMiniNav: React.Dispatch<React.SetStateAction<boolean>>;
  setExpandSidebar: React.Dispatch<React.SetStateAction<boolean>>;
}

const Navbar = ({
  setShowSidebar,
  showMiniNav,
  setShowMiniNav,
  setExpandSidebar,
}: IProps) => {
  const location = useLocation();
  const authorized =
    location.pathname !== "/login" && location.pathname !== "/register";

  const [showUserMenu, setShowUserMenu] = useState(false);
  const [darkTheme, setDarkTheme] = useState("ON");

  const handleMenuClick = () => {
    setShowSidebar((prev) => !prev);
    setExpandSidebar((prev) => !prev);
  };

  return (
    //TODO make underline white/100 when selected
    <nav className="fixed z-50 flex h-18 w-screen items-center justify-between gap-5 bg-[#121015] px-8">
      <div // Click outside any opened menu to close it
        className={`${showMiniNav || showUserMenu ? "fixed" : "hidden"} inset-0 z-5 bg-red-400/20`} //TODO replace bg-red-400/10 with bg-transparent
        onClick={() => {
          if (showMiniNav) {
            setShowMiniNav(false);
          } else if (showUserMenu) {
            setShowUserMenu(false);
          }
        }}
      />

      <div className="relative">
        <div className="flex items-center gap-6 border md:gap-0">
          <i
            className="fa-solid fa-bars md:before:hidden"
            onClick={handleMenuClick}
          ></i>

          <NavLink
            to="/"
            className="underlineNav flex h-10 w-auto cursor-pointer gap-4 after:-left-full after:scale-x-325"
          >
            <img
              src="/images/AFK_Buttons.svg"
              alt="AFK Buttons Logo"
              className=""
            />

            <img
              src="/images/logoOutlined.svg"
              alt="AFKAT Logo"
              className="hidden lg:inline"
            />
          </NavLink>
        </div>
      </div>

      {authorized && (
        <div className="hidden grow items-center gap-5 border-2 px-0 md:mx-8 md:flex">
          <ul className="hidden items-center gap-4 lg:flex">
            <li className="underlineNav relative cursor-pointer after:-bottom-6 hover:text-gray-300">
              <a href="/games">Discover</a>
            </li>

            <li className="underlineNav relative cursor-pointer after:-bottom-6 hover:text-gray-300">
              <a href="/arts">Arts</a>
            </li>

            <li className="underlineNav relative cursor-pointer after:-bottom-6 hover:text-gray-300">
              Learn
            </li>
          </ul>

          {/* mini navbar */}
          <div className="md:block lg:hidden">
            <i
              className="fa-solid fa-ellipsis-vertical cursor-pointer"
              onClick={() => setShowMiniNav(!showMiniNav)}
            />
            {showMiniNav && (
              <>
                <div className="absolute top-full left-30.5 z-10 mt-2 w-48 rounded-md bg-[#3B3842] py-2 shadow-lg before:absolute before:-top-full before:bottom-full before:left-6 before:-z-1 before:border-r-10 before:border-b-15 before:border-l-10 before:border-[#3B3842] before:border-r-transparent before:border-l-transparent">
                  <ul className="text-sm">
                    <li className="cursor-pointer px-4 py-2 hover:bg-[#1f1c24]">
                      <a href="/games">Discover</a>
                    </li>
                    <li className="cursor-pointer px-4 py-2 hover:bg-[#1f1c24]">
                      <a href="/arts">Arts</a>
                    </li>
                    <li className="cursor-pointer px-4 py-2 hover:bg-[#1f1c24]">
                      Learn
                    </li>
                  </ul>
                </div>
              </>
            )}
          </div>

          <div className="mx-0 flex grow items-center rounded-md bg-[#2A2731] py-2 pl-3 text-sm">
            <i className="fa-solid fa-magnifying-glass mr-4"></i>
            <input
              type="text"
              placeholder="Search"
              className="w-full outline-0"
            />
          </div>
        </div>
      )}

      <div className="border px-5">
        {authorized ? (
          <div className="flex items-center">
            <ul className="hidden items-center gap-2 lg:flex">
              <li>
                <NavLink
                  to="/membership"
                  className="rounded-lg border-2 p-2 text-sm text-nowrap"
                >
                  Become a member
                </NavLink>
              </li>

              <li className="relative">
                <i className="fa-solid fa-bell underlineNav w-10 cursor-pointer text-center text-xl after:-bottom-7"></i>
              </li>

              <li>
                <i
                  className="fa-solid fa-circle-user underlineNav relative w-10 cursor-pointer text-center text-3xl after:-bottom-5.5"
                  onClick={() => {
                    return setShowUserMenu((prev) => !prev);
                  }}
                ></i>
              </li>
            </ul>

            <i
              className="fa-solid fa-circle-user hidden cursor-pointer pr-1 text-3xl lg:pr-0 lg:before:hidden"
              onClick={() => {
                return setShowUserMenu((prev) => !prev);
              }}
            ></i>

            {/* user menu */}
            <div
              className={`${showUserMenu ? "opacity-100" : "pointer-events-none opacity-0 duration-200"} absolute top-22 right-10 z-5 aspect-auto w-60 rounded-lg border border-white/50 bg-black opacity-0 drop-shadow-2xl before:absolute before:-top-4.5 before:right-6 before:h-0 before:w-0 before:border-8 before:border-b-10 before:border-transparent before:border-b-white/50`}
            >
              <NavLink to="/profile" onClick={() => setShowUserMenu(false)}>
                <div className="px-4 pt-4 hover:bg-white/10">
                  <p className="text-xl font-bold">Username</p>
                  <small className="font-medium">@username</small>

                  <hr className="mt-4 border-white/50" />
                </div>
              </NavLink>

              <div>
                <NavLink
                  to="/profile"
                  className="block px-4 py-2.5 hover:bg-white/10"
                  onClick={() => setShowUserMenu(false)}
                >
                  Profile
                </NavLink>
                <NavLink
                  to="/games"
                  className="block px-4 py-2.5 hover:bg-white/10"
                  onClick={() => setShowUserMenu(false)}
                >
                  Games
                </NavLink>
                <NavLink
                  to="/settings"
                  className="block px-4 py-2.5 hover:bg-white/10"
                  onClick={() => setShowUserMenu(false)}
                >
                  Settings
                </NavLink>
                <div
                  className="flex cursor-pointer items-center justify-between px-4 py-2.5 hover:bg-white/10"
                  onClick={() =>
                    setDarkTheme((prev) => (prev === "ON" ? "OFF" : "ON"))
                  }
                >
                  Dark Theme
                  <small className="text-gray-500">{darkTheme}</small>
                </div>

                <div className="px-4">
                  <small className="bg-primary my-3 flex h-9 w-full cursor-pointer items-center justify-center rounded-md text-base font-medium tracking-wider">
                    Invite a friend
                  </small>

                  <hr className="mt-0 border-white/50" />
                </div>

                <NavLink
                  to="/logout"
                  className="flex px-3 py-4 hover:bg-white/10"
                  onClick={() => setShowUserMenu(false)}
                >
                  <LogOut className="mr-2 scale-[-0.7] text-red-400" />
                  Logout
                </NavLink>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-1 justify-end text-sm">
            <ul className="flex items-center space-x-4 text-sm">
              <li>
                <NavLink
                  to="/login"
                  className={`underlineNav rounded-lg border-2 px-3 py-1 duration-150 after:-bottom-5.5`}
                >
                  Login
                </NavLink>
              </li>
              <Divider className="py-2.5" />
              <li>
                <NavLink
                  to="/register"
                  className={`underlineNav duration-150 after:-bottom-6.5`}
                >
                  Register
                </NavLink>
              </li>
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
