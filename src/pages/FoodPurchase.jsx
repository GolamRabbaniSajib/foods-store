import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../provider/AuthProvider";
import toast from "react-hot-toast";
import { Helmet } from "react-helmet-async";
import {
  FaUtensils,
  FaDollarSign,
  FaSortNumericUp,
  FaUser,
  FaEnvelope,
  FaSpinner,
} from "react-icons/fa";

const FoodPurchase = () => {
  const { user } = useContext(AuthContext);
  const { id } = useParams();
  const navigate = useNavigate();

  const [food, setFood] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFoodData();
  }, [id]);

  const fetchFoodData = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/food/${id}`
      );
      setFood(data);
    } catch (err) {
      toast.error("Failed to load food data.");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const inputQuantity = parseFloat(form.quantity.value);

    if (inputQuantity > food.quantity) {
      toast.error("Quantity exceeds available stock");
      return;
    } else if (inputQuantity <= 0) {
      toast.error("Quantity must be greater than 0");
      return;
    } else if (inputQuantity > 20) {
      toast.error("You can buy a maximum of 20 units");
      return;
    }

    const updatedQuantity = food.quantity - inputQuantity;

    const newFoodData = {
      foodId: food._id,
      foodName: food.foodName,
      foodImage: food.foodImage,
      category: food.categoryName,
      price: parseFloat(food.price),
      description: food.description,
      foodOrigin: food.foodOrigin,
      purchaseCount: parseFloat(food.purchaseCount),
      postedUserEmail: food.buyer?.email,
      postedUserName: food.buyer?.userName,
      buyingDate: new Date().toString(),
      seller: {
        email: user?.email,
        userName: user?.displayName,
        photo: user?.photoURL,
      },
    };

    try {
      await axios.put(`${import.meta.env.VITE_API_URL}/update-food/${id}`, {
        quantity: updatedQuantity,
      });
      await axios.post(
        `${import.meta.env.VITE_API_URL}/add-purchase-food`,
        newFoodData
      );
      form.reset();
      toast.success("Food purchased successfully!");
      navigate("/my-orders");
    } catch (err) {
      toast.error("Failed to complete purchase");
      console.error(err);
    }
  };

  return (
    <div className="w-11/12 max-w-xl mx-auto p-6 min-h-screen">
      <Helmet>
        <title>Food | Purchase</title>
      </Helmet>

      {loading ? (
        <div className="flex justify-center items-center h-80">
          <FaSpinner className="animate-spin text-5xl text-green-500" />
        </div>
      ) : (
        <div className="border rounded-2xl shadow-2xl bg-white dark:bg-gray-900 p-8 space-y-6 animate-fade-up">
          <h1 className="text-3xl font-extrabold text-center text-gray-800 dark:text-white">
            Purchase Food
          </h1>
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Food Name */}
            <div>
              <label className=" font-semibold mb-1 flex items-center gap-2">
                <FaUtensils /> Food Name
              </label>
              <input
                type="text"
                value={food.foodName}
                readOnly
                className="w-full p-3 rounded-lg border text-black border-gray-300 focus:outline-none"
              />
            </div>

            {/* Price */}
            <div>
              <label className=" font-semibold mb-1 flex items-center gap-2">
                <FaDollarSign /> Price
              </label>
              <input
                type="text"
                value={food.price}
                readOnly
                className="w-full p-3 rounded-lg border text-black border-gray-300 focus:outline-none"
              />
            </div>

            {/* Quantity */}
            <div>
              <label className=" font-semibold mb-1 flex items-center gap-2">
                <FaSortNumericUp /> Quantity (max 20)
              </label>
              <input
                type="number"
                name="quantity"
                placeholder="Enter quantity"
                className="w-full p-3 rounded-lg border border-gray-300 text-black focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Buyer Name */}
            <div>
              <label className=" font-semibold mb-1 flex items-center gap-2">
                <FaUser /> Buyer Name
              </label>
              <input
                type="text"
                value={user?.displayName}
                readOnly
                className="w-full p-3 rounded-lg border text-black border-gray-300 focus:outline-none"
              />
            </div>

            {/* Buyer Email */}
            <div>
              <label className=" font-semibold mb-1 flex items-center gap-2">
                <FaEnvelope /> Buyer Email
              </label>
              <input
                type="email"
                value={user?.email}
                readOnly
                className="w-full p-3 rounded-lg border text-black border-gray-300 focus:outline-none"
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full py-3 font-bold text-white bg-gradient-to-r from-green-500 to-blue-500 hover:from-blue-500 hover:to-green-500 rounded-xl shadow-lg transform transition-transform duration-300 hover:scale-105"
            >
              Confirm Purchase
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default FoodPurchase;
