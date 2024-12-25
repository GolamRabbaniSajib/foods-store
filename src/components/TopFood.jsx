import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const TopFood = () => {
  const [foods, setFoods] = useState([]);
  useEffect(() => {
    fetchAllFoods();
  }, []);

  const fetchAllFoods = async () => {
    const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/top-foods`);
    setFoods(data);
  };

  return (
    <div className="container mx-auto p-6">
      <div className="space-y-5 pb-20">
        <h1 className="text-center font-bold text-5xl">Top Foods by Selling</h1>
        <p className="font-bold text-xl text-gray-500 text-center">
          Welcome to The Biggest Network of Food Ordering & Delivery
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {foods.map((food) => (
          <div key={food._id} className="bg-white p-4 rounded-lg shadow-lg">
            <img
              src={food.foodImage}
              alt={food.foodName}
              className="w-full h-48 object-cover rounded-lg mb-4"
            />
            <h3 className="text-xl font-semibold">{food.foodName}</h3>
            <p className="text-gray-600 mt-2">{food.description}</p>
            <p className="text-gray-700 font-bold mt-2">
              Sales: {food.purchaseCount}
            </p>
            <div className="mt-4">
              <Link
                to={`/food/${food._id}`}
                className="inline-block px-6 py-2 mt-4 text-white bg-green-400 rounded-lg shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-300 transition-all duration-300"
              >
                Details
              </Link>
            </div>
          </div>
        ))}
      </div>
      <div className="text-center mt-6">
        <Link
          to="/foods"
          className="inline-block px-8 py-3 mt-4 text-gray-800 bg-transparent border-2 border-green-400 rounded-full text-lg font-semibold uppercase tracking-wide hover:bg-green-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-green-400 transition-all duration-300"
        >
          See All
        </Link>
      </div>
    </div>
  );
};

export default TopFood;
