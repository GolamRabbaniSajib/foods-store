import { useContext, useEffect, useState, useCallback } from "react";
import { AuthContext } from "../provider/AuthProvider";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { Helmet } from "react-helmet-async";
import moment from "moment";
import toast from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiCalendar,
  FiDollarSign,
  FiTrash2,
  FiAlertTriangle,
  FiShoppingBag,
} from "react-icons/fi";

// Skeleton Card Component
const SkeletonCard = () => (
  <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-5 animate-pulse w-full">
    <div className="w-full h-48 rounded-lg bg-gray-300 dark:bg-gray-700 mb-4"></div>
    <div className="space-y-3">
      <div className="h-6 w-3/4 bg-gray-300 dark:bg-gray-700 rounded"></div>
      <div className="h-4 w-1/2 bg-gray-300 dark:bg-gray-700 rounded"></div>
      <div className="h-4 w-5/6 bg-gray-300 dark:bg-gray-700 rounded"></div>
    </div>
    <div className="mt-5 h-10 w-full bg-gray-300 dark:bg-gray-700 rounded-lg"></div>
  </div>
);

const MyOrders = () => {
  const { user } = useContext(AuthContext);
  const { axiosSecure } = useAxiosSecure();

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [orderToDelete, setOrderToDelete] = useState(null);

  const fetchMyOrders = useCallback(async () => {
    if (!user?.email) return;
    setLoading(true);
    try {
      const { data } = await axiosSecure.get(`/purchase-food/${user.email}`);
      setOrders(data);
    } catch (err) {
      console.error(err);
      toast.error("Could not fetch your orders.");
    } finally {
      setLoading(false);
    }
  }, [user?.email, axiosSecure]);

  useEffect(() => {
    fetchMyOrders();
  }, [fetchMyOrders]);

  const handleDeleteClick = (order) => {
    setOrderToDelete(order);
    setIsModalOpen(true);
  };

  const confirmDelete = async () => {
    if (!orderToDelete) return;

    const originalOrders = [...orders];
    setOrders((prev) => prev.filter((o) => o._id !== orderToDelete._id));
    setIsModalOpen(false);

    try {
      await axiosSecure.delete(`/purchase-food/${orderToDelete._id}`);
      toast.success(`Order for "${orderToDelete.foodName}" cancelled.`);
      setOrderToDelete(null);
    } catch (err) {
      console.error(err);
      toast.error("Failed to cancel order. Reverting...");
      setOrders(originalOrders);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  const Button = ({ onClick, children, className }) => (
    <motion.button
      onClick={onClick}
      className={`${className} font-semibold px-6 py-2 rounded-lg transition-colors`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {children}
    </motion.button>
  );

  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen">
      <Helmet>
        <title>Foodie | My Orders</title>
      </Helmet>

      <div className="w-11/12 max-w-7xl mx-auto py-12 sm:py-16 px-4">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white">
            My Order History
          </h1>
          <p className="mt-2 text-lg text-gray-600 dark:text-gray-400">
            Review and manage all your past orders.
          </p>
        </motion.div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.from({ length: 3 }).map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        ) : orders.length === 0 ? (
          <motion.div
            className="text-center py-20 px-6 bg-white dark:bg-gray-800 rounded-2xl shadow-md"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <FiShoppingBag className="mx-auto text-6xl text-amber-500" />
            <h2 className="mt-6 text-2xl font-semibold text-gray-800 dark:text-white">
              No Orders Yet
            </h2>
            <p className="mt-2 text-gray-500 dark:text-gray-400">
              Looks like you haven't placed an order. Explore our foods!
            </p>
          </motion.div>
        ) : (
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {orders.map((order) => (
              <motion.div
                key={order._id}
                variants={itemVariants}
                layout
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl flex flex-col overflow-hidden"
              >
                <img
                  src={order.foodImage}
                  alt={order.foodName}
                  className="w-full h-48 object-cover"
                />
                <div className="p-5 flex flex-col flex-grow">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                    {order.foodName}
                  </h3>
                  <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400 flex-grow">
                    <p className="flex items-center gap-2">
                      <FiDollarSign className="text-amber-500" />
                      <strong>Price:</strong> ${order.price}
                    </p>
                    <p className="flex items-center gap-2">
                      <FiCalendar className="text-amber-500" />
                      <strong>Ordered on:</strong>{" "}
                      {moment(order.buyingDate).format("ll")}
                    </p>
                  </div>
                  <Button
                    onClick={() => handleDeleteClick(order)}
                    className="mt-5 bg-red-500 text-white hover:bg-red-600"
                  >
                    <FiTrash2 /> Cancel Order
                  </Button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>

      {/* --- Cancel Confirmation Modal --- */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-6 w-full max-w-md text-center"
              initial={{ scale: 0.9, y: -20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              transition={{ type: "spring", stiffness: 260, damping: 20 }}
            >
              <FiAlertTriangle className="mx-auto text-5xl text-red-500" />
              <h2 className="text-2xl font-bold mt-4 text-gray-900 dark:text-white">
                Confirm Cancellation
              </h2>
              <p className="mt-2 text-gray-600 dark:text-gray-400">
                Are you sure you want to cancel your order for "
                {orderToDelete?.foodName}"? This action cannot be undone.
              </p>
              <div className="mt-6 flex justify-center gap-4">
                <Button
                  onClick={() => setIsModalOpen(false)}
                  className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300"
                >
                  No, Keep it
                </Button>
                <Button
                  onClick={confirmDelete}
                  className="bg-red-500 text-white hover:bg-red-600"
                >
                  Yes, Cancel
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MyOrders;
