import { IoSearchSharp } from "react-icons/io5";
import foodBgImage from "../assets/allfoodbg.avif";
const AllFoods = () => {
  return (
    <div className="container mx-auto">
      <section
        className="relative bg-cover bg-center h-80 flex items-center justify-center text-white"
        style={{ backgroundImage: `url(${foodBgImage})` }}
      >
        {/* Overlay for dimming the background */}
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>

        {/* Centered Page Name */}
        <div className="relative z-10 text-center space-y-4">
          <h1 className="text-4xl font-bold">ALL FOODS</h1>
          <div className="relative">
            <input
              type="text"
              placeholder="Search..."
              className="px-4 py-2 w-80 text-gray-700 rounded-full border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <button
              className="absolute text-3xl right-2 top-1/2 transform -translate-y-1/2 text-blue-500 hover:text-blue-700 focus:outline-none"
            >
              <IoSearchSharp />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AllFoods;
