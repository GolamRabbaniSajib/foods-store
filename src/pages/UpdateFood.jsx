import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../provider/AuthProvider";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { Helmet } from "react-helmet-async";

const UpdateFood = () => {
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
      toast.error("Failed to load food item.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
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
      buyer: { email, userName, photo: user?.photoURL },
    };

    try {
      await axios.put(
        `${import.meta.env.VITE_API_URL}/update-food/${id}`,
        formData
      );
      toast.success("Food Updated Successfully");
      navigate("/my-foods");
    } catch (err) {
      toast.error("Failed to update food");
      console.error(err);
    }
  };

  return (
    <div>
      <Helmet>
        <title>Food | Update Food</title>
      </Helmet>

      <div className="bg-gray-50 min-h-screen flex items-center justify-center px-4 py-10">
        {loading ? (
          <div className="flex justify-center items-center h-96">
            <div className="w-12 h-12 border-4 border-blue-400 border-dashed rounded-full animate-spin"></div>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="bg-white w-full max-w-4xl shadow-lg rounded-2xl p-8 animate-fade-in-up"
          >
            <h2 className="text-3xl font-extrabold text-center text-blue-600 mb-8">
              Update Food Item
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  label: "Food Name",
                  name: "foodName",
                  value: food.foodName,
                  type: "text",
                },
                {
                  label: "Food Image (URL)",
                  name: "photo",
                  value: food.foodImage,
                  type: "text",
                },
                {
                  label: "Category",
                  name: "categoryName",
                  value: food.category,
                  type: "text",
                },
                {
                  label: "Price",
                  name: "price",
                  value: food.price,
                  type: "number",
                },
                {
                  label: "Quantity",
                  name: "quantity",
                  value: food.quantity,
                  type: "number",
                },
                {
                  label: "Food Origin (Country)",
                  name: "foodOrigin",
                  value: food.foodOrigin,
                  type: "text",
                },
              ].map((field) => (
                <div key={field.name}>
                  <label
                    htmlFor={field.name}
                    className="block text-gray-700 font-medium mb-2"
                  >
                    {field.label}
                  </label>
                  <input
                    type={field.type}
                    name={field.name}
                    defaultValue={field.value}
                    placeholder={`Enter ${field.label.toLowerCase()}`}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200"
                  />
                </div>
              ))}

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
                  rows={4}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200"
                />
              </div>

              {/* Email & Username */}
              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  User Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={user?.email}
                  readOnly
                  className="w-full border bg-gray-100 border-gray-300 rounded-lg px-4 py-2"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  User Name
                </label>
                <input
                  type="text"
                  name="userName"
                  value={user?.displayName}
                  readOnly
                  className="w-full border bg-gray-100 border-gray-300 rounded-lg px-4 py-2"
                />
              </div>
            </div>

            {/* Submit */}
            <div className="mt-8">
              <button
                type="submit"
                className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition-all duration-300 transform hover:scale-105"
              >
                Update Food
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default UpdateFood;
