import { LogOut } from "lucide-react";
import { useState } from "react";
import { Link, NavLink } from "react-router";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { logout } from "../redux/modules/users";
import Divider from "./ui/Divider";

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
  const dispatch = useAppDispatch();
  const { user, isAuth } = useAppSelector((state) => state.users);

  const [showUserMenu, setShowUserMenu] = useState(false);

  const handleMenuClick = () => {
    setShowSidebar((prev) => !prev);
    setExpandSidebar((prev) => !prev);
  };

  const userLogout = () => {
    dispatch(logout());
    setShowUserMenu(false);
  };

  return (
    //TODO make underline white/100 when selected
    <nav className="fixed z-50 flex h-18 w-screen items-center justify-between gap-5 bg-[#121015]/10 px-8 shadow-[1px_1px_5px_rgba(0,0,0,0.5)] drop-shadow-md backdrop-blur-sm">
      <div // Click outside any opened menu to close it
        className={`${showMiniNav || showUserMenu ? "fixed" : "hidden"} inset-0 z-5 h-screen w-screen bg-black/25`}
        onClick={() => {
          if (showMiniNav) {
            setShowMiniNav(false);
          } else if (showUserMenu) {
            setShowUserMenu(false);
          }
        }}
      />

      <div className="relative">
        <div className="flex items-center gap-6 md:gap-0">
          <i
            className="fa-solid fa-bars md:before:hidden"
            onClick={handleMenuClick}
          />

          <NavLink
            to="/"
            className="underlineNav flex h-10 w-auto cursor-pointer gap-4 after:-left-full after:scale-x-325"
          >
            <img src="/images/AFK_Buttons.svg" alt="AFK Buttons Logo" />

            <img
              src="/images/logoOutlined.svg"
              alt="AFKAT Logo"
              className="hidden md:inline"
            />
          </NavLink>
        </div>
      </div>

      {isAuth && (
        <div className="hidden grow items-center gap-12 md:mx-8 md:flex">
          <ul className="hidden items-center gap-x-5 lg:flex">
            <li>
              <NavLink
                to="/games"
                className={`underlineNav relative cursor-pointer after:-bottom-[1.57rem] hover:text-gray-300`}
              >
                Games
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/arts"
                className="underlineNav relative cursor-pointer after:-bottom-[1.57rem] hover:text-gray-300"
              >
                Arts
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/jams"
                className="underlineNav relative cursor-pointer after:-bottom-[1.57rem] hover:text-gray-300"
              >
                Jams
              </NavLink>
            </li>
          </ul>

          {/* mini navbar */}
          <div className="block lg:hidden">
            <i
              className="fa-solid fa-ellipsis-vertical cursor-pointer"
              onClick={() => setShowMiniNav((prev) => !prev)}
            />
            {showMiniNav && (
              <>
                <div className="absolute top-full left-57.5 z-10 mt-2 w-48 rounded-md bg-[#3B3842] py-2 shadow-lg before:absolute before:-top-full before:bottom-full before:left-6 before:-z-1 before:border-r-10 before:border-b-15 before:border-l-10 before:border-[#3B3842] before:border-r-transparent before:border-l-transparent">
                  <ul className="text-sm">
                    <li className="cursor-pointer hover:bg-[#1f1c24]">
                      <Link
                        to="/games"
                        className="block px-4 py-2"
                        onClick={() => {
                          setShowMiniNav(false);
                        }}
                      >
                        Games
                      </Link>
                    </li>
                    <li className="cursor-pointer hover:bg-[#1f1c24]">
                      <Link
                        to="/arts"
                        className="block px-4 py-2"
                        onClick={() => {
                          setShowMiniNav(false);
                        }}
                      >
                        Arts
                      </Link>
                    </li>
                    <li className="cursor-pointer hover:bg-[#1f1c24]">
                      <Link
                        to="/jams"
                        className="block px-4 py-2"
                        onClick={() => {
                          setShowMiniNav(false);
                        }}
                      >
                        Jams
                      </Link>
                    </li>
                  </ul>
                </div>
              </>
            )}
          </div>

          <div className="bg-primary/5 mx-0 flex grow items-center rounded-md border border-white/25 py-2 pl-3 text-sm">
            <i className="fa-solid fa-magnifying-glass mr-4" />
            <input
              id="search-bar"
              type="text"
              placeholder="Search"
              className="w-full pr-4 outline-none"
            />
          </div>
        </div>
      )}

      <div>
        {isAuth ? (
          <div className="flex items-center">
            <ul className="hidden items-center gap-2 lg:flex">
              <li>
                <NavLink
                  to="/membership"
                  className="rounded-lg border-2 p-2 text-sm text-nowrap hover:opacity-70"
                >
                  Become a member
                </NavLink>
              </li>

              <li className="relative">
                <i className="fa-solid fa-bell underlineNav w-10 cursor-pointer text-center text-xl after:-bottom-7" />
              </li>

              <li>
                <i
                  className="fa-solid fa-circle-user underlineNav relative w-10 cursor-pointer text-center text-3xl after:-bottom-[1.41rem]"
                  onClick={() => {
                    return setShowUserMenu((prev) => !prev);
                  }}
                />
              </li>
            </ul>

            <div className="flex items-center gap-x-5 lg:hidden">
              <i className="fa-solid fa-bell underlineNav w-10 cursor-pointer text-center text-2xl after:-bottom-7" />
              <i
                className="fa-solid fa-circle-user hidden cursor-pointer pr-1 text-3xl lg:pr-0 lg:before:hidden"
                onClick={() => {
                  return setShowUserMenu((prev) => !prev);
                }}
              />
            </div>

            {/* user menu */}
            <div
              className={`${showUserMenu ? "opacity-100" : "pointer-events-none opacity-0 duration-200"} absolute top-22 right-3 z-5 aspect-auto w-60 -translate-x-5 rounded-lg border border-[#8E8D92] bg-[#1D1A25] opacity-0 drop-shadow-2xl before:absolute before:-top-4.5 before:right-3 before:h-0 before:w-0 before:border-8 before:border-b-10 before:border-transparent before:border-b-[#8E8D92]`}
            >
              <NavLink to="/profile" onClick={() => setShowUserMenu(false)}>
                <div className="rounded-t-md px-4 pt-4 hover:bg-white/5">
                  <p className="text-xl font-bold">
                    {user?.username || "Username"}
                  </p>
                  <small className="font-medium">
                    @{user?.username || "Username"}
                  </small>

                  <hr className="mt-4 border-white/50" />
                </div>
              </NavLink>

              <div>
                <NavLink
                  to="/profile"
                  className="block px-4 py-2.5 hover:bg-white/5"
                  onClick={() => setShowUserMenu(false)}
                >
                  Profile
                </NavLink>
                <NavLink
                  to="/games"
                  className="block px-4 py-2.5 hover:bg-white/5"
                  onClick={() => setShowUserMenu(false)}
                >
                  Games
                </NavLink>
                <NavLink
                  to="/settings"
                  className="block px-4 py-2.5 hover:bg-white/5"
                  onClick={() => setShowUserMenu(false)}
                >
                  Settings
                </NavLink>

                <div className="px-4">
                  <small className="btn btn-primary my-3 flex h-9 w-full cursor-pointer items-center justify-center rounded-md text-base font-semibold tracking-wider">
                    Invite a friend
                  </small>

                  <hr className="mt-0 border-white/50" />
                </div>

                <div
                  className="flex cursor-pointer rounded-b-md px-3 py-4 hover:bg-white/5"
                  onClick={userLogout}
                >
                  {/* //TODO replace bg-red-400/10 with bg-transparent */}
                  <LogOut className="text-secondary mr-2 scale-[-.9]" /> Logout
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-1 justify-end text-sm">
            <ul className="flex items-center space-x-4 text-sm">
              <li>
                <NavLink
                  to="/login"
                  className={`underlineNav rounded-lg border-2 px-3 py-1 duration-150 after:-bottom-[1.44rem]`}
                >
                  Login
                </NavLink>
              </li>
              <Divider className="py-2.5" />
              <li>
                <NavLink
                  to="/register"
                  className={`underlineNav duration-150 after:-bottom-[1.69rem]`}
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
