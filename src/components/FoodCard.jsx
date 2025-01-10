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
      <div className="max-w-4xl mx-auto border rounded-lg shadow-lg ">
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
          <div className="flex justify-between items-center">
            <h3 className="text-2xl font-semibold ">{food.foodName}</h3>
            <p className="text-lg font-bold grid grid-cols-2 gap-4">
              Price: <span className="text-blue-600">${food.price}</span>
            </p>
          </div>
          <p className=" mt-3">{food.description}</p>
          <div className="flex flex-col gap-4 mt-4">
            <p className="text-sm grid grid-cols-2">
              <span className="font-medium">Category:</span> {food.category}
            </p>
            <p className="text-sm grid grid-cols-2">
              <span className="font-medium">Origin:</span> {food.foodOrigin}
            </p>
          </div>
          <div className="lg:flex justify-between items-center mt-6">
            <div className=" space-y-4">
              <p className="text-sm grid grid-cols-2 lg:gap-44">
                <span>Available:</span>{" "}
                <span
                  className={
                    food.quantity === 0
                      ? "text-red-500 font-semibold text-xl"
                      : "text-green-500 font-semibold text-xl"
                  }
                >
                  {food.quantity}
                </span>
              </p>
              <p className="text-sm grid grid-cols-2 lg:gap-44">
                <span>Purchase Count:</span>{" "}
                <span className="text-yellow-400 text-xl">
                  {food.purchaseCount}
                </span>
              </p>
            </div>
            <div className="flex justify-center">
              <button
                className={
                  food.quantity === 0
                    ? "inline-block px-6 py-2 mt-4 text-white bg-red-400 rounded-lg shadow-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-green-300 transition-all duration-300"
                    : "inline-block px-6 py-2 mt-4 text-white bg-green-400 rounded-lg shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-300 transition-all duration-300"
                }
                onClick={handlePurchase}
                disabled={food.quantity === 0}
              >
                {food.quantity > 0 ? "Purchase Now" : "Out of Stock"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FoodCard;
