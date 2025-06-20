import axios from "axios";
import { useContext, useEffect, useState, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../provider/AuthProvider";
import toast from "react-hot-toast";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { FiShoppingCart, FiLoader } from "react-icons/fi";

const FoodPurchase = () => {
  const { user } = useContext(AuthContext);
  const { id } = useParams();
  const navigate = useNavigate();

  const [food, setFood] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fetchFoodData = useCallback(async () => {
    try {
      const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/food/${id}`);
      setFood(data);
    } catch (err) {
      toast.error("Failed to load food data.");
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchFoodData();
  }, [fetchFoodData]);

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

  const containerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut", staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen px-4 py-10 sm:py-16">
      <Helmet>
        <title>Purchase | {loading ? '...' : food?.foodName}</title>
      </Helmet>
      <div className="max-w-5xl mx-auto">
        {loading ? (
          <div className="flex justify-center items-center h-80">
            <FiLoader className="animate-spin text-5xl text-amber-500" />
          </div>
        ) : !food ? (
          <div className="text-center py-20 text-red-500">
            <h2 className="text-2xl font-bold">Food item not found.</h2>
          </div>
        ) : (
          <motion.div
            className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-start"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            {/* Food Summary */}
            <motion.div className="lg:col-span-2" variants={itemVariants}>
              <img src={food.foodImage} alt={food.foodName} className="w-full h-64 object-cover rounded-2xl shadow-xl mb-4" />
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{food.foodName}</h2>
              <p className="text-amber-500 text-xl font-semibold mt-1">${food.price}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Added by: {food.buyer?.userName}</p>
              <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">{food.quantity > 0 ? `${food.quantity} available` : 'Out of Stock'}</p>
            </motion.div>

            {/* Purchase Form */}
            <motion.form
              onSubmit={handleSubmit}
              className="lg:col-span-3 bg-white dark:bg-gray-800 shadow-2xl rounded-2xl p-6 sm:p-10 space-y-6"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white">Confirm Your Order</h1>

              <motion.div variants={itemVariants}>
                <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Quantity</label>
                <input id="quantity" name="quantity" type="number" defaultValue="1" min="1" max={food.quantity} required className="w-full bg-gray-100 dark:bg-gray-700 border-transparent rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-amber-500 text-black dark:text-white" />
              </motion.div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-gray-200 dark:border-gray-700">
                <motion.div variants={itemVariants}>
                  <label className="block text-sm font-medium text-gray-500 dark:text-gray-400">Your Name</label>
                  <p className="mt-1 p-2.5 bg-gray-100 dark:bg-gray-700 rounded-lg text-gray-900 dark:text-white truncate">{user?.displayName}</p>
                </motion.div>
                <motion.div variants={itemVariants}>
                  <label className="block text-sm font-medium text-gray-500 dark:text-gray-400">Your Email</label>
                  <p className="mt-1 p-2.5 bg-gray-100 dark:bg-gray-700 rounded-lg text-gray-900 dark:text-white truncate">{user?.email}</p>
                </motion.div>
              </div>

              <motion.div variants={itemVariants}>
                <button
                  type="submit"
                  disabled={isSubmitting || food.quantity <= 0 || food.buyer?.email === user?.email}
                  className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-amber-500 text-white font-bold rounded-lg shadow-md hover:bg-amber-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 transition-all duration-300 disabled:bg-amber-300 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <FiLoader className="animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <FiShoppingCart />
                      Confirm Purchase
                    </>
                  )}
                </button>
              </motion.div>
            </motion.form>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default FoodPurchase;