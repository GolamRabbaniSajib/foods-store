import { useContext } from "react";
import { AuthContext } from "../provider/AuthProvider";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";

const AddFood = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    // get data from input
    const form = e.target;
    const foodName = form.foodName.value;
    const foodImage = form.photo.value;
    const category = form.categoryName.value;
    const price = parseFloat(form.price.value);
    const description = form.description.value;
    const quantity = parseFloat(form.quantity.value);
    const foodOrigin = form.foodOrigin.value;
    const email = form.email.value;
    const userName = form.userName.value;
    const formData = {
      foodName,
      foodImage,
      category,
      price,
      description,
      quantity,
      foodOrigin,
      purchaseCount: 0,
      buyer: { email, userName, photo: user?.photoURL },
    };
    // add form data on mongodb by axios

    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/add-food`, formData);
      form.reset();
      toast.success("Food Added Successfully");
      navigate("/my-foods");
    } catch (err) {
      toast.error(err.message);
      console.log(err);
    }
  };
  return (
    <div>
      <Helmet>
        <title>Food | Add Food</title>
      </Helmet>
      <div className="bg-gray-100 min-h-screen flex items-center justify-center px-4 py-4">
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-lg rounded-lg p-8 w-full max-w-4xl space-y-6"
        >
          <h2 className="text-3xl font-bold text-gray-800 text-center">
            Add New Food
          </h2>

          {/* Form Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* food name */}
            <div>
              <label
                htmlFor="foodName"
                className="block text-gray-700 font-medium mb-2"
              >
                Food Name
              </label>
              <input
                type="text"
                name="foodName"
                placeholder="Enter Food Name"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-300"
              />
            </div>

            {/* food photo */}
            <div>
              <label
                htmlFor="image"
                className="block text-gray-700 font-medium mb-2"
              >
                Food Image (URL)
              </label>
              <input
                type="text"
                name="photo"
                placeholder="Enter food image (URL)"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-300"
              />
            </div>

            {/* Category Name */}
            <div>
              <label
                htmlFor="categoryName"
                className="block text-gray-700 font-medium mb-2"
              >
                Food Category
              </label>
              <input
                type="text"
                name="categoryName"
                placeholder="Enter category name"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-300"
              />
            </div>

            {/* Price */}
            <div>
              <label
                htmlFor="price"
                className="block text-gray-700 font-medium mb-2"
              >
                Price
              </label>
              <input
                type="number"
                name="price"
                placeholder="Enter price"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-300"
              />
            </div>

            {/* Description */}
            <div className="md:col-span-2">
              <label
                htmlFor="description"
                className="block text-gray-700 font-medium mb-2"
              >
                Description
              </label>
              <textarea
                name="description"
                placeholder="Enter item description"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-300"
              />
            </div>

            {/* quantity */}
            <div>
              <label
                htmlFor="quantity"
                className="block text-gray-700 font-medium mb-2"
              >
                Quantity
              </label>
              <input
                type="number"
                name="quantity"
                placeholder="Enter quantity"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-300"
              />
            </div>

            {/* Food Origin */}
            <div>
              <label
                htmlFor="origin"
                className="block text-gray-700 font-medium mb-2"
              >
                Food Origin (Country)
              </label>
              <input
                type="text"
                name="foodOrigin"
                placeholder="e.g., Italy"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-300"
              />
            </div>

            {/* User Email */}
            <div>
              <label
                htmlFor="userEmail"
                className="block text-gray-700 font-medium mb-2"
              >
                User Email
              </label>
              <input
                type="email"
                name="email"
                value={user?.email}
                readOnly
                className="w-full border border-gray-300 bg-gray-100 rounded-lg px-4 py-2"
              />
            </div>

            {/* User Name */}
            <div>
              <label
                htmlFor="userName"
                className="block text-gray-700 font-medium mb-2"
              >
                User Name
              </label>
              <input
                type="text"
                name="userName"
                value={user?.displayName}
                readOnly
                className="w-full border border-gray-300 bg-gray-100 rounded-lg px-4 py-2"
              />
            </div>
          </div>
          <div className="flex justify-center">
            <button className="bg-blue-500 text-white w-full px-6 py-3 rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 transition transform duration-300 hover:scale-105 active:scale-95">
              Add Food
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddFood;
