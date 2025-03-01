import Divider from "./Divider";
import { useLocation } from "react-router";

const Navbar = () => {
  const location = useLocation();
  const authorized =
    location.pathname !== "/login" && location.pathname !== "/register";

  return (
    <nav className="relative z-50 flex h-18 items-center justify-between border-b-2 bg-[#121015] px-10 text-lg font-medium text-white">
      <div className="flex-1">
        <a href="/" className="cursor-pointer">
          Logo
        </a>
      </div>

      <div className="flex flex-1 justify-center">
        {authorized ? (
          <div className="flex items-center gap-10">
            <ul className="flex gap-5">
              <li>Discover</li>
              <li>Store</li>
              <li>Learn</li>
            </ul>

            <Divider />

            <div className="w-96 rounded-md bg-[#2A2731] p-2 pl-3 text-sm">
              Search
            </div>

            <Divider />
          </div>
        ) : null}
      </div>

      <div className="flex flex-1 justify-end">
        <ul className="flex gap-5">
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
    </nav>
  );
};

export default Navbar;
