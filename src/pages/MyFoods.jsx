import { Link } from "react-router-dom";

const MyFoods = () => {
  return (
    <div>
      <div className="container mx-auto p-6">
        <h1 className="text-2xl font-bold mb-4">My Foods</h1>
        <table className="table-auto w-full bg-white shadow-lg rounded-lg">
          <thead>
            <tr className="bg-gray-200 text-left">
              <th className="px-4 py-2">Image</th>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Price</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-t">
              <td className="px-4 py-2">
                <img
                  src={"food.image"}
                  alt={"food.name"}
                  className="w-16 h-16 rounded"
                />
              </td>
              <td className="px-4 py-2">{"food.name"}</td>
              <td className="px-4 py-2">${"food.price"}</td>
              <td className="px-4 py-2">
                <Link to={`/updateFood/${1}`}>
                  <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                    Update
                  </button>
                </Link>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyFoods;
