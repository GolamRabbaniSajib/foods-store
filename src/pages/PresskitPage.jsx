import logo from "../assets/2.png";
const PressKitPage = () => {
  return (
    <div className="bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 min-h-screen py-10">
      <div className="w-11/12 mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-8">Press Kit</h1>
        <p className="text-center text-lg mb-8">
          Welcome to our Press Kit page. Here you will find all the resources
          you need to write about our company.
        </p>

        {/* Company Overview Section */}
        <section className="mb-12">
          <h2 className="text-3xl font-semibold mb-4">Company Overview</h2>
          <p className="text-lg mb-4">
            <span className="font-bold text-blue-500 dark:text-blue-400">
              Food Store
            </span>
            is an online platform where buyers can explore and purchase a wide
            variety of foods. With dynamic features, seamless navigation, and
            secure transactions, Food Store ensures a convenient and enjoyable
            shopping experience for food lovers.
          </p>
          <p className="text-lg">
            Established in 2023, we have been committed to delivering
            high-quality food items and ensuring customer satisfaction.
          </p>
        </section>

        {/* Media Assets Section */}
        <section className="mb-12">
          <h2 className="text-3xl font-semibold mb-4">Media Assets</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
              <img src={logo} alt="Logo" className=" w-full rounded" />
            </div>
            <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
              <img
                src="https://images.unsplash.com/photo-1531545514256-b1400bc00f31?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Team Photo"
                className=" h-full object-cover w-full rounded"
              />
            </div>
            <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
              <img
                src="https://plus.unsplash.com/premium_photo-1686584355100-e6906b984f3c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Product Image"
                className="h-full object-cover w-full rounded"
              />
            </div>
          </div>
        </section>

        {/* Contact Information Section */}
        <section>
          <h2 className="text-3xl font-semibold mb-4">Contact Information</h2>
          <p className="text-lg mb-2">For media inquiries, please contact:</p>
          <p className="text-lg">
            <span className="font-bold">Name:</span> Jane Doe
          </p>
          <p className="text-lg">
            <span className="font-bold">Email:</span>{" "}
            <a
              href="mailto:press@foodstore.com"
              className="text-blue-500 dark:text-blue-400 underline"
            >
              press@foodstore.com
            </a>
          </p>
          <p className="text-lg">
            <span className="font-bold">Phone:</span> +1 (123) 456-7890
          </p>
        </section>
      </div>
    </div>
  );
};

export default PressKitPage;
