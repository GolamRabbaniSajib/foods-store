import axios from "axios";
import moment from "moment";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../provider/AuthProvider";

const MyOrders = () => {
  const { user } = useContext(AuthContext);
  const [foods, setFoods] = useState([]);
  useEffect(() => {
    fetchAllFoods();
  }, [user]);

  const fetchAllFoods = async () => {
    const { data } = await axios.get(
      `${import.meta.env.VITE_API_URL}/purchase-food/${user?.email}`
    );
    setFoods(data);
  };
  return (
    <div>
      <div className="container mx-auto p-6">
        <h1 className="text-2xl font-bold mb-4">Ordered Foods</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {foods.map((food) => (
            <div key={food._id} className="bg-white p-4 rounded-lg shadow-lg">
              <img
                src={food.foodImage}
                alt={food.foodName}
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <h3 className="text-xl font-semibold">{food.foodName}</h3>
              <p className="text-gray-700">Price: ${food.price}</p>
              <p className="text-gray-700">Owner: {food.postedUserEmail}</p>
              <p className="text-gray-700">
                Bought On: {moment(food.buyingDate).format("lll")}
              </p>
              <button className="mt-4 w-full bg-red-500 text-white py-2 rounded hover:bg-red-600">
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyOrders;
