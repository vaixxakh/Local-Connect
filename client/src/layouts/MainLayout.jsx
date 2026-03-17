import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

const MainLayout = ({ onLoginClick }) => {
  return (
    <>
      <Navbar onLoginClick={onLoginClick} />

      <div >
        <Outlet />
      </div>
    </>
  );
};

export default MainLayout;