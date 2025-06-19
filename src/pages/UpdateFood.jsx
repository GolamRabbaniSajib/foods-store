import { useContext, useEffect, useState, useCallback } from "react";
import { AuthContext } from "../provider/AuthProvider";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { FiEdit, FiLoader } from "react-icons/fi";

// --- Skeleton UI ---
const FormSkeleton = () => (
  <div className="w-full max-w-4xl space-y-6 animate-pulse">
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i}>
          <div className="h-5 w-1/3 mb-2 bg-gray-300 dark:bg-gray-700 rounded" />
          <div className="h-11 w-full bg-gray-300 dark:bg-gray-700 rounded-lg" />
        </div>
      ))}
      <div className="sm:col-span-2">
        <div className="h-5 w-1/4 mb-2 bg-gray-300 dark:bg-gray-700 rounded" />
        <div className="h-24 w-full bg-gray-300 dark:bg-gray-700 rounded-lg" />
      </div>
    </div>
    <div className="h-12 w-full mt-8 bg-gray-300 dark:bg-gray-700 rounded-lg" />
  </div>
);

// --- Input Field ---
const Input = ({ label, name, type = "text", value, onChange }) => (
  <div>
    <label htmlFor={name} className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
      {label}
    </label>
    <input
      id={name}
      name={name}
      type={type}
      required
      value={value}
      onChange={onChange}
      className="w-full bg-gray-100 dark:bg-gray-700 border-transparent rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-amber-500"
      aria-label={label}
    />
  </div>
);

const UpdateFood = () => {
  const { user } = useContext(AuthContext);
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    foodName: "",
    foodImage: "",
    category: "",
    price: "",
    quantity: "",
    foodOrigin: "",
    description: "",
  });
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fetchFoodData = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/food/${id}`);
      setFormData({
        foodName: data.foodName || "",
        foodImage: data.foodImage || "",
        category: data.category || "",
        price: data.price || "",
        quantity: data.quantity || "",
        foodOrigin: data.foodOrigin || "",
        description: data.description || "",
      });
    } catch (err) {
      console.error(err);
      toast.error("Failed to load food item.");
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchFoodData();
  }, [fetchFoodData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const updatedData = {
      ...formData,
      price: parseFloat(formData.price),
      quantity: parseFloat(formData.quantity),
      buyer: {
        email: user?.email,
        userName: user?.displayName,
        photo: user?.photoURL,
      },
    };

    try {
      await axios.put(`${import.meta.env.VITE_API_URL}/update-food/${id}`, updatedData);
      toast.success("Food Updated Successfully!");
      navigate("/my-foods");
    } catch (err) {
      console.error(err);
      toast.error("Failed to update food.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // --- Framer Motion Variants ---
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

  if (loading) {
    return (
      <div className="bg-gray-50 dark:bg-gray-900 min-h-screen flex items-center justify-center px-4 py-10">
        <FormSkeleton />
      </div>
    );
  }

  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen px-4 py-10 sm:py-16">
      <Helmet>
        <title>Foodie | Update {formData.foodName}</title>
      </Helmet>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-12 items-start">
        {/* Info Column */}
        <motion.div
          className="lg:col-span-2 text-center lg:text-left"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <FiEdit className="text-6xl text-amber-500 mx-auto lg:mx-0" />
          <h1 className="mt-4 text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white">
            Refine Your Dish
          </h1>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
            Update the details for "{formData.foodName}".
          </p>
          <img
            src={formData.foodImage}
            alt="Food preview"
            className="mt-6 w-full max-w-sm mx-auto lg:mx-0 rounded-2xl shadow-lg object-cover"
          />
        </motion.div>

        {/* Form Column */}
        <motion.div
          className="lg:col-span-3 bg-white dark:bg-gray-800 shadow-xl rounded-2xl p-6 sm:p-10"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {[
                { label: "Food Name", name: "foodName" },
                { label: "Food Image (URL)", name: "foodImage" },
                { label: "Category", name: "category" },
                { label: "Quantity", name: "quantity", type: "number" },
                { label: "Price ($)", name: "price", type: "number" },
                { label: "Food Origin", name: "foodOrigin" },
              ].map(({ label, name, type }) => (
                <motion.div variants={itemVariants} key={name}>
                  <Input label={label} name={name} type={type} value={formData[name]} onChange={handleChange} />
                </motion.div>
              ))}
            </div>

            <motion.div variants={itemVariants}>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Short Description
              </label>
              <textarea
                id="description"
                name="description"
                rows="4"
                required
                value={formData.description}
                onChange={handleChange}
                className="w-full bg-gray-100 dark:bg-gray-700 border-transparent rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </motion.div>

            <motion.div variants={itemVariants}>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-amber-500 text-white font-bold rounded-lg shadow-md hover:bg-amber-600 transition duration-300 disabled:bg-amber-300"
              >
                {isSubmitting ? (
                  <>
                    <FiLoader className="animate-spin" />
                    Updating...
                  </>
                ) : (
                  "Save Changes"
                )}
              </button>
            </motion.div>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default UpdateFood;
