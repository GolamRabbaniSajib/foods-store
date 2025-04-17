import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { FaDollarSign, FaMapMarkerAlt, FaLayerGroup, FaShoppingCart } from "react-icons/fa";

const FoodCard = () => {
  const { id } = useParams();
  const [food, setFood] = useState({});
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchFoodData();
  }, [id]);

  const fetchFoodData = async () => {
    try {
      const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/food/${id}`);
      setFood(data);
    } catch (error) {
      toast.error("Failed to fetch food data");
    } finally {
      setLoading(false);
    }
  };

  const handlePurchase = () => {
    if (food.quantity <= 0) {
      toast.error("Food Not Available");
    } else {
      navigate(`/foodPurchase/${food._id}`);
    }
  };

  return (
    <div className="w-11/12 max-w-6xl mx-auto py-10 px-4">
      <Helmet>
        <title>Food | Details</title>
      </Helmet>

      {loading ? (
        <div className="flex justify-center items-center h-80">
          <div className="w-14 h-14 border-4 border-dashed border-green-500 rounded-full animate-spin"></div>
        </div>
      ) : (
        <div className="rounded-xl shadow-xl bg-white dark:bg-gray-900 overflow-hidden animate-fade-up">
          {/* Image */}
          <div className="relative group">
            <img
              src={food.foodImage}
              alt={food.foodName}
              className="w-full h-72 sm:h-96 object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              <p className="text-white text-2xl font-semibold tracking-wide">Delicious Choice</p>
            </div>
          </div>

          {/* Content */}
          <div className="p-6 space-y-6">
            <div className="flex flex-col md:flex-row justify-between items-start gap-4">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white">
                {food.foodName}
              </h2>
              <p className="flex items-center text-xl font-semibold text-blue-600 gap-1">
                <FaDollarSign /> {food.price}
              </p>
            </div>

            <p className="text-gray-600 dark:text-gray-300 text-base leading-relaxed">
              {food.description}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-700 dark:text-gray-300">
              <p className="flex items-center gap-2">
                <FaLayerGroup className="text-green-500" />
                <span className="font-medium">Category:</span> {food.category}
              </p>
              <p className="flex items-center gap-2">
                <FaMapMarkerAlt className="text-pink-500" />
                <span className="font-medium">Origin:</span> {food.foodOrigin}
              </p>
              <p className="flex items-center gap-2">
                <FaShoppingCart className="text-yellow-400" />
                <span className="font-medium">Available:</span>{" "}
                <span
                  className={
                    food.quantity === 0
                      ? "text-red-500 font-semibold"
                      : "text-green-500 font-semibold"
                  }
                >
                  {food.quantity}
                </span>
              </p>
              <p className="flex items-center gap-2">
                <FaShoppingCart className="text-yellow-400" />
                <span className="font-medium">Purchase Count:</span>{" "}
                <span className="text-yellow-500 font-semibold">{food.purchaseCount}</span>
              </p>
            </div>

            <div className="flex justify-center mt-8">
              <button
                onClick={handlePurchase}
                disabled={food.quantity === 0}
                className={`flex items-center gap-2 px-8 py-3 rounded-xl font-semibold text-white shadow-lg transition-all duration-300 ${
                  food.quantity === 0
                    ? "bg-red-400 cursor-not-allowed"
                    : "bg-green-500 hover:bg-green-600"
                }`}
              >
                <FaShoppingCart />
                {food.quantity > 0 ? "Purchase Now" : "Out of Stock"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FoodCard;
