import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../provider/AuthProvider";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { Helmet } from "react-helmet-async";

const MyFoods = () => {
  const { axiosSecure } = useAxiosSecure();
  const { user } = useContext(AuthContext);
  const [foods, setFoods] = useState([]);
  useEffect(() => {
    fetchAllFoods();
  }, [user]);

  const fetchAllFoods = async () => {
    const { data } = await axiosSecure.get(`/foods/${user?.email}`);
    setFoods(data);
  };
  return (
    <div>
      <Helmet>
        <title>Food | My Foods</title>
      </Helmet>
      <div className="w-11/12 mx-auto p-6">
        <h1 className="text-2xl font-bold mb-4">My Foods</h1>
        <div className="min-h-screen">
          {foods.length === 0 ? (
            <div>
              <p>No Items You Added</p>
            </div>
          ) : (
            <table className="table-auto w-full  shadow-lg rounded-lg">
              <thead>
                <tr className=" text-left">
                  <th className="px-4 py-2">Image</th>
                  <th className="px-4 py-2">Name</th>
                  <th className="px-4 py-2">Price</th>
                  <th className="px-4 py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {foods.map((food) => (
                  <tr key={food._id} className="border-t">
                    <td className="px-4 py-2">
                      <img
                        src={food.foodImage}
                        alt={food.foodName}
                        className="w-16 h-16 object-cover rounded"
                      />
                    </td>
                    <td className="px-4 py-2">{food.foodName}</td>
                    <td className="px-4 py-2">${food.price}</td>
                    <td className="px-4 py-2">
                      <Link to={`/updateFood/${food._id}`}>
                        <button className="inline-block px-6 py-2 mt-4 text-white bg-green-400 rounded-lg shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-300 transition-all duration-300">
                          Update
                        </button>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyFoods;
