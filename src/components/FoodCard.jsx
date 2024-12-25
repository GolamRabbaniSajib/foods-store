import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate, useParams } from "react-router-dom";

const FoodCard = () => {
  const { id } = useParams();
  const [food, setFood] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    fetchFoodData();
  }, [id]);

  const fetchFoodData = async () => {
    const { data } = await axios.get(
      `${import.meta.env.VITE_API_URL}/food/${id}`
    );
    setFood(data);
  };
  const handlePurchase = () => {
    if (food.quantity <= 0) {
      toast.error("Food Not available");
    } else {
      navigate(`/foodPurchase/${food._id}`);
    }
  };
  return (
    <div className="container mx-auto p-6">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg ">
        {/* Food Image */}
        <div className="relative group">
          <img
            src={food.foodImage}
            alt={food.foodName}
            className="w-full h-80 object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            <p className="text-white text-lg font-semibold">Delicious </p>
          </div>
        </div>

        {/* Food Details */}
        <div className="p-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            {food.foodName}
          </h1>
          <p className="text-gray-600 text-lg mb-6">{food.description}</p>
          <div className="flex justify-between items-center mb-6">
            <p className="text-gray-700 font-semibold">
              Price:{" "}
              <span className="text-xl font-bold text-blue-500">
                ${food.price}
              </span>
            </p>
            <p className="text-gray-700 font-semibold">
              Available Quantity:{" "}
              <span className="text-xl font-bold">{food.quantity}</span>
            </p>
          </div>
          <p className="text-gray-700 font-semibold mb-6">
            Purchase Count:{" "}
            <span className="font-bold">{food.purchaseCount}</span>
          </p>
          <button
            onClick={handlePurchase}
            className="w-full py-3 bg-gradient-to-r from-blue-500 to-green-500 hover:from-green-500 hover:to-blue-500 text-white font-bold rounded-lg shadow-lg transition-transform transform hover:scale-105 duration-300"
          >
            Purchase Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default FoodCard;
