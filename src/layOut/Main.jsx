import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

const Main = () => {
  return (
    <div>
      <nav className="w-11/12 mx-auto">
        <Navbar></Navbar>
      </nav>
      <main>
        <Outlet></Outlet>
      </main>
    </div>
  );
};

export default Main;
