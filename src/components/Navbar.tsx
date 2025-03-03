import Divider from "./ui/Divider";
import { useLocation } from "react-router";

const Navbar = () => {
  const location = useLocation();
  const authorized =
    location.pathname !== "/login" && location.pathname !== "/register";

  return (
    <nav className="relative z-50 flex h-18 w-screen items-center justify-between gap-5 border-b-2 bg-[#121015] px-8 md:px-10">
      <div className="flex items-center gap-6 border md:gap-0">
        <i className="fa-solid fa-bars md:before:hidden"></i>

        <a href="/" className="flex h-10 w-auto cursor-pointer gap-4">
          <img
            src="../../public/images/AFK.svg"
            alt="AFK Buttons Logo"
            className=""
          />

          <img
            src="../../public/images/logoOutlined.svg"
            alt="AFKAT Logo"
            className="hidden md:inline"
          />
        </a>
      </div>

      {authorized && (
        <div className="hidden grow gap-5 border px-20 md:flex lg:px-4">
          <ul className="hidden items-center gap-4 lg:flex">
            <li className="cursor-pointer hover:text-gray-300">Discover</li>
            <li className="cursor-pointer hover:text-gray-300">Store</li>
            <li className="cursor-pointer hover:text-gray-300">Learn</li>
          </ul>

          <div className="grow rounded-md bg-[#2A2731] py-2 pl-3 text-sm text-gray-500">
            <i className="fa-solid fa-magnifying-glass mr-2"></i>
            Search
          </div>
        </div>
      )}

      <div className="border">
        {authorized ? (
          <div className="flex items-center">
            <ul className="hidden items-center gap-5 lg:flex">
              <li>
                <a
                  href="/login"
                  className="rounded-lg border-2 p-2 text-sm text-nowrap"
                >
                  Become a member
                </a>
              </li>

              <li>
                <i className="fa-solid fa-bell text-xl"></i>
              </li>

              <li>
                <i className="fa-solid fa-circle-user text-3xl"></i>
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

      {/*         
        {authorized ? (
          <div>
            <div className="">
              <ul className="hidden items-center gap-5 md:flex">
                <li>
                  <a
                    href="/login"
                    className="rounded-lg border-2 p-2 text-sm text-nowrap"
                  >
                    Become a member
                  </a>
                </li>

                <li>
                  <i className="fa-solid fa-bell text-xl"></i>
                </li>

                <li>
                  <i className="fa-solid fa-circle-user mr-6 text-3xl"></i>
                </li>
              </ul>

              <ul className="md:hidden">xs</ul>
            </div>
          </div>
        ) : (
          <div className="px- 0 flex flex-1 justify-end text-sm">
            <ul className="flex space-x-4">
              <li>
                <a href="/login" className="rounded-lg border-2 px-3 py-1">
                  Login
                </a>
              </li>
              <Divider />
              <li>
                <a href="/register">Register</a>
              </li>
            </ul>
          </div>
        )}
      </div> 
      */}
    </nav>
  );
};

export default Navbar;
