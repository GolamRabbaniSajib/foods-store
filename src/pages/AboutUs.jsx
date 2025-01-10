import logo from "../assets/2.png";

const AboutUs = () => {
  return (
    <div className="bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 min-h-screen py-10">
      <div className="w-11/12 mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-6">About Us</h1>
        <div className="flex flex-col md:flex-row items-center md:items-start">
          {/* Left Section */}
          <div className="md:w-1/2 mb-6 md:mb-0 md:pr-8">
            <img
              src={logo}
              alt="Food Store"
              className="rounded-lg shadow-lg w-full"
            />
          </div>
          {/* Right Section */}
          <div className="md:w-1/2 text-lg">
            <p className="mb-4">
              Welcome to{" "}
              <span className="font-bold text-blue-500">Food Store</span>, your
              ultimate online destination for discovering and purchasing a wide
              range of delicious foods. We are passionate about bringing
              high-quality food items to your doorstep, ensuring a delightful
              shopping experience for every customer.
            </p>
            <p className="mb-4">
              Our platform features seamless navigation, dynamic
              functionalities, and secure transactions, making it easier than
              ever to explore, choose, and buy your favorite foods from the
              comfort of your home.
            </p>
            <p className="mb-4">
              At <span className="font-bold text-blue-500">Food Store</span>, we
              value:
            </p>
            <ul className="list-disc list-inside mb-4">
              <li>Fresh and quality food items</li>
              <li>Customer satisfaction and trust</li>
              <li>Convenient and secure online transactions</li>
              <li>A dynamic and user-friendly shopping experience</li>
            </ul>
            <p>
              Thank you for choosing{" "}
              <span className="font-bold text-blue-500">Food Store</span>. We
              look forward to serving you and becoming your favorite online food
              marketplace!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
