import axios from "axios";
import { useEffect, useState, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import {
  FiDollarSign,
  FiMapPin,
  FiLayers,
  FiShoppingCart,
  FiInfo,
} from "react-icons/fi";

// --- Skeleton Loader ---
const DetailsSkeleton = () => (
  <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start animate-pulse">
    <div className="w-full h-80 sm:h-96 bg-gray-300 dark:bg-gray-700 rounded-2xl" />
    <div className="space-y-6">
      <div className="h-10 w-3/4 bg-gray-300 dark:bg-gray-700 rounded" />
      <div className="h-6 w-1/4 bg-gray-300 dark:bg-gray-700 rounded" />
      <div className="space-y-2">
        <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded" />
        <div className="h-4 w-5/6 bg-gray-300 dark:bg-gray-700 rounded" />
      </div>
      <div className="h-20 bg-gray-300 dark:bg-gray-700 rounded-lg" />
      <div className="h-14 w-1/2 mx-auto sm:mx-0 bg-gray-300 dark:bg-gray-700 rounded-xl" />
    </div>
  </div>
);

// --- Detail Item (Reusable Box) ---
const InfoItem = ({ icon: Icon, label, value }) => (
  <div className="flex items-center gap-3">
    <Icon className="text-xl text-amber-500" />
    <div>
      <p className="text-sm font-semibold text-gray-600 dark:text-gray-400">{label}</p>
      <p className="font-bold text-gray-800 dark:text-white">{value}</p>
    </div>
  </div>
);

const FoodDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [food, setFood] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchFoodData = useCallback(async () => {
    try {
      const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/food/${id}`);
      setFood(data);
    } catch {
      toast.error("Failed to fetch food data");
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchFoodData();
  }, [fetchFoodData]);

  const handlePurchase = () => {
    if (!food) return;
    food.quantity <= 0
      ? toast.error("This item is currently out of stock.")
      : navigate(`/foodPurchase/${food._id}`);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen">
      <Helmet>
        <title>{loading ? "Loading..." : `${food?.foodName} | Foodie`}</title>
      </Helmet>

      <div className="w-11/12 max-w-6xl mx-auto py-12 sm:py-16 px-4">
        {loading ? (
          <DetailsSkeleton />
        ) : !food ? (
          <div className="text-center py-20 text-red-500">
            <h2 className="text-2xl font-bold flex items-center justify-center gap-2">
              <FiInfo /> Food item not found.
            </h2>
          </div>
        ) : (
          <motion.div
            className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Image */}
            <motion.div variants={itemVariants} className="w-full">
              <img
                src={food.foodImage}
                alt={food.foodName}
                className="w-full h-auto max-h-[500px] object-cover rounded-2xl shadow-2xl"
              />
            </motion.div>

            {/* Content */}
            <div className="flex flex-col space-y-6">
              {/* Title & Uploader */}
              <motion.div variants={itemVariants}>
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-900 dark:text-white leading-tight">
                  {food.foodName}
                </h1>
                <p className="mt-2 text-lg text-gray-500 dark:text-gray-400">
                  Added by: {food.buyer?.userName || "Unknown"}
                </p>
              </motion.div>

              {/* Description */}
              <motion.p
                variants={itemVariants}
                className="text-gray-700 dark:text-gray-300 text-base leading-relaxed"
              >
                {food.description}
              </motion.p>

              {/* Category & Origin */}
              <motion.div
                variants={itemVariants}
                className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg grid grid-cols-2 gap-4"
              >
                <InfoItem icon={FiLayers} label="Category" value={food.category} />
                <InfoItem icon={FiMapPin} label="Origin" value={food.foodOrigin} />
              </motion.div>

              {/* Price + Button */}
              <motion.div
                variants={itemVariants}
                className="pt-6 border-t border-gray-200 dark:border-gray-700 flex flex-col sm:flex-row justify-between items-center gap-6"
              >
                <div className="text-3xl font-bold text-amber-500 flex items-center gap-2">
                  <FiDollarSign />
                  {food.price}
                </div>
                <motion.button
                  onClick={handlePurchase}
                  disabled={food.quantity <= 0}
                  className={`w-full sm:w-auto flex items-center justify-center gap-3 px-8 py-4 rounded-xl font-bold text-white shadow-lg transition-all duration-300 disabled:cursor-not-allowed ${
                    food.quantity > 0
                      ? "bg-amber-500 hover:bg-amber-600"
                      : "bg-red-400"
                  }`}
                  whileHover={food.quantity > 0 ? { scale: 1.05 } : {}}
                  whileTap={food.quantity > 0 ? { scale: 0.95 } : {}}
                >
                  <FiShoppingCart />
                  {food.quantity > 0 ? "Purchase Now" : "Out of Stock"}
                </motion.button>
              </motion.div>

              {/* Stock Status */}
              <motion.div variants={itemVariants} className="text-sm text-center sm:text-left">
                <p className={`font-semibold ${food.quantity > 0 ? "text-green-600" : "text-red-500"}`}>
                  {food.quantity > 0 ? `${food.quantity} items available` : "Not available"}
                </p>
              </motion.div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default FoodDetails;
