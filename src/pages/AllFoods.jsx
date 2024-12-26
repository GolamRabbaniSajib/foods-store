import { IoSearchSharp } from "react-icons/io5";
import foodBgImage from "../assets/allfoodbg.avif";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 py-6 w-11/12 mx-auto">
        {foods.map((food) => (
          <div
            key={food._id}
            className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300"
          >
            {/* Image Section */}
            <div className="relative">
              <img
                src={food.foodImage}
                alt={food.foodName}
                className="w-full h-48 object-cover"
              />
              <div className="absolute top-3 left-3 bg-blue-500 text-white text-xs px-3 py-1 rounded-full uppercase font-semibold shadow-md">
                New
              </div>
            </div>

            {/* Content Section */}
            <div className="p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-2">
                {food.foodName}
              </h2>
              <p className="text-gray-600 text-sm mb-4">{food.description}</p>
              <div className="grid grid-cols-2 gap-4 text-gray-700 text-sm mb-4">
                <div>
                  <span className="font-semibold">Category:</span>{" "}
                  {food.category}
                </div>
                <div>
                  <span className="font-semibold">Origin:</span> {food.origin}
                </div>
                <div>
                  <span className="font-semibold">Price:</span> ${food.price}
                </div>
                <div>
                  <span className="font-semibold">Quantity:</span>{" "}
                  {food.quantity}
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
