import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const TopFood = () => {
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAllFoods();
  }, []);

  const fetchAllFoods = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/top-foods`
      );
      setFoods(data);
    } catch (err) {
      console.error("Failed to fetch top foods:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="w-11/12 max-w-7xl mx-auto py-16">
      {/* Heading */}
      <div className="text-center mb-14 space-y-3">
        <h1 className="text-4xl md:text-5xl font-extrabold">
          <span className="text-green-400">Top Foods</span>{" "}
          <span className="text-blue-400">by Selling</span>
        </h1>
        <p className="text-xl font-medium text-gray-600 dark:text-gray-300">
          Welcome to the biggest network of food ordering & delivery
        </p>
      </div>

      {/* Spinner */}
      {loading ? (
        <div className="flex justify-center items-center h-40">
          <div className="w-12 h-12 border-4 border-green-400 border-dashed rounded-full animate-spin"></div>
        </div>
      ) : (
        <>
          {/* Food Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {foods.map((food) => (
              <div
                key={food._id}
                className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 group"
              >
                <img
                  src={food.foodImage}
                  alt={food.foodName}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="p-5">
                  <h3 className="text-xl font-bold text-center text-gray-800 dark:text-gray-100">
                    {food.foodName}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mt-2 line-clamp-2">
                    {food.description.substring(0, 100)}...
                  </p>
                  <div className="mt-4 flex justify-center">
                    <Link
                      to={`/food/${food._id}`}
                      className="px-5 py-2 bg-green-400 text-white rounded-full text-sm font-semibold hover:bg-green-500 transition-colors duration-300"
                    >
                      Details
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* View All Button */}
          <div className="text-center mt-10">
            <Link
              to="/foods"
              className="inline-block px-8 py-3 border-2 border-green-400 text-green-400 rounded-full text-lg font-bold hover:bg-green-400 hover:text-white transition-all duration-300"
            >
              See All
            </Link>
          </div>
        </>
      )}
    </section>
  );
};

export default TopFood;
