import { Link } from "react-router-dom";
import bannerImage from "../assets/banner.avif";

const Banner = () => {
  return (
    <div
      className="relative text-white min-h-[90vh] bg-cover bg-center flex items-center justify-center"
      style={{ backgroundImage: `url(${bannerImage})` }}
    >
      {/* Overlay for better readability */}
      <div className="absolute inset-0 bg-black/60 z-0" />

      <div className="relative z-10 max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight mb-4">
          <span className="text-green-400">Welcome to</span>{" "}
          <span className="text-red-400">the Food Store</span>
        </h1>
        <p className="text-base sm:text-lg md:text-xl font-medium text-gray-200 mb-6">
          Discover delicious recipes and add your own unique dishes to our collection.
        </p>
        <Link to="/foods">
          <button className="relative group px-6 py-3 sm:px-8 sm:py-3 text-base sm:text-lg font-semibold text-white bg-blue-500 rounded-xl shadow-md overflow-hidden hover:bg-blue-600 transition duration-300">
            <span className="absolute inset-0 w-0 group-hover:w-full h-full bg-purple-500 transition-all duration-300 ease-out z-0 rounded-xl"></span>
            <span className="relative z-10">Explore All Foods</span>
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Banner;
