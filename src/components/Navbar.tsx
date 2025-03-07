import Divider from "./ui/Divider";
import { useLocation } from "react-router";

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

  const handleMenuClick = () => {
    setShowSidebar((prev) => !prev);
    setExpandSidebar((prev) => !prev);
  };

  return (
    //TODO make underline white/100 when selected
    <nav className="fixed z-50 flex h-18 w-screen items-center justify-between gap-5 bg-[#121015] px-8">
      <div className="relative">
        <div className="underlineNav flex items-center gap-6 border md:gap-0">
          <i
            className="fa-solid fa-bars md:before:hidden"
            onClick={handleMenuClick}
          ></i>

          <a href="/" className="flex h-10 w-auto cursor-pointer gap-4">
            <img
              src="../../public/images/AFK.svg"
              alt="AFK Buttons Logo"
              className=""
            />

            <img
              src="../../public/images/logoOutlined.svg"
              alt="AFKAT Logo"
              className="hidden lg:inline"
            />
          </a>
        </div>
      </div>

      {authorized && (
        <div className="hidden grow items-center gap-5 border-2 px-0 md:mx-8 md:flex">
          <ul className="hidden items-center gap-4 lg:flex">
            <li className="underlineNav relative cursor-pointer after:-bottom-6 hover:text-gray-300">
              Discover
            </li>

            <li className="underlineNav relative cursor-pointer after:-bottom-6 hover:text-gray-300">
              Store
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
                      Discover
                    </li>
                    <li className="cursor-pointer px-4 py-2 hover:bg-[#1f1c24]">
                      Store
                    </li>
                    <li className="cursor-pointer px-4 py-2 hover:bg-[#1f1c24]">
                      Learn
                    </li>
                  </ul>
                </div>

                <div
                  className="fixed inset-0 z-5 bg-red-400/10" //TODO replace bg-red-400/10 with bg-transparent
                  onClick={() => setShowMiniNav(false)}
                />
              </>
            )}
          </div>

          <div className="mx-0 grow rounded-md bg-[#2A2731] py-2 pl-3 text-sm text-gray-500">
            <i className="fa-solid fa-magnifying-glass mr-4"></i>
            Search
          </div>
        </div>
      )}

      <div className="border px-5">
        {authorized ? (
          <div className="flex items-center">
            <ul className="hidden items-center gap-2 lg:flex">
              <li>
                <a
                  href="/login"
                  className="rounded-lg border-2 p-2 text-sm text-nowrap"
                >
                  Become a member
                </a>
              </li>

              <li className="relative">
                <i className="fa-solid fa-bell underlineNav w-10 text-center text-xl after:-bottom-6.5"></i>
              </li>

              <li>
                <i className="fa-solid fa-circle-user underlineNav relative w-10 text-center text-3xl after:-bottom-5.5"></i>
              </li>
            </ul>

            <i className="fa-solid fa-circle-user hidden text-3xl lg:before:hidden"></i>
          </div>
        ) : (
          <div className="flex flex-1 justify-end text-sm">
            <ul className="flex items-center space-x-4 text-sm">
              <li>
                <a href="/login" className="rounded-lg border-2 px-3 py-1">
                  Login
                </a>
              </li>
              <Divider className="py-2.5" />
              <li>
                <a href="/register">Register</a>
              </li>
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
