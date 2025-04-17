import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../provider/AuthProvider";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { Helmet } from "react-helmet-async";

const MyFoods = () => {
  const { axiosSecure } = useAxiosSecure();
  const { user } = useContext(AuthContext);
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true); // Spinner state

  useEffect(() => {
    fetchAllFoods();
  }, [user]);

  const fetchAllFoods = async () => {
    try {
      const { data } = await axiosSecure.get(`/foods/${user?.email}`);
      setFoods(data);
    } catch (err) {
      console.error("Failed to fetch foods:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-11/12 mx-auto py-12 px-4 md:px-6">
      <Helmet>
        <title>Food | My Foods</title>
      </Helmet>

      <h1 className="text-3xl md:text-4xl font-bold text-center text-green-500 mb-10 animate-fade-in">
        My Added Foods
      </h1>

      {/* Loading Spinner */}
      {loading ? (
        <div className="flex justify-center items-center min-h-[200px]">
          <div className="w-12 h-12 border-4 border-dashed border-green-400 rounded-full animate-spin"></div>
        </div>
      ) : foods.length === 0 ? (
        <div className="flex justify-center items-center h-64 text-gray-600 dark:text-gray-300 text-lg font-medium">
          <p>No food items found.</p>
        </div>
      ) : (
        <div className="overflow-x-auto animate-slide-up">
          <table className="min-w-full border rounded-lg shadow-lg overflow-hidden bg-white dark:bg-gray-800">
            <thead className="bg-green-100 dark:bg-gray-700 text-gray-800 dark:text-gray-100 text-sm uppercase tracking-wide">
              <tr>
                <th className="px-6 py-4 text-left">Image</th>
                <th className="px-6 py-4 text-left">Name</th>
                <th className="px-6 py-4 text-left">Price</th>
                <th className="px-6 py-4 text-left">Actions</th>
              </tr>
            </thead>
            <tbody className="text-gray-700 dark:text-gray-200">
              {foods.map((food, index) => (
                <tr
                  key={food._id}
                  className={`transition duration-300 ${
                    index % 2 === 0
                      ? "bg-white dark:bg-gray-800"
                      : "bg-gray-50 dark:bg-gray-900"
                  } hover:bg-green-50 dark:hover:bg-green-900`}
                >
                  <td className="px-6 py-4">
                    <img
                      src={food.foodImage}
                      alt={food.foodName}
                      className="w-16 h-16 rounded object-cover border border-gray-200 dark:border-gray-700"
                    />
                  </td>
                  <td className="px-6 py-4 font-medium">{food.foodName}</td>
                  <td className="px-6 py-4">${food.price}</td>
                  <td className="px-6 py-4">
                    <Link to={`/updateFood/${food._id}`}>
                      <button className="bg-green-400 hover:bg-green-500 text-white text-sm px-5 py-2 rounded-lg shadow-md transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-green-300">
                        Update
                      </button>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default MyFoods;
