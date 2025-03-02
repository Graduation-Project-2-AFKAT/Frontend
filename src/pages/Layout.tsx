import { Outlet } from "react-router";
import Navbar from "../components/Navbar";

const RootLayout = () => {
  return (
    <>
      <Navbar />
      <div className="flex justify-center">
        <Outlet />
      </div>
    </>
  );
};

export default RootLayout;
