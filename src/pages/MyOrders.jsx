import axios from "axios";
import moment from "moment";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../provider/AuthProvider";
import toast from "react-hot-toast";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { Helmet } from "react-helmet-async";

// React Icons
import { ImSpinner9 } from "react-icons/im";
import { FaTrashAlt, FaUser, FaDollarSign, FaClock } from "react-icons/fa";

const MyOrders = () => {
  const { axiosSecure } = useAxiosSecure();
  const { user } = useContext(AuthContext);
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAllFoods();
  }, [user]);

  const fetchAllFoods = async () => {
    try {
      setLoading(true);
      const { data } = await axiosSecure.get(`/purchase-food/${user?.email}`);
      setFoods(data);
    } catch (err) {
      toast.error("Failed to fetch orders");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      const { data } = await axios.delete(
        `${import.meta.env.VITE_API_URL}/purchase-food/${id}`
      );
      toast.success("Order deleted successfully");
      fetchAllFoods();
    } catch (err) {
      toast.error(err.message);
    }
  };

  const modalDelete = (id) => {
    toast((t) => (
      <div className="flex flex-col gap-3">
        <p className="text-sm font-medium text-gray-700">
          Are you <b>sure</b> you want to delete this order?
        </p>
        <div className="flex gap-3">
          <button
            className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
            onClick={() => {
              toast.dismiss(t.id);
              handleDelete(id);
            }}
          >
            Yes
          </button>
          <button
            className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
            onClick={() => toast.dismiss(t.id)}
          >
            Cancel
          </button>
        </div>
      </div>
    ));
  };

  return (
    <div>
      <Helmet>
        <title>Food | My Orders</title>
      </Helmet>
      <div className="w-11/12 mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800 font-libre animate-fade-in-up">
          Your Ordered Foods
        </h1>

        {loading ? (
          <div className="flex justify-center items-center h-[60vh]">
            <ImSpinner9 className="animate-spin text-blue-500 text-5xl" />
          </div>
        ) : foods.length === 0 ? (
          <div className="flex justify-center items-center h-[60vh]">
            <p className="text-red-500 text-2xl font-semibold animate-fade-in-up">
              You haven't ordered any food yet.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in-up">
            {foods.map((food) => (
              <div
                key={food._id}
                className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-4 flex flex-col justify-between"
              >
                <img
                  src={food.foodImage}
                  alt={food.foodName}
                  className="w-full h-48 object-cover rounded-md mb-4"
                />
                <div className="space-y-3">
                  <h3 className="text-xl font-semibold text-gray-800">
                    {food.foodName}
                  </h3>
                  <p className="text-gray-600 flex items-center gap-2">
                    <FaDollarSign /> ${food.price}
                  </p>
                  <p className="text-gray-600 flex items-center gap-2 text-sm">
                    <FaUser /> {food.postedUserEmail}
                  </p>
                  <p className="text-gray-500 text-sm flex items-center gap-2">
                    <FaClock /> {moment(food.buyingDate).format("llll")}
                  </p>
                </div>
                <button
                  onClick={() => modalDelete(food._id)}
                  className="mt-4 bg-red-500 text-white font-medium py-2 rounded-md hover:bg-red-600 transition duration-300 flex items-center justify-center gap-2"
                >
                  <FaTrashAlt /> Delete Order
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyOrders;
