import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../provider/AuthProvider";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { Helmet } from "react-helmet-async";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";
import { FiEdit, FiTrash2, FiAlertTriangle, FiPlusSquare } from "react-icons/fi";

// Reusable Skeleton Card
const SkeletonCard = () => (
  <div className="flex items-center gap-4 p-4 bg-white dark:bg-gray-800 rounded-xl shadow-md animate-pulse w-full">
    <div className="w-20 h-20 rounded-lg bg-gray-300 dark:bg-gray-700"></div>
    <div className="flex-1 space-y-3">
      <div className="h-5 rounded bg-gray-300 dark:bg-gray-700 w-3/4"></div>
      <div className="h-4 rounded bg-gray-300 dark:bg-gray-700 w-1/2"></div>
    </div>
    <div className="flex gap-2">
      <div className="w-24 h-10 rounded-lg bg-gray-300 dark:bg-gray-700"></div>
      <div className="w-24 h-10 rounded-lg bg-gray-300 dark:bg-gray-700"></div>
    </div>
  </div>
);

const MyFoods = () => {
  const { axiosSecure } = useAxiosSecure();
  const { user } = useContext(AuthContext);
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [foodToDelete, setFoodToDelete] = useState(null);

  const fetchMyFoods = async () => {
    if (!user?.email) return;
    setLoading(true);
    try {
      const { data } = await axiosSecure.get(`/foods/${user.email}`);
      setFoods(data);
    } catch (err) {
      console.error(err);
      toast.error("Could not fetch your foods.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyFoods();
  }, [user?.email]);

  const handleDeleteClick = (food) => {
    setFoodToDelete(food);
    setIsModalOpen(true);
  };

  const confirmDelete = async () => {
    try {
      await axiosSecure.delete(`/food/${foodToDelete._id}`);
      setFoods((prev) => prev.filter((f) => f._id !== foodToDelete._id));
      toast.success(`${foodToDelete.foodName} deleted successfully!`);
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete food.");
    } finally {
      setIsModalOpen(false);
      setFoodToDelete(null);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 },
  };

  const buttonBase = "px-4 py-2 text-sm font-semibold rounded-lg shadow-sm";
  const motionButton = { whileHover: { scale: 1.1 }, whileTap: { scale: 0.95 } };

  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen">
      <Helmet>
        <title>Foodie | My Added Foods</title>
      </Helmet>

      <div className="w-11/12 max-w-5xl mx-auto py-12 sm:py-16 px-4">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white">
            My Food Collection
          </h1>
          <p className="mt-2 text-lg text-gray-600 dark:text-gray-400">
            Manage the delicious dishes you've added.
          </p>
        </motion.div>

        {/* Content */}
        {loading ? (
          <div className="space-y-4">{Array.from({ length: 3 }).map((_, i) => <SkeletonCard key={i} />)}</div>
        ) : foods.length === 0 ? (
          <motion.div
            className="text-center py-20 px-6 bg-white dark:bg-gray-800 rounded-xl shadow-md"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">No Foods Found</h2>
            <p className="mt-2 text-gray-500 dark:text-gray-400">You haven't added any food items yet.</p>
            <Link to="/add-food">
              <motion.button
                className={`${buttonBase} mt-6 inline-flex items-center gap-2 bg-amber-500 text-white hover:bg-amber-600`}
                {...motionButton}
              >
                <FiPlusSquare />
                Add Your First Food
              </motion.button>
            </Link>
          </motion.div>
        ) : (
          <motion.div className="space-y-4" variants={containerVariants} initial="hidden" animate="visible">
            {foods.map((food) => (
              <motion.div
                key={food._id}
                variants={itemVariants}
                layout
                className="flex flex-col sm:flex-row items-center gap-4 p-4 bg-white dark:bg-gray-800 rounded-xl shadow-md"
              >
                <img
                  src={food.foodImage}
                  alt={food.foodName}
                  className="w-full sm:w-24 h-24 object-cover border rounded-lg border-gray-200 dark:border-gray-700"
                />
                <div className="flex-1 text-center sm:text-left">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">{food.foodName}</h3>
                  <p className="text-amber-500 font-semibold">${food.price.toFixed(2)}</p>
                </div>
                <div className="flex gap-3 flex-wrap justify-center sm:justify-end">
                  <Link to={`/update-food/${food._id}`}>
                    <motion.button
                      className={`${buttonBase} bg-blue-500 text-white hover:bg-blue-600`}
                      {...motionButton}
                    >
                      <FiEdit />
                      Update
                    </motion.button>
                  </Link>
                  <motion.button
                    onClick={() => handleDeleteClick(food)}
                    className={`${buttonBase} bg-red-500 text-white hover:bg-red-600`}
                    {...motionButton}
                  >
                    <FiTrash2 />
                    Delete
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>

      {/* Confirmation Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl p-6 w-full max-w-md mx-4 text-center"
              initial={{ scale: 0.9, y: -20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
            >
              <FiAlertTriangle className="mx-auto text-5xl text-red-500" />
              <h2 className="text-2xl font-bold mt-4 text-gray-900 dark:text-white">Confirm Deletion</h2>
              <p className="mt-2 text-gray-600 dark:text-gray-400">
                Are you sure you want to delete "{foodToDelete?.foodName}"? This action cannot be undone.
              </p>
              <div className="mt-6 flex justify-center gap-4">
                <motion.button
                  onClick={() => setIsModalOpen(false)}
                  className="px-6 py-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 font-semibold hover:bg-gray-300"
                  {...motionButton}
                >
                  Cancel
                </motion.button>
                <motion.button
                  onClick={confirmDelete}
                  className="px-6 py-2 rounded-lg bg-red-500 text-white font-semibold hover:bg-red-600"
                  {...motionButton}
                >
                  Delete
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MyFoods;
