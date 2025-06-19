import { useContext, useState } from "react";
import { AuthContext } from "../provider/AuthProvider";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { FiPlusCircle, FiLoader } from "react-icons/fi";

// Motion Variants
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

const AddFood = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const form = e.target;
    const formData = {
      foodName: form.foodName.value,
      foodImage: form.foodImage.value,
      category: form.category.value,
      price: parseFloat(form.price.value),
      description: form.description.value,
      quantity: parseFloat(form.quantity.value),
      foodOrigin: form.foodOrigin.value,
      purchaseCount: 0,
      buyer: {
        email: user?.email,
        userName: user?.displayName,
        photo: user?.photoURL,
      },
    };

    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/add-food`, formData);
      toast.success("Food Added Successfully!");
      form.reset();
      navigate("/my-foods");
    } catch (err) {
      toast.error(err.message || "Failed to add food.");
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen px-4 py-10 sm:py-16">
      <Helmet>
        <title>Foodie | Add New Food</title>
      </Helmet>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-12 items-center">
        {/* Left Side */}
        <motion.div
          className="lg:col-span-2 text-center lg:text-left"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <FiPlusCircle className="text-6xl text-amber-500 mx-auto lg:mx-0" />
          <h1 className="mt-4 text-3xl sm:text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white">
            Share Your Culinary Creation
          </h1>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
            Add your delicious dish to the menu. Let foodies discover your taste!
          </p>
        </motion.div>

        {/* Right Side (Form) */}
        <motion.div
          className="lg:col-span-3 bg-white dark:bg-gray-800 shadow-xl rounded-2xl p-6 sm:p-10"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Grid Inputs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {[
                { id: "foodName", label: "Food Name", placeholder: "e.g., Classic Margherita Pizza", type: "text" },
                { id: "foodImage", label: "Food Image (URL)", placeholder: "https://example.com/image.jpg", type: "text" },
                { id: "category", label: "Category", placeholder: "e.g., Italian", type: "text" },
                { id: "quantity", label: "Quantity", placeholder: "e.g., 10", type: "number" },
                { id: "price", label: "Price ($)", placeholder: "e.g., 12.99", type: "number", step: "0.01" },
                { id: "foodOrigin", label: "Food Origin", placeholder: "e.g., Italy", type: "text" },
              ].map(({ id, label, ...rest }) => (
                <motion.div key={id} variants={itemVariants}>
                  <label htmlFor={id} className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    {label}
                  </label>
                  <input
                    id={id}
                    name={id}
                    required
                    className="w-full bg-gray-100 dark:bg-gray-700 border-transparent rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-amber-500"
                    {...rest}
                  />
                </motion.div>
              ))}
            </div>

            {/* Description */}
            <motion.div variants={itemVariants}>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Short Description
              </label>
              <textarea
                id="description"
                name="description"
                rows="4"
                required
                placeholder="Describe the dish..."
                className="w-full bg-gray-100 dark:bg-gray-700 border-transparent rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-amber-500"
              ></textarea>
            </motion.div>

            {/* User Info */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-gray-200 dark:border-gray-700">
              <motion.div variants={itemVariants}>
                <label className="block text-sm font-medium text-gray-500 dark:text-gray-400">Your Name</label>
                <p className="mt-1 p-2.5 bg-gray-100 dark:bg-gray-700 rounded-lg text-gray-900 dark:text-white">
                  {user?.displayName}
                </p>
              </motion.div>
              <motion.div variants={itemVariants}>
                <label className="block text-sm font-medium text-gray-500 dark:text-gray-400">Your Email</label>
                <p className="mt-1 p-2.5 bg-gray-100 dark:bg-gray-700 rounded-lg text-gray-900 dark:text-white">
                  {user?.email}
                </p>
              </motion.div>
            </div>

            {/* Submit Button */}
            <motion.div variants={itemVariants}>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-amber-500 text-white font-bold rounded-lg shadow-md hover:bg-amber-600 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 disabled:bg-amber-300"
              >
                {isSubmitting ? (
                  <>
                    <FiLoader className="animate-spin" />
                    Submitting...
                  </>
                ) : (
                  "Add Food Item"
                )}
              </button>
            </motion.div>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default AddFood;
