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
        <div className="w-full mx-auto md:w-2/3 flex flex-col p-6">
          <h3 className="text-2xl font-semibold text-gray-800">
            {food.foodName}
          </h3>
          <p className="text-gray-600 mt-3">{food.description}</p>
          <div className="flex flex-wrap gap-4 mt-4">
            <p className="text-sm text-gray-500">
              <span className="font-medium">Category:</span> {food.category}
            </p>
            <p className="text-sm text-gray-500">
              <span className="font-medium">Origin:</span> {food.foodOrigin}
            </p>
          </div>
          <div className="flex justify-between items-center mt-6">
            <div className="mr-3 space-y-4">
              <p className="text-lg font-bold text-gray-800">
                Price: <span className="text-blue-600">${food.price}</span>
              </p>
              <p className="text-sm text-gray-500">
                Available Quantity: {food.quantity}
              </p>
              <p className="text-sm text-gray-500">
                Purchase Count: {food.purchaseCount}
              </p>
            </div>
            <button
              className="bg-blue-500 text-white py-2 px-6 rounded-lg hover:bg-blue-600 transition duration-200"
              onClick={handlePurchase}
              disabled={food.quantity === 0}
            >
              {food.quantity > 0 ? "Purchase Now" : "Out of Stock"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FoodCard;
