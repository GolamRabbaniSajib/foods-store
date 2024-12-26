import { Link } from "react-router-dom";
import bannerImage from "../assets/banner.avif";

const Banner = () => {
  return (
    <div
      className="relative  text-white py-20 mb-10"
      style={{ backgroundImage: `url(${bannerImage})` }}
    >
      <div className="max-w-4xl mx-auto text-center px-6">
        <h1 className="text-5xl font-extrabold mb-4">
          <span className="text-green-400">Welcome to</span> <span className="text-red-400">the Food Store</span>
        </h1>
        <p className="text-lg font-medium mb-6">
          Discover delicious recipes and add your own unique dishes to our
          collection.
        </p>
        <Link to={"/foods"}>
          <button className="relative group px-6 py-3 text-lg font-semibold text-white bg-blue-500 rounded-lg overflow-hidden shadow-md hover:bg-blue-600 transition duration-300">
            <span className="absolute inset-0 w-0 h-full bg-purple-500 transition-all duration-300 ease-out group-hover:w-full"></span>
            <span className="relative z-10">Explore All Foods</span>
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Banner;
