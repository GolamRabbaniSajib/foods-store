import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../provider/AuthProvider";
import axios from "axios";
import { useParams } from "react-router-dom";

const UpdateFood = () => {
  const { user } = useContext(AuthContext);
  const { id } = useParams();
  const [food, setFood] = useState({});

  useEffect(() => {
    fetchFoodData();
  }, [id]);

  const fetchFoodData = async () => {
    const { data } = await axios.get(
      `${import.meta.env.VITE_API_URL}/food/${id}`
    );
    setFood(data);
  };
  
  return (
    <div>
      <div className="bg-gray-100 min-h-screen flex items-center justify-center px-4 py-4">
        <form
        //   onSubmit={handleSubmit}
          className="bg-white shadow-lg rounded-lg p-8 w-full max-w-4xl space-y-6"
        >
          <h2 className="text-3xl font-bold text-gray-800 text-center">
            Update Food
          </h2>

          {/* Form Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Image Upload */}
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
                defaultValue={food.foodName}
                placeholder="Enter Food Name"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-300"
              />
            </div>

            {/* food url */}
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
                defaultValue={food.foodImage}
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
                defaultValue={food.category}
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
                defaultValue={food.price}
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
                defaultValue={food.description}
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
                defaultValue={food.quantity}
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
                defaultValue={food.foodOrigin}
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

          {/* Submit Button */}
          <div className="flex justify-center">
            <button className="bg-blue-500 text-white w-full px-6 py-3 rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 transition transform duration-300 hover:scale-105 active:scale-95">
              Update Food
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateFood;
