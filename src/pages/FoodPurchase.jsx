

const FoodPurchase = () => {
  
  return (
    <div className="container mx-auto p-6">
      <div className="max-w-lg mx-auto bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Purchase Food</h1>
        <form>
          {/* Food Name */}
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">
              Food Name
            </label>
            <input
              type="text"
              defaultValue='name'
              readOnly
              className="w-full p-3 border border-gray-300 rounded-lg bg-gray-100 text-gray-700 focus:outline-none"
            />
          </div>

          {/* Price */}
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">
              Price
            </label>
            <input
              type="text"
              defaultValue={'price'}
              readOnly
              className="w-full p-3 border border-gray-300 rounded-lg bg-gray-100 text-gray-700 focus:outline-none"
            />
          </div>

          {/* Quantity */}
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">
              Quantity
            </label>
            <input
              type="number"
              defaultValue={'purchages quality'}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Buyer Name */}
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">
              Buyer Name
            </label>
            <input
              type="text"
              defaultValue={'buyer name'}
              readOnly
              className="w-full p-3 border border-gray-300 rounded-lg bg-gray-100 text-gray-700 focus:outline-none"
            />
          </div>

          {/* Buyer Email */}
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">
              Buyer Email
            </label>
            <input
              type="email"
              defaultValue={'email'}
              readOnly
              className="w-full p-3 border border-gray-300 rounded-lg bg-gray-100 text-gray-700 focus:outline-none"
            />
          </div>

          {/* Submit Button */}
          <button
            className="w-full py-3 bg-gradient-to-r from-blue-500 to-green-500 hover:from-green-500 hover:to-blue-500 text-white font-bold rounded-lg shadow-lg transition-transform transform hover:scale-105 duration-300"
          >
            Purchase
          </button>
        </form>
      </div>
    </div>
  );
};

export default FoodPurchase;
