import axios from "axios";
import moment from "moment";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../provider/AuthProvider";
import toast from "react-hot-toast";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { Helmet } from "react-helmet-async";

const MyOrders = () => {
  const { axiosSecure } = useAxiosSecure();
  const { user } = useContext(AuthContext);
  const [foods, setFoods] = useState([]);
  useEffect(() => {
    fetchAllFoods();
  }, [user]);

  const fetchAllFoods = async () => {
    const { data } = await axiosSecure.get(`/purchase-food/${user?.email}`);
    setFoods(data);
  };
  // delete a food

  const handleDelete = async (id) => {
    try {
      const { data } = await axios.delete(
        `${import.meta.env.VITE_API_URL}/purchase-food/${id}`
      );
      toast.success("Food Delete Successfully");
      fetchAllFoods();
      console.log(data);
    } catch (err) {
      toast.error(err.message);
      console.log(err);
    }
  };
  const modalDelete = (id) => {
    toast((t) => (
      <div className="flex items-center gap-3">
        <div>
          <p>
            Are You <b>Sure</b>
          </p>
        </div>
        <div className="flex gap-3">
          <button
            className="bg-red-400 px-3 py-1 rounded-md"
            onClick={() => {
              toast.dismiss(t.id);
              handleDelete(id);
            }}
          >
            Yes
          </button>
          <button
            className="bg-green-400 px-3 py-1 rounded-md"
            onClick={() => toast.dismiss(t.id)}
          >
            Cancel
          </button>
        </div>
      </div>
    ));
  };
  return (
    <div>
      <Helmet>
        <title>Food | My Orders</title>
      </Helmet>
      <div className="w-11/12 mx-auto p-6">
        <h1 className="text-2xl font-bold mb-4">Ordered Foods</h1>
        <div className="min-h-screen">
          {foods.length === 0 ? (
            <div className="flex justify-center items-center">
              <p className="text-red-400 text-4xl font-bold">no item you order</p>
            </div>
          ) : (
            <div className="grid  grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {foods.map((food) => (
                <div key={food._id} className="border p-4 rounded-lg shadow-lg">
                  <img
                    src={food.foodImage}
                    alt={food.foodName}
                    className="w-full h-48 object-cover rounded-lg mb-4"
                  />
                  <div className="space-y-3">
                    <h3 className="text-xl font-semibold">{food.foodName}</h3>
                    <p className="">Price: ${food.price}</p>
                    <p className="">
                      <span>Owner:</span> <br /> {food.postedUserEmail}
                    </p>
                    <p className="">
                      Buy On: {moment(food.buyingDate).format("lll")}
                    </p>
                  </div>
                  <button
                    onClick={() => modalDelete(food._id)}
                    className="mt-4 w-full bg-red-500 text-white py-2 rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyOrders;
