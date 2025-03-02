import Divider from "./ui/Divider";
import { useLocation } from "react-router";

const Navbar = () => {
  const location = useLocation();
  const authorized =
    location.pathname !== "/login" && location.pathname !== "/register";

  return (
    <nav className="relative z-50 flex h-18 items-center justify-between border-b-2 bg-[#121015] px-2 text-lg font-medium text-white">
      <div className="flex-1 px-6">
        <a href="/" className="inline-flex cursor-pointer duration-150">
          <img
            src="../../public/images/AFK.svg"
            alt="AFK Buttons Logo"
            className="mt-1 mr-4 h-12 w-auto"
          />

          <img
            src="../../public/images/logoOutlined.png"
            alt="AFKAT Logo"
            className="h-12 w-auto"
          />
        </a>
      </div>

      <div className="flex flex-1 justify-center">
        {authorized ? (
          <div className="flex items-center gap-8 font-light">
            <ul className="flex gap-5">
              <li>Discover</li>
              <li>Store</li>
              <li>Learn</li>
            </ul>

            <Divider />

            <div className="w-96 rounded-md bg-[#2A2731] p-2 pl-3 text-sm text-gray-500">
              <i className="fa-solid fa-magnifying-glass mr-2"></i>
              Search
            </div>

            <Divider />

            <div className="flex flex-1 justify-end">
              <ul className="flex items-center gap-5">
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
            </div>
          </div>
        ) : (
          <div className="flex flex-1 justify-end px-10 text-sm">
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
    </nav>
  );
};

export default Navbar;
