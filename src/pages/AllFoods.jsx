import { IoSearchSharp } from "react-icons/io5";
import { IoMdPricetags } from "react-icons/io";
import { MdProductionQuantityLimits } from "react-icons/md";
import foodBgImage from "../assets/allfoodbg.avif";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { GiWorld } from "react-icons/gi";
const AllFoods = () => {
  const [foods, setFoods] = useState([]);
  const [search, setSearch] = useState("");
  useEffect(() => {
    const fetchAllFoods = async () => {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/foods?search=${search}`
      );
      setFoods(data);
    };
    fetchAllFoods();
  }, [search]);

  return (
    <div className="">
      <Helmet>
        <title>Food | All Food</title>
      </Helmet>
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
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search..."
              className="px-4 py-2 w-80 text-gray-700 rounded-full border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <button className="absolute text-3xl right-2 top-1/2 transform -translate-y-1/2 text-blue-500 hover:text-blue-700 focus:outline-none">
              <IoSearchSharp />
            </button>
          </div>
        </div>
      </section>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 py-6 w-11/12 mx-auto min-h-screen">
        {foods.map((food) => (
          <div
            key={food._id}
            className="border rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300"
          >
            {/* Image Section */}
            <div className="relative">
              <img
                src={food.foodImage}
                alt={food.foodName}
                className="w-full h-48 object-cover"
              />
              <div className="absolute top-3 left-3 bg-blue-500 text-white text-xs px-3 py-1 rounded-full uppercase font-semibold shadow-md">
                {food.category}
              </div>
            </div>

            {/* Content Section */}
            <div className="px-6 pt-2 pb-4">
              <h2 className="text-xl font-bold mb-2">{food.foodName}</h2>
              <p className=" text-sm mb-4">
                {food.description.substring(0, 40)}...
              </p>
              <div className=" text-sm mb-4">
                <div className="grid grid-cols-2 my-2">
                  <span className="font-semibold flex items-center space-x-1">
                    <GiWorld /> <span>Origin:</span>
                  </span>{" "}
                  <span>{food?.foodOrigin}</span>
                </div>
                <div className="grid grid-cols-2 ">
                  <span className="font-semibold flex items-center space-x-1">
                    <IoMdPricetags /> <span>Price:</span>
                  </span>{" "}
                  <span className="text-blue-400 font-semibold">
                    ${food.price}
                  </span>
                </div>
                <div className="grid grid-cols-2 my-2">
                  <span className="font-semibold flex items-center space-x-1">
                    <MdProductionQuantityLimits /> <span>Quantity:</span>
                  </span>{" "}
                  <span
                    className={
                      food.quantity === 0 ? "text-red-400" : "text-green-400"
                    }
                  >
                    {food.quantity}
                  </span>
                </div>
              </div>

              {/* Button */}
              <Link to={`/food/${food._id}`}>
                <button className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-2 rounded-lg font-medium hover:from-purple-600 hover:to-blue-500 transition-colors duration-200">
                  Purchase
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllFoods;
