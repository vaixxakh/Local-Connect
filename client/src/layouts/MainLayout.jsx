import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

const MainLayout = ({ onLoginClick }) => {
  return (
    <>
      <Navbar onLoginClick={onLoginClick} />

      <div className="max-md:pt-14 max-md:pb-16">
        <Outlet />
      </div>
    </>
  );
};

export default MainLayout;