const MyOrders = () => {
  return (
    <div>
      <div className="container mx-auto p-6">
        <h1 className="text-2xl font-bold mb-4">Ordered Foods</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white p-4 rounded-lg shadow-lg">
            <img
              src={'food.image'}
              alt={'food.name'}
              className="w-full h-48 object-cover rounded-lg mb-4"
            />
            <h3 className="text-xl font-semibold">{'food.name'}</h3>
            <p className="text-gray-700">Price: ${'food.price'}</p>
            <p className="text-gray-700">Owner: {'food.ownerEmail'}</p>
            <p className="text-gray-700">
              Bought On: 11/2/2024
            </p>
            <button
              className="mt-4 w-full bg-red-500 text-white py-2 rounded hover:bg-red-600"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyOrders;
