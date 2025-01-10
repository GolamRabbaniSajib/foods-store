import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Main = () => {
  return (
    <div className="font-libre">
      <nav>
        <Navbar></Navbar>
      </nav>
      <main className="pt-16 dark:bg-gray-900 dark:text-gray-100 min-h-screen">
        <Outlet></Outlet>
      </main>
      <Footer></Footer>
    </div>
  );
};

export default Main;
